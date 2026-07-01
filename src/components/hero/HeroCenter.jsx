import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function HeroCenter({ perf }) {
  const ringCount = perf.orbitRings
  const stageRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)

  // pointer position, 0..1 across the stage
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  // springy 3D tilt driven by the pointer — this is what makes the
  // avatar feel like a real 3D model instead of a flat auto-spin
  const rotateY = useSpring(useTransform(px, [0, 1], [-26, 26]), { stiffness: 110, damping: 16, mass: 0.6 })
  const rotateX = useSpring(useTransform(py, [0, 1], [14, -14]), { stiffness: 110, damping: 16, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setIsDesktop(mq.matches)
    const onChange = (e) => setIsDesktop(e.matches)
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange)
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange)
    }
  }, [])

  function handlePointerMove(e) {
    if (!stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    px.set(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)))
    py.set(Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)))
  }
  function handlePointerLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div
      ref={stageRef}
      onMouseMove={isDesktop ? handlePointerMove : undefined}
      onMouseLeave={isDesktop ? handlePointerLeave : undefined}
      className="relative flex justify-center items-end w-full"
      style={{ height: 'clamp(460px, 78vh, 780px)', perspective: '1100px' }}
    >
      {/* decorative purple planet */}
      <motion.img
        src="/assets/planets/about.png"
        alt=""
        className="hidden tablet:block absolute top-0 left-0 w-16 opacity-75 drop-shadow-[0_0_18px_rgba(139,92,246,0.6)]"
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
      <motion.img
        src="/assets/planets/contact.png"
        alt=""
        className="hidden tablet:block absolute bottom-16 right-0 w-12 opacity-65 drop-shadow-[0_0_14px_rgba(59,130,246,0.5)]"
        animate={{ y: [0, 10, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
      <motion.img
        src="/assets/spaceship/spaceship.png"
        alt=""
        className="absolute top-0 right-0 w-20 tablet:w-28 laptop:w-36 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
        animate={{ x: [0, 16, 0], y: [0, -10, 0], rotate: [2, -2, 2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />

      {/* orbit rings */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] tablet:w-[360px] laptop:w-[440px] aspect-square">
        {ringCount >= 1 && (
          <motion.div
            className="absolute inset-0 rounded-full border border-cyan/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan shadow-glowCyan" />
          </motion.div>
        )}
        {ringCount >= 2 && (
          <motion.div
            className="absolute inset-[12%] rounded-full border border-purple/25"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple shadow-glowPurple" />
          </motion.div>
        )}
        {ringCount >= 3 && (
          <motion.div
            className="absolute inset-[24%] rounded-full border border-blue/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        )}
      </div>

      {/* soft ambient aura behind everything — pure CSS, identical on mobile + desktop */}
      <div
        className="avatar-aura absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '0px',
          width: 'clamp(220px, 40vw, 420px)',
          height: 'clamp(220px, 40vw, 420px)',
        }}
      />

      {/* hexagon platform — base for avatar. Sized off the SAME unit as the avatar so they scale together */}
      <svg
        className="platform-glow absolute left-1/2 -translate-x-1/2"
        style={{ width: 'clamp(220px, 42vw, 420px)', bottom: '4px' }}
        viewBox="0 0 200 60"
      >
        <motion.polygon
          points="40,5 160,5 195,30 160,55 40,55 5,30"
          fill="rgba(34,211,238,0.08)"
          stroke="#22D3EE"
          strokeWidth="1.5"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.polygon
          points="50,12 150,12 182,30 150,48 50,48 18,30"
          fill="none"
          stroke="#22D3EE"
          strokeWidth="0.5"
          opacity="0.45"
          animate={{ opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </svg>

      {/* energy beam from base */}
      <motion.div
        className="beam-glow absolute left-1/2 -translate-x-1/2 w-[6px] bg-gradient-to-t from-cyan/70 via-cyan/20 to-transparent"
        style={{ bottom: '28px', height: 'clamp(200px, 34vh, 380px)', borderRadius: 4 }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* base glow pool — sits right under the avatar's feet on the platform */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: 0,
          width: 'clamp(180px, 30vw, 340px)',
          height: 44,
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.4) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* AVATAR — feet anchored to the platform with a % offset (scales with its own
          height, so it never drifts on short mobile viewports the way a fixed
          margin did), 3D tilt follows the cursor on desktop / gentle idle wobble on mobile */}
      <motion.img
        src="/assets/avatar/avatar.png"
        alt="Sarvesh avatar"
        className="avatar-glow relative z-10 w-auto select-none"
        draggable={false}
        style={{
          height: 'clamp(440px, 74vh, 780px)',
          transformStyle: 'preserve-3d',
          rotateX: isDesktop ? rotateX : undefined,
          rotateY: isDesktop ? rotateY : undefined,
        }}
        animate={
          isDesktop
            ? { y: ['-6%', '-10%', '-6%'] }
            : { y: ['-6%', '-10%', '-6%'], rotateY: [-14, 14, -14], rotateX: [3, -3, 3] }
        }
        transition={
          isDesktop
            ? { y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }
            : {
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                rotateY: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
                rotateX: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
              }
        }
        whileHover={perf.tilt ? { scale: 1.03 } : {}}
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
    </div>
  )
}
