import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

/**
 * variant: 'primary' | 'glass'
 * magnetic: enable subtle cursor-follow on desktop (Document 6 #5)
 */
export default function GlassButton({ children, icon, variant = 'glass', href, onClick, magnetic = true, className = '' }) {
  const ref = useRef()
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState([])

  const handleMouseMove = (e) => {
    if (!magnetic || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15
    setOffset({ x, y })
  }
  const reset = () => setOffset({ x: 0, y: 0 })

  const handleClick = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const id = Date.now()
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600)
    onClick?.(e)
  }

  const Tag = href ? 'a' : 'button'
  const base = variant === 'primary' ? 'btn-primary' : 'btn-glass'

  return (
    <motion.div
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="inline-block"
    >
      <Tag
        ref={ref}
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noreferrer' : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        onClick={handleClick}
        className={`relative overflow-hidden inline-flex items-center gap-2 group ${base} ${className}`}
      >
        {children}
        {icon}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full bg-white/40 pointer-events-none animate-ping"
            style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20 }}
          />
        ))}
        {/* shine sweep on hover */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        {/* corner accent brackets — cyberpunk HUD detail */}
        <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-white/50 rounded-tl-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/50 rounded-tr-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-white/50 rounded-bl-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-white/50 rounded-br-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      </Tag>
    </motion.div>
  )
}
