import { motion } from 'framer-motion'
import { FaLocationDot, FaGlobe } from 'react-icons/fa6'
import GlassCard from './GlassCard'
import { CONTACT_INFO } from '../../data/social'

export default function LocationCard() {
  return (
    <GlassCard className="w-full">
      <div className="flex justify-between text-[11px] text-slate-muted tracking-widest mb-4 font-grotesk">
        <span className="flex items-center gap-1.5 text-cyan/70"><FaGlobe /> LOCATION</span>
      </div>
      <div className="flex items-center gap-4">
        <motion.img
          src="/src/assets/globe/location-globe.png"
          alt="location globe"
          className="w-20 h-20 object-contain drop-shadow-[0_0_18px_rgba(34,211,238,0.7)] flex-shrink-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div>
          <p className="flex items-center gap-1.5 text-slate-muted text-xs font-grotesk mb-1">
            <FaLocationDot className="text-cyan" /> India
          </p>
          <p className="font-orbitron font-bold text-white text-lg leading-tight">
            {CONTACT_INFO.location?.split(',')[0] || 'Raebareli'}
          </p>
          <p className="text-xs text-slate-muted font-grotesk mt-0.5">Uttar Pradesh, IN</p>
        </div>
      </div>
    </GlassCard>
  )
}
