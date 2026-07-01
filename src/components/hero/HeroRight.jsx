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
    >
      {/* Mobile layout: 2×2 grid
          [Location]  [Status]
          [TechStack] [AIAssistant]       */}
      <div className="grid grid-cols-2 gap-3 laptop:hidden">
        <LocationCard />
        <StatusCard />
        <TechStackCard />
        <AIAssistantCard />
      </div>

      {/* Laptop layout: 3-column (unchanged) */}
      <div className="hidden laptop:grid laptop:grid-cols-3 gap-4 items-start">
        <div className="flex flex-col gap-4">
          <LocationCard />
          <StatusCard />
        </div>
        <TechStackCard />
        <AIAssistantCard />
      </div>
    </motion.div>
  )
}
