import { motion } from 'framer-motion'
import { NAV_ITEMS } from '../../data/social'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (window.__lenis && el) window.__lenis.scrollTo(el, { offset: -90 })
  else el?.scrollIntoView({ behavior: 'smooth' })
}

export default function PlanetNavigation({ active }) {
  return (
    <>
      {/* DESKTOP — vertical sidebar, shifted down so home clears the 64px navbar */}
      <div
        className="hidden laptop:flex fixed left-3 z-40 flex-col gap-1"
        style={{ top: '50%', transform: 'translateY(-44%)' }}
      >
        {/* vertical connector line */}
        <div className="absolute left-[23px] top-3 bottom-3 w-[1px] overflow-hidden bg-cyan/15 rounded-full pointer-events-none">
          <motion.div
            className="absolute left-0 w-full h-6 bg-gradient-to-b from-transparent via-cyan to-transparent"
            animate={{ y: ['-10%', '110%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id
          return (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              whileHover={{ scale: 1.1, x: 2 }}
              transition={{ duration: 0.15 }}
              className="relative flex flex-col items-center gap-0.5 group"
              style={{ width: 50 }}
              data-cursor-hover
            >
              {/* Fixed box — ring stays inside */}
              <div className="relative flex items-center justify-center" style={{ width: 46, height: 46 }}>
                {isActive && (
                  <motion.span
                    className="absolute rounded-full border-2 border-cyan"
                    style={{
                      inset: 2,
                      boxShadow: '0 0 12px rgba(34,211,238,0.8), 0 0 24px rgba(34,211,238,0.3)',
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  />
                )}
                {!isActive && (
                  <span
                    className="absolute rounded-full border border-cyan/0 group-hover:border-cyan/25 transition-all duration-300"
                    style={{ inset: 4 }}
                  />
                )}
                <img
                  src={item.planet}
                  alt={item.label}
                  style={{
                    width: isActive ? 38 : 32,
                    height: isActive ? 38 : 32,
                    objectFit: 'contain',
                    transition: 'all 0.3s ease',
                    animation: 'spin 40s linear infinite',
                    filter: isActive
                      ? 'drop-shadow(0 0 18px rgba(34,211,238,1)) brightness(1.4)'
                      : 'brightness(0.9) saturate(1.1)',
                    opacity: isActive ? 1 : 0.75,
                  }}
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>

              {/* Label */}
              <span
                style={{
                  fontSize: 6,
                  letterSpacing: '0.1em',
                  fontFamily: 'Space Grotesk, sans-serif',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  color: isActive ? '#22D3EE' : 'rgba(148,163,184,0.65)',
                  transition: 'all 0.3s',
                }}
                className="group-hover:!text-slate-300"
              >
                <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 5, display: 'block', marginBottom: 1 }}>
                  {item.num}
                </span>
                {item.label.toUpperCase()}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* MOBILE — bottom dock */}
      <div className="laptop:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50 glass-pill px-2 py-1.5 flex gap-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="p-1 flex flex-col items-center gap-0.5"
            >
              <img
                src={item.planet}
                alt={item.label}
                className="object-contain transition-all"
                style={{
                  width: 26,
                  height: 26,
                  filter: isActive
                    ? 'drop-shadow(0 0 8px rgba(34,211,238,0.9)) brightness(1.3)'
                    : 'brightness(0.78)',
                  opacity: isActive ? 1 : 0.65,
                  transform: isActive ? 'scale(1.15)' : 'scale(1)',
                }}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <span style={{
                fontSize: 5,
                color: isActive ? '#22D3EE' : '#94a3b8',
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '0.1em',
              }}>
                {item.label.slice(0, 3).toUpperCase()}
              </span>
            </button>
          )
        })}
      </div>
    </>
  )
}
