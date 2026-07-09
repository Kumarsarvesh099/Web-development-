import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { LuSun, LuMoon } from 'react-icons/lu'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { RxCross2 } from 'react-icons/rx'
import { NAV_ITEMS } from '../../data/social'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (window.__lenis && el) window.__lenis.scrollTo(el, { offset: -90 })
  else el?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar({ active }) {
  const [shrink, setShrink] = useState(false)
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 transition-all duration-300 ${
          shrink ? 'h-[56px] bg-space/60 shadow-[0_10px_40px_rgba(34,211,238,.12)]' : 'h-[64px] bg-white/[0.03]'
        } backdrop-blur-xl border-b border-cyan/15`}
      >
        <button className="flex items-center gap-3" onClick={() => scrollTo('home')}>
          <img
            src="/assets/logo/logo.png"
            alt="logo"
            className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(34,211,238,.5)] animate-pulseGlow"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="leading-tight text-left hidden sm:block">
            <p className="font-orbitron font-extrabold text-sm gradient-text">SARVESH</p>
            <p className="text-[9px] text-cyan tracking-[4px] font-grotesk">FULL STACK DEVELOPER</p>
          </div>
        </button>

        <nav className="hidden laptop:flex items-center gap-8">
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              onClick={() => scrollTo(item.id)}
              className={`relative text-xs font-grotesk font-semibold tracking-wider uppercase transition-colors ${
                active === item.id ? 'text-cyan' : 'text-slate-muted hover:text-white'
              }`}
            >
              {item.label}
              {active === item.id && (
                <motion.span layoutId="nav-underline" className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-pill bg-cyan shadow-glowCyan" />
              )}
            </motion.button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="https://github.com/Sarvesh099" target="_blank" rel="noreferrer" className="hidden sm:flex w-8 h-8 rounded-sm glass-pill items-center justify-center text-sm hover:shadow-glowCyan hover:-rotate-6 transition-all">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hidden sm:flex w-8 h-8 rounded-sm glass-pill items-center justify-center text-sm hover:shadow-glowBlue hover:rotate-6 transition-all">
            <FaLinkedin />
          </a>
          <button onClick={() => setDark((d) => !d)} className="w-11 h-6 rounded-pill glass-pill relative hidden sm:block">
            <motion.span
              className="absolute top-[2px] w-5 h-5 rounded-full bg-cyan shadow-glowCyan flex items-center justify-center text-[10px] text-space"
              animate={{ left: dark ? 2 : 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {dark ? <LuMoon /> : <LuSun />}
            </motion.span>
          </button>
          <button className="laptop:hidden w-8 h-8 flex items-center justify-center" onClick={() => setMenuOpen(true)}>
            <HiOutlineMenuAlt3 size={20} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed top-0 right-0 h-full w-[78%] max-w-xs bg-space/90 backdrop-blur-xl border-l border-cyan/20 z-[60] p-6 flex flex-col gap-6"
          >
            <button className="self-end" onClick={() => setMenuOpen(false)}><RxCross2 size={22} /></button>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { scrollTo(item.id); setMenuOpen(false) }}
                className={`text-left font-grotesk text-sm tracking-wide ${active === item.id ? 'text-cyan' : 'text-slate-muted'}`}
              >
                {item.num} — {item.label.toUpperCase()}
              </button>
            ))}
            <div className="flex gap-4 mt-auto">
              <a href="https://github.com/Sarvesh099" className="w-10 h-10 rounded-sm glass-pill flex items-center justify-center"><FaGithub /></a>
              <a href="https://linkedin.com/" className="w-10 h-10 rounded-sm glass-pill flex items-center justify-center"><FaLinkedin /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
