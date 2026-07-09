import { motion } from 'framer-motion'
import * as Fa from 'react-icons/fa'
import { BsStars } from 'react-icons/bs'
import SectionTitle from '../common/SectionTitle'
import { ACHIEVEMENTS } from '../../data/achievements'

function AchIcon({ icon }) {
  if (icon === 'BsStars') return <BsStars />
  const Icon = Fa[icon]
  return Icon ? <Icon /> : null
}

const COLORS = [
  { glow: 'rgba(34,211,238,0.6)',  border: 'rgba(34,211,238,0.45)', text: '#22D3EE' },
  { glow: 'rgba(139,92,246,0.6)',  border: 'rgba(139,92,246,0.45)', text: '#8B5CF6' },
  { glow: 'rgba(59,130,246,0.6)',  border: 'rgba(59,130,246,0.45)', text: '#3B82F6' },
  { glow: 'rgba(34,197,94,0.6)',   border: 'rgba(34,197,94,0.45)',  text: '#22C55E' },
  { glow: 'rgba(249,115,22,0.6)',  border: 'rgba(249,115,22,0.45)', text: '#F97316' },
]

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 px-5 md:px-12 laptop:pl-32">
      <div className="max-w-5xl mx-auto">
        <SectionTitle num="06" title="ACHIEVEMENT CONSTELLATION" center />

        <div className="relative">
          {/* backdrop image — more visible */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <img
              src="/assets/sections/achievements.png"
              alt=""
              className="w-full max-w-2xl object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          </div>

          {/* Constellation lines — more visible */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.5 }}
            preserveAspectRatio="none"
          >
            <line x1="10%" y1="50%" x2="30%" y2="20%" stroke="#22D3EE" strokeWidth="1.2" strokeDasharray="5 4"/>
            <line x1="30%" y1="20%" x2="50%" y2="65%" stroke="#8B5CF6" strokeWidth="1.2" strokeDasharray="5 4"/>
            <line x1="50%" y1="65%" x2="70%" y2="22%" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="5 4"/>
            <line x1="70%" y1="22%" x2="90%" y2="52%" stroke="#22C55E" strokeWidth="1.2" strokeDasharray="5 4"/>
            {/* star dots at joints */}
            <circle cx="10%" cy="50%" r="3" fill="#22D3EE" opacity="0.7"/>
            <circle cx="30%" cy="20%" r="3" fill="#8B5CF6" opacity="0.7"/>
            <circle cx="50%" cy="65%" r="3" fill="#3B82F6" opacity="0.7"/>
            <circle cx="70%" cy="22%" r="3" fill="#22C55E" opacity="0.7"/>
            <circle cx="90%" cy="52%" r="3" fill="#F97316" opacity="0.7"/>
          </svg>

          {/* Achievement cards */}
          <div className="relative flex flex-wrap justify-center gap-8 py-8">
            {ACHIEVEMENTS.map((a, i) => {
              const c = COLORS[i % COLORS.length]
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, scale: 0.6, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, type: 'spring' }}
                  whileHover={{ scale: 1.12, y: -6 }}
                  className="relative z-10 flex flex-col items-center text-center cursor-default group"
                  data-cursor-hover
                >
                  <div
                    className="w-36 h-36 rounded-3xl flex flex-col items-center justify-center gap-2 p-4 relative"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), rgba(8,18,38,0.85))`,
                      backdropFilter: 'blur(16px)',
                      border: `1px solid ${c.border}`,
                      boxShadow: `0 0 35px ${c.glow}, 0 0 70px ${c.glow}50, inset 0 1px 0 rgba(255,255,255,0.1)`,
                    }}
                  >
                    <span
                      className="absolute top-2 right-2 w-2 h-2 rounded-full"
                      style={{ background: c.text, boxShadow: `0 0 10px ${c.text}` }}
                    />
                    <motion.span
                      className="text-3xl"
                      style={{ color: c.text, filter: `drop-shadow(0 0 12px ${c.text})` }}
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <AchIcon icon={a.icon} />
                    </motion.span>
                    <span className="text-[10px] font-grotesk font-bold leading-tight text-white/90 tracking-wide">
                      {a.title}
                    </span>
                  </div>

                  <motion.div
                    className="mt-2 text-[10px] text-slate-muted font-grotesk max-w-[140px] leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    {a.description}
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
