import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import GlassCard from './GlassCard'

export default function StatusCard() {
  return (
    <GlassCard className="w-full">
      <div className="text-[11px] text-slate-muted tracking-widest mb-4 font-grotesk">
        <span className="flex items-center gap-1.5 text-cyan/70"><FaCheckCircle /> STATUS</span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <motion.span
            className="w-3 h-3 rounded-full bg-success flex-shrink-0"
            animate={{ scale: [1, 1.5, 1], boxShadow: ['0 0 0px #22C55E', '0 0 14px #22C55E', '0 0 0px #22C55E'] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <div>
            <p className="text-xs text-slate-muted font-grotesk">Currently</p>
            <p className="font-orbitron font-bold text-success text-base">Available</p>
          </div>
        </div>
        <div className="h-[1px] bg-white/5" />
        <p className="text-xs text-slate-para font-grotesk">
          Open for <span className="text-cyan font-semibold">Internship</span> & <span className="text-blue font-semibold">Freelance</span> projects
        </p>
      </div>
    </GlassCard>
  )
}
