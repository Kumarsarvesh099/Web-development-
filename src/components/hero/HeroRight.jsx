import { motion } from 'framer-motion'
import LocationCard from '../cards/LocationCard'
import StatusCard from '../cards/StatusCard'
import TechStackCard from '../cards/TechStackCard'
import AIAssistantCard from '../cards/AIAssistantCard'

export default function HeroRight() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.15, delayChildren: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-2 laptop:grid-cols-3 gap-4 items-start"
    >
      {/* Column 1: Location on top, Status below — stacked */}
      <div className="flex flex-col gap-4">
        <LocationCard />
        <StatusCard />
      </div>

      {/* Column 2: Tech Stack (taller, fills height) */}
      <TechStackCard />

      {/* Column 3: AI Assistant */}
      <AIAssistantCard />
    </motion.div>
  )
}
