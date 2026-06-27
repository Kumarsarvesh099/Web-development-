import { motion } from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'
import { SOCIAL_LINKS, NAV_ITEMS } from '../../data/social'
import * as Fa from 'react-icons/fa'
import * as Fa6 from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { SiLeetcode } from 'react-icons/si'

function SocialIcon({ icon }) {
  if (icon === 'SiLeetcode') return <SiLeetcode />
  if (icon === 'MdEmail') return <MdEmail />
  const Fa6Icon = Fa6[icon]
  if (Fa6Icon) return <Fa6Icon />
  const Icon = Fa[icon]
  return Icon ? <Icon /> : null
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (window.__lenis && el) window.__lenis.scrollTo(el, { offset: -90 })
  else el?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-cyan/10 bg-white/[0.02] backdrop-blur-xl py-10 px-5 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col tablet:flex-row items-center justify-between gap-8 text-sm text-slate-muted">
        <div className="flex items-center gap-3">
          <img src="/src/assets/logo/logo.png" alt="logo" className="w-8 h-8 object-contain animate-pulseGlow" onError={(e) => { e.currentTarget.style.display = 'none' }} />
          <div>
            <p className="font-orbitron text-xs font-bold gradient-text">SARVESH</p>
            <p className="text-[9px] text-cyan tracking-[3px]">DEVELOPER</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-4 text-xs font-grotesk justify-center">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="hover:text-cyan transition-colors">{item.label}</button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.slice(0, 4).map((s) => (
            <a key={s.name} href={s.href} className="hover:text-cyan transition-colors text-base"><SocialIcon icon={s.icon} /></a>
          ))}
          <motion.button
            onClick={toTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9, y: -40, opacity: 0 }}
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center hover:shadow-glowCyan"
          >
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
      <p className="text-center text-[11px] text-slate-muted mt-8 font-grotesk">© 2026 Sarvesh Kumar. Built across the universe ✦</p>
    </footer>
  )
}
