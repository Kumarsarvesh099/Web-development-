import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'

const STATUS_COLORS = { Live: 'bg-success/15 text-success', 'In Progress': 'bg-warning/15 text-warning', Archived: 'bg-slate-muted/15 text-slate-muted' }

export default function ProjectCard({ project, perf, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={perf.tilt ? { rotateX: -4, rotateY: 4, scale: 1.03, y: -6 } : { y: -4 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={`glass-card p-5 group relative ${project.featured ? 'border border-cyan/40 shadow-[0_0_24px_rgba(34,211,238,0.15)]' : ''}`}
      data-cursor-hover
    >
      {/* Featured badge */}
      {project.featured && (
        <motion.div
          className="absolute -top-3 left-4 z-20 flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-grotesk font-bold tracking-widest"
          style={{
            background: 'linear-gradient(135deg, #22D3EE, #3B82F6)',
            boxShadow: '0 0 16px rgba(34,211,238,0.6), 0 0 32px rgba(34,211,238,0.2)',
            color: '#000',
          }}
          animate={{ boxShadow: ['0 0 16px rgba(34,211,238,0.4)', '0 0 28px rgba(34,211,238,0.8)', '0 0 16px rgba(34,211,238,0.4)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <HiSparkles size={10} /> MAJOR PROJECT
        </motion.div>
      )}

      {/* Status badge */}
      <span className={`absolute top-4 right-4 z-10 text-[10px] px-2 py-1 rounded-sm font-grotesk ${STATUS_COLORS[project.status] || STATUS_COLORS.Live}`}>
        {project.status}
      </span>

      <div className="relative w-full h-40 rounded-md bg-white/5 mb-4 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-cyan/70 shadow-[0_0_10px_#22D3EE] opacity-0 group-hover:opacity-100"
          initial={{ top: 0 }}
          whileHover={{ top: '100%' }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </div>

      <h3 className="font-orbitron text-base font-bold mb-2">{project.title}</h3>
      <p className="text-slate-para text-sm mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((t) => (
          <span key={t} className="text-[10px] px-2 py-1 rounded-sm bg-white/5 border border-cyan/15 group-hover:border-cyan/40 transition-colors font-grotesk">{t}</span>
        ))}
      </div>
      <div className="flex gap-4 text-sm font-grotesk">
        <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan transition-colors"><FaGithub /> Code</a>
        <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan transition-colors"><FaExternalLinkAlt /> Live Demo</a>
      </div>
    </motion.div>
  )
}
