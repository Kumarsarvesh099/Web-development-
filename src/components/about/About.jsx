import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaDownload } from 'react-icons/fa'
import SectionTitle from '../common/SectionTitle'
import GlassButton from '../common/GlassButton'

function Counter({ to }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let frame
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min(1, (now - start) / 1200)
          setVal(Math.floor(p * to))
          if (p < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        obs.disconnect()
      }
    })
    const el = document.getElementById(`counter-${to}`)
    if (el) obs.observe(el)
    return () => { cancelAnimationFrame(frame); obs.disconnect() }
  }, [to])
  return <span id={`counter-${to}`}>{val}+</span>
}

export default function About() {
  return (
    <section id="about" className="relative py-24 px-5 md:px-12 laptop:pl-32">
      <div className="max-w-6xl mx-auto">
        <SectionTitle num="02" title="ABOUT ME" />

        <div className="grid laptop:grid-cols-[40%_60%] gap-10">
          {/* LEFT — avatar card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card p-6 flex flex-col items-center text-center overflow-hidden"
            style={{ minHeight: 420 }}
          >
            {/* Avatar fills most of the card */}
            <motion.img
              src="/assets/avatar/about-avatar.png"
              alt="Sarvesh"
              className="object-contain mb-3"
              style={{
                width: '100%',
                maxWidth: 280,
                height: 'clamp(220px, 32vh, 320px)',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 30px rgba(34,211,238,0.4))',
              }}
              animate={{ y: [0, -10, 0] }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <p className="flex items-center gap-2 text-sm mb-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Available
            </p>
            <p className="text-cyan font-grotesk text-sm mb-5">Full Stack Developer</p>
            <GlassButton variant="glass" icon={<FaDownload />} href="/assets/resume/resume.pdf">
              RESUME
            </GlassButton>
          </motion.div>

          {/* RIGHT — content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card p-8"
          >
            <p className="text-slate-para leading-relaxed mb-6">
              I'm a passionate Full Stack Developer who loves building innovative web applications,
              experimenting with AI, and exploring new technologies that push what's possible on the web.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8 text-sm">
              <div><p className="text-slate-muted text-xs">College</p><p className="font-grotesk">Madan Mohan Malaviya University of Technology</p></div>
              <div><p className="text-slate-muted text-xs">Branch</p><p className="font-grotesk">Computer Science &amp; Engineering</p></div>
              <div><p className="text-slate-muted text-xs">Year</p><p className="font-grotesk">2024 – 2028</p></div>
              <div><p className="text-slate-muted text-xs">CGPA</p><p className="font-grotesk text-cyan">8.7</p></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[['10', 'Projects'], ['20', 'Technologies'], ['2', 'Experience'], ['100', 'DSA']].map(([n, l]) => (
                <div key={l} className="glass-card px-3 py-3 text-center">
                  <p className="font-orbitron text-xl font-bold text-cyan"><Counter to={Number(n)} /></p>
                  <p className="text-[10px] text-slate-muted font-grotesk">{l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
