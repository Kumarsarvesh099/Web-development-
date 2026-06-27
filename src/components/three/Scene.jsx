import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { useRef, useMemo } from 'react'

function ShootingStars({ count }) {
  const group = useRef()
  const streaks = useMemo(() => Array.from({ length: count }).map(() => ({
    delay: Math.random() * 8,
    speed: 30 + Math.random() * 20,
    y: (Math.random() - 0.5) * 30,
    z: -10 - Math.random() * 20,
  })), [count])

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.children.forEach((mesh, i) => {
      const s = streaks[i]
      const t = (clock.elapsedTime + s.delay) % 8
      if (t < 1.2) {
        mesh.visible = true
        mesh.position.set(-40 + t * s.speed, s.y, s.z)
        mesh.material.opacity = 1 - t / 1.2
      } else {
        mesh.visible = false
      }
    })
  })

  if (count <= 0) return null
  return (
    <group ref={group}>
      {streaks.map((_, i) => (
        <mesh key={i} rotation={[0, 0, -0.4]}>
          <planeGeometry args={[2.5, 0.04]} />
          <meshBasicMaterial color="#9be7ff" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function ParallaxRig({ enabled, children }) {
  const group = useRef()
  useFrame(({ mouse }) => {
    if (!group.current || !enabled) return
    group.current.rotation.y += (mouse.x * 0.12 - group.current.rotation.y) * 0.04
    group.current.rotation.x += (-mouse.y * 0.06 - group.current.rotation.x) * 0.04
  })
  return <group ref={group}>{children}</group>
}

export default function Scene({ perf }) {
  const bloomIntensity = { high: 0.9, medium: 0.6, low: 0.35, off: 0 }[perf.bloom]

  return (
    // Canvas is on top of CSS background — alpha:true lets body::before/after show through
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ antialias: perf.tier !== 'mobile', alpha: true, powerPreference: 'high-performance' }}
        dpr={perf.tier === 'mobile' ? 1 : [1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#22D3EE" />
        {perf.lights >= 4 && <pointLight position={[-10, -5, -10]} intensity={0.5} color="#8B5CF6" />}

        <ParallaxRig enabled={perf.parallax}>
          <Stars radius={120} depth={60} count={perf.stars} factor={3} saturation={0} fade speed={0.5} />
          {perf.particles > 0 && (
            <Sparkles count={perf.particles} scale={[40, 20, 20]} size={1.8} speed={0.3} color="#22D3EE" />
          )}
          <ShootingStars count={perf.tier === 'mobile' ? 0 : 3} />
        </ParallaxRig>

        {bloomIntensity > 0 && (
          <EffectComposer>
            <Bloom intensity={bloomIntensity} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
            {perf.tier === 'desktop' && <Noise opacity={0.02} />}
            <Vignette eskil={false} offset={0.25} darkness={0.85} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
