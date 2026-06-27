import { motion } from 'framer-motion'
import * as Si from 'react-icons/si'
import SectionTitle from '../common/SectionTitle'
import { SKILLS } from '../../data/skills'

function SkillIcon({ icon, color }) {
  const Icon = Si[icon]
  return Icon ? <Icon style={{ color }} /> : null
}

export default function SkillsGalaxy({ perf }) {
  const isMobile = perf.tier === 'mobile'

  return (
    <section id="skills" className="relative py-24 px-5 md:px-12 laptop:pl-32">
      <div className="max-w-5xl mx-auto">
        <SectionTitle num="03" title="SKILLS GALAXY" center />

        {/* pre-rendered skills-galaxy artwork — already has the orbit + planet + icons baked in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-3xl mb-10 rounded-card overflow-hidden"
        >
          <img
            src="/src/assets/sections/skills.png"
            alt="Skills galaxy overview"
            className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(139,92,246,0.35)]"
            onError={(e) => { e.currentTarget.parentElement.style.display = 'none' }}
          />
        </motion.div>

        {/* full interactive skill chips — covers every skill, including ones not pictured above */}
        {isMobile ? (
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {SKILLS.map((s) => (
              <div key={s.name} className="glass-card min-w-[100px] flex flex-col items-center gap-2 py-5 snap-center">
                <span className="text-2xl"><SkillIcon icon={s.icon} color={s.color} /></span>
                <span className="text-[10px] font-grotesk text-slate-muted">{s.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {SKILLS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.12, y: -4 }}
                className="glass-pill w-20 h-20 flex flex-col items-center justify-center gap-1 text-2xl"
                title={s.name}
                data-cursor-hover
              >
                <SkillIcon icon={s.icon} color={s.color} />
                <span className="text-[9px] font-grotesk text-slate-muted">{s.name}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
