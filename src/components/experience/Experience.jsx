import { motion } from 'framer-motion'
import { FaBriefcase } from 'react-icons/fa'
import SectionTitle from '../common/SectionTitle'
import { EXPERIENCE } from '../../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-5 md:px-12 laptop:pl-32">
      <div className="max-w-4xl mx-auto">
        <SectionTitle num="05" title="EXPERIENCE TIMELINE" />

        <div className="relative pl-8 border-l-2 border-cyan/15">
          <motion.div
            className="absolute -left-[2px] top-0 w-[3px] h-16 bg-gradient-to-b from-transparent via-cyan to-transparent"
            animate={{ y: ['0%', '600%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative mb-10 pl-6 glass-card p-5"
            >
              <motion.span
                className="absolute -left-[41px] top-5 w-3.5 h-3.5 rounded-full bg-cyan"
                animate={{ boxShadow: ['0 0 0px #22D3EE', '0 0 14px #22D3EE', '0 0 0px #22D3EE'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="text-xs text-cyan mb-1 font-orbitron">{e.year}</p>
              <h3 className="font-grotesk font-bold text-lg flex items-center gap-2"><FaBriefcase className="text-purple" /> {e.role}</h3>
              <p className="text-sm text-purple mb-2 font-grotesk">{e.company}</p>
              <p className="text-slate-para text-sm">{e.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
