import { motion } from 'framer-motion'

export default function HeroCenter({ perf }) {
  const ringCount = perf.orbitRings

  return (
    <div
      className="relative flex justify-center items-end w-full"
      style={{ height: 'clamp(520px, 75vh, 760px)' }}
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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] tablet:w-[360px] laptop:w-[440px] aspect-square">
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

      {/* hexagon platform — base for avatar */}
      <svg
        className="absolute left-1/2 -translate-x-1/2 opacity-60"
        style={{ width: 'clamp(240px, 35vw, 380px)', bottom: '6px' }}
        viewBox="0 0 200 60"
      >
        <motion.polygon
          points="40,5 160,5 195,30 160,55 40,55 5,30"
          fill="rgba(34,211,238,0.06)"
          stroke="#22D3EE"
          strokeWidth="1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* inner glow line */}
        <motion.polygon
          points="50,12 150,12 182,30 150,48 50,48 18,30"
          fill="none"
          stroke="#22D3EE"
          strokeWidth="0.5"
          opacity="0.4"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </svg>

      {/* energy beam from base */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[6px] bg-gradient-to-t from-cyan/70 via-cyan/20 to-transparent"
        style={{ bottom: '28px', height: 'clamp(220px, 32vh, 360px)', borderRadius: 4 }}
        animate={{ opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* base glow pool */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: 0,
          width: 'clamp(180px, 26vw, 300px)',
          height: 40,
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.35) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* AVATAR — bigger, rises from base */}
      <motion.img
        src="/assets/avatar/avatar.png"
        alt="Sarvesh avatar"
        className="relative z-10 w-auto"
        style={{
          height: 'clamp(500px, 76vh, 740px)',
          marginBottom: '-44px',
          filter: [
            'drop-shadow(0 0 60px rgba(34,211,238,0.6))',
            'drop-shadow(0 0 120px rgba(59,130,246,0.3))',
            'drop-shadow(0 60px 40px rgba(34,211,238,0.25))',
          ].join(' '),
        }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={perf.tilt ? { scale: 1.03 } : {}}
        onError={(e) => { e.currentTarget.style.display = 'none' }}
      />
    </div>
  )
}
