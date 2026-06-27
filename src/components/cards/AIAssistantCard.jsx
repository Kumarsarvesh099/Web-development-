import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { IoSend } from 'react-icons/io5'
import { RiRobot2Fill } from 'react-icons/ri'
import GlassCard from './GlassCard'

const QUICK = [
  { label: 'About Sarvesh', reply: 'Sarvesh is an AI & Full Stack Developer from Raebareli, UP — 2+ years building web apps and AI products.' },
  { label: 'My Projects', reply: 'Check the Projects section — Weather App, AI Chatbot, StudyNotion and more are featured there.' },
  { label: 'Skills', reply: 'React, Next.js, Node, Express, MongoDB, Python, Tailwind and Three.js are his core tools.' },
  { label: 'Resume', reply: 'Use the Download Resume button in the hero section to grab the PDF.' },
]

export default function AIAssistantCard() {
  const [messages, setMessages] = useState([{ from: 'bot', text: "Hello! I'm Jarvis 👋 How can I help you today?" }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef()

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const send = (text, reply) => {
    if (!text.trim()) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: 'bot', text: reply || "Thanks! Feel free to explore the sections above too." }])
    }, 700)
  }

  return (
    <GlassCard className="w-full relative overflow-visible">
      {/* Header: robot image + title inline */}
      <div className="flex items-center gap-3 mb-4">
        <motion.img
          src="/assets/robot/robot.png"
          alt="AI robot"
          className="w-12 h-12 object-contain flex-shrink-0 drop-shadow-[0_0_14px_rgba(34,211,238,0.7)] rounded-lg"
          style={{ background: 'transparent' }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div>
          <p className="text-xs font-grotesk font-semibold tracking-widest text-cyan/80 flex items-center gap-1">
            <RiRobot2Fill /> AI ASSISTANT
          </p>
          <p className="text-[10px] text-success flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success inline-block animate-pulse" /> Online
          </p>
        </div>
      </div>

      {/* Chat messages */}
      <div ref={bodyRef} className="max-h-[130px] overflow-y-auto space-y-2 mb-3 pr-1">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xs px-3 py-2 rounded-xl max-w-[88%] font-poppins leading-relaxed ${
                m.from === 'bot'
                  ? 'bg-white/5 border border-white/8 text-slate-para'
                  : 'bg-cyan/10 border border-cyan/20 ml-auto text-right text-cyan/90'
              }`}
            >
              {m.text}
            </motion.div>
          ))}
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs px-3 py-2 rounded-xl bg-white/5 border border-white/8 w-fit">
              <span className="inline-flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="w-1 h-1 rounded-full bg-cyan inline-block" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                ))}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick replies */}
      <div className="flex flex-col gap-1.5 mb-3">
        {QUICK.map((q) => (
          <button
            key={q.label}
            onClick={() => send(q.label, q.reply)}
            className="text-left text-[11px] px-3 py-1.5 rounded-lg bg-white/4 border border-white/8 hover:border-cyan/40 hover:bg-cyan/8 transition-all font-grotesk text-slate-para hover:text-white"
            data-cursor-hover
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-white/8 pt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send(input)}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-slate-muted font-poppins text-slate-para"
        />
        <button
          onClick={() => send(input)}
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-blue text-space flex items-center justify-center hover:scale-110 transition-transform flex-shrink-0"
          data-cursor-hover
        >
          <IoSend size={12} />
        </button>
      </div>
    </GlassCard>
  )
}
