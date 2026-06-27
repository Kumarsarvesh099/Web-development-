import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { MdEmail } from 'react-icons/md'
import GlassButton from '../common/GlassButton'

const STATS = [
  { label: 'Projects', value: 10 },
  { label: 'Technologies', value: 20 },
  { label: 'Experience', value: 2 },
  { label: 'DSA', value: 100 },
]

function Counter({ to }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let frame
    const start = performance.now()
    const duration = 1300
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      setVal(Math.floor(p * to))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [to])
  return <span>{val}+</span>
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }

export default function HeroLeft() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl text-center laptop:text-left mx-auto laptop:mx-0">

      {/* Welcome line */}
      <motion.p variants={fadeUp} className="text-cyan text-xs font-grotesk font-semibold tracking-[6px] mb-3 uppercase">
        Welcome to my universe
      </motion.p>

      {/* I'm — subtle */}
      <motion.p variants={fadeUp} className="font-grotesk text-white/50 text-sm tracking-[4px] mb-0 uppercase">
        I'm
      </motion.p>

      {/* SARVESH — gradient via CSS class, NOT inline style on motion.h1 to avoid Framer conflict */}
      {/* Key fix: wrap in a plain <h1>, use motion only for fadeUp via a wrapper div */}
      <motion.div variants={fadeUp}>
        <h1
          className="font-orbitron font-black leading-[1.0] mb-2"
          style={{
            fontSize: 'clamp(3.2rem, 8vw, 6.5rem)',
            background: 'linear-gradient(135deg, #ffffff 0%, #22D3EE 30%, #3B82F6 60%, #8B5CF6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 28px rgba(34,211,238,0.5))',
          }}
        >
          SARVESH
        </h1>
      </motion.div>

      {/* Role line */}
      <motion.h3 variants={fadeUp} className="font-grotesk text-base tablet:text-lg text-white/75 tracking-wide mt-3 mb-4 flex items-center gap-2 justify-center laptop:justify-start flex-wrap">
        Full Stack Developer <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block opacity-70" /> ML Enthusiast
      </motion.h3>

      <motion.p variants={fadeUp} className="text-slate-para leading-relaxed mb-7 max-w-[580px] mx-auto laptop:mx-0 text-sm">
        I craft immersive digital experiences and intelligent solutions — blending design, code, and AI into products people love.
      </motion.p>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-8 justify-center laptop:justify-start">
        <GlassButton variant="primary" icon={<FaArrowRight className="group-hover:translate-x-1 transition-transform" />} onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
          EXPLORE MY WORK
        </GlassButton>
        <GlassButton variant="glass" icon={<FaDownload />} href="/assets/resume/resume.pdf">
          DOWNLOAD RESUME
        </GlassButton>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7 max-w-md mx-auto laptop:mx-0 laptop:max-w-none">
        {STATS.map((s) => (
          <div key={s.label} className="glass-card px-4 py-3 text-center" data-cursor-hover>
            <p className="font-orbitron text-2xl font-bold text-cyan"><Counter to={s.value} /></p>
            <p className="text-[10px] text-slate-muted tracking-wide mt-1 font-grotesk">{s.label}</p>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="flex gap-3 justify-center laptop:justify-start">
        {[
          { Icon: FaGithub, href: 'https://github.com/Sarvesh099' },
          { Icon: FaLinkedin, href: 'https://linkedin.com/' },
          { Icon: SiLeetcode, href: 'https://leetcode.com/' },
          { Icon: MdEmail, href: 'mailto:sarvesh.dev@gmail.com' },
        ].map(({ Icon, href }, i) => (
          <a key={i} href={href} target="_blank" rel="noreferrer" data-cursor-hover
            className="w-[50px] h-[50px] rounded-full glass-pill flex items-center justify-center hover:shadow-glowBlue hover:rotate-[12deg] hover:scale-110 transition-all text-lg">
            <Icon />
          </a>
        ))}
      </motion.div>
    </motion.div>
  )
}
