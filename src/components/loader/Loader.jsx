import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const start = performance.now()
    const duration = 2600
    let frame
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setProgress(Math.floor(p * 100))
      if (p < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setVisible(false)
          onDone?.()
        }, 300)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[200] bg-space flex flex-col items-center justify-center"
        >
          <motion.img
            src="/src/assets/logo/logo.png"
            alt="logo"
            className="w-20 h-20 mb-6 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <p className="font-orbitron text-cyan text-xs tracking-[4px] mb-6 animate-pulseGlow">
            INITIALIZING UNIVERSE...
          </p>
          <div className="w-64 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan to-blue transition-[width] duration-100"
              style={{ width: `${progress}%`, boxShadow: '0 0 12px #22D3EE' }}
            />
          </div>
          <p className="font-grotesk text-[11px] text-slate-muted mt-3">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
