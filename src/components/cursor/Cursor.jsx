import { useEffect, useRef } from 'react'

export default function Cursor({ enabled }) {
  const ringRef = useRef()
  const dotRef = useRef()
  const hoverRef = useRef(false)
  const posRef = useRef({ ringX: 0, ringY: 0, mouseX: 0, mouseY: 0 })

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('custom-cursor-active')

    posRef.current.ringX = window.innerWidth / 2
    posRef.current.ringY = window.innerHeight / 2
    posRef.current.mouseX = posRef.current.ringX
    posRef.current.mouseY = posRef.current.ringY

    const applyHoverStyle = (isHover) => {
      if (!ringRef.current) return
      ringRef.current.style.setProperty('--ring-scale', isHover ? '1.5' : '1')
      ringRef.current.style.borderColor = isHover ? 'rgba(34,211,238,0.9)' : 'rgba(34,211,238,0.6)'
      ringRef.current.style.boxShadow = isHover
        ? '0 0 24px #22D3EE, 0 0 48px rgba(34,211,238,0.3)'
        : '0 0 10px rgba(34,211,238,0.5)'
    }

    const onMove = (e) => {
      posRef.current.mouseX = e.clientX
      posRef.current.mouseY = e.clientY

      // dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`
      }

      const isHover = !!e.target.closest('button, a, [data-cursor-hover]')
      if (isHover !== hoverRef.current) {
        hoverRef.current = isHover
        applyHoverStyle(isHover)
      }
    }

    let raf
    const animateRing = () => {
      const p = posRef.current
      // lerp 0.28 = snappier, less perceptible lag
      p.ringX += (p.mouseX - p.ringX) * 0.28
      p.ringY += (p.mouseY - p.ringY) * 0.28
      if (ringRef.current) {
        const half = 17
        ringRef.current.style.transform = `translate3d(${p.ringX - half}px, ${p.ringY - half}px, 0) scale(var(--ring-scale, 1))`
      }
      raf = requestAnimationFrame(animateRing)
    }
    raf = requestAnimationFrame(animateRing)

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {/* ring — trails behind */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9999]"
        style={{
          width: 34,
          height: 34,
          borderColor: 'rgba(34,211,238,0.6)',
          boxShadow: '0 0 10px rgba(34,211,238,0.5)',
          willChange: 'transform',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
      />
      {/* dot — instant */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan pointer-events-none z-[9999]"
        style={{
          boxShadow: '0 0 6px #22D3EE',
          willChange: 'transform',
        }}
      />
    </>
  )
}
