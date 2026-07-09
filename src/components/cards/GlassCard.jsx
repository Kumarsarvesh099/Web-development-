import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', tilt = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={tilt ? { rotateX: -4, rotateY: 4, scale: 1.02 } : { y: -6 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`glass-card p-5 ${className}`}
      data-cursor-hover
    >
      {children}
    </motion.div>
  )
}
