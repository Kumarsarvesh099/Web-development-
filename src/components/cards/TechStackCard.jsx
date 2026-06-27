import { motion } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs,
  SiExpress, SiMongodb, SiPython, SiThreedotjs,
  SiJavascript, SiTypescript, SiGit, SiGithub,
  SiDocker, SiPostgresql, SiFirebase, SiVercel
} from 'react-icons/si'
import GlassCard from './GlassCard'

const STACK = [
  { key: 'react',      Icon: SiReact,       name: 'React',      color: '#61DAFB' },
  { key: 'next',       Icon: SiNextdotjs,   name: 'Next.js',    color: '#ffffff' },
  { key: 'tw',         Icon: SiTailwindcss, name: 'Tailwind',   color: '#38BDF8' },
  { key: 'js',         Icon: SiJavascript,  name: 'JavaScript', color: '#F7DF1E' },
  { key: 'ts',         Icon: SiTypescript,  name: 'TypeScript', color: '#3178C6' },
  { key: 'node',       Icon: SiNodedotjs,   name: 'Node.js',    color: '#3C873A' },
  { key: 'express',    Icon: SiExpress,     name: 'Express',    color: '#aaaaaa' },
  { key: 'mongo',      Icon: SiMongodb,     name: 'MongoDB',    color: '#47A248' },
  { key: 'python',     Icon: SiPython,      name: 'Python',     color: '#3776AB' },
  { key: 'git',        Icon: SiGit,         name: 'Git',        color: '#F05032' },
  { key: 'github',     Icon: SiGithub,      name: 'GitHub',     color: '#ffffff' },
  { key: 'three',      Icon: SiThreedotjs,  name: 'Three.js',   color: '#ffffff' },
]

export default function TechStackCard() {
  return (
    <GlassCard className="w-full h-full">
      <p className="text-[11px] text-cyan/70 tracking-widest mb-5 font-grotesk">TECH STACK</p>
      <div className="grid grid-cols-4 gap-3 text-center">
        {STACK.map(({ key, Icon, name, color }) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.2, y: -4 }}
            className="flex flex-col items-center gap-2 cursor-default group"
            title={name}
          >
            <motion.span
              className="flex items-center justify-center rounded-xl transition-all duration-200"
              style={{
                fontSize: 26,
                width: 46,
                height: 46,
                color: '#64748B',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              whileHover={{
                color,
                filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}80)`,
                background: `${color}15`,
                borderColor: `${color}40`,
              }}
              transition={{ duration: 0.2 }}
            >
              <Icon />
            </motion.span>
            <span className="text-[8px] font-grotesk tracking-wide text-slate-muted group-hover:text-white/70 transition-colors">
              {name}
            </span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}