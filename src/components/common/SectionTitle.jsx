import { motion } from 'framer-motion'

export default function SectionTitle({ num, title, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-14 ${center ? 'text-center' : ''}`}
    >
      <div className={`flex items-center gap-4 mb-3 ${center ? 'justify-center' : ''}`}>
        {/* left accent line */}
        {!center && (
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan" />
        )}
        <span className="font-orbitron text-[10px] text-cyan/70 tracking-[6px] px-3 py-1 border border-cyan/20 rounded-sm bg-cyan/5">
          {num}
        </span>
        {center && <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan/40" />}
      </div>

      <h2 className={`font-orbitron font-black tracking-[0.15em] ${center ? 'mx-auto' : ''}`}
        style={{
          fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
          background: 'linear-gradient(90deg, #fff 0%, #22D3EE 40%, #3B82F6 70%, #8B5CF6 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: 'none',
          filter: 'drop-shadow(0 0 20px rgba(34,211,238,0.5))',
          letterSpacing: '0.12em',
        }}
      >
        {title}
      </h2>

      {/* underline accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`mt-3 h-[2px] w-24 rounded-full bg-gradient-to-r from-cyan via-blue to-purple ${center ? 'mx-auto' : ''}`}
        style={{ boxShadow: '0 0 12px rgba(34,211,238,0.6)' }}
      />
    </motion.div>
  )
}
