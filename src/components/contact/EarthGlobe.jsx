import { motion } from 'framer-motion'

export default function EarthGlobe({ perf }) {
  return (
    <div className="w-full h-full min-h-[160px] flex items-center justify-center p-4">
      <motion.img
        src="/assets/globe/contact-globe.png"
        alt="Global connectivity globe"
        className="w-full max-w-[220px] h-auto object-contain"
        style={{ filter: 'drop-shadow(0 0 30px rgba(34,211,238,0.4)) brightness(1.1)' }}
        animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
    </div>
  )
}
