import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { MdEmail } from 'react-icons/md'
import { FaLocationDot, FaUser } from 'react-icons/fa6'
import { IoSend } from 'react-icons/io5'
import { FaRegFileAlt, FaPhoneAlt } from 'react-icons/fa'
import SectionTitle from '../common/SectionTitle'
import EarthGlobe from './EarthGlobe'
import { CONTACT_INFO, SOCIAL_LINKS } from '../../data/social'
import * as Fa from 'react-icons/fa'
import * as Fa6 from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'

function SocialIcon({ icon }) {
  if (icon === 'SiLeetcode') return <SiLeetcode />
  if (icon === 'MdEmail') return <MdEmail />
  const Fa6Icon = Fa6[icon]
  if (Fa6Icon) return <Fa6Icon />
  const Icon = Fa[icon]
  return Icon ? <Icon /> : null
}

const inputCls = "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all font-grotesk"
const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
}

// EmailJS credentials — set these in your .env file (see EMAILJS_SETUP.md)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function Contact({ perf }) {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error(
        'EmailJS is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY to your .env file. See EMAILJS_SETUP.md'
      )
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    setStatus('sending')

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      .then(() => {
        setStatus('success')
        formRef.current.reset()
        setTimeout(() => setStatus('idle'), 5000)
      })
      .catch((err) => {
        console.error('EmailJS error:', err)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      })
  }

  return (
    <section id="contact" className="relative py-24 px-5 md:px-12 laptop:pl-32">
      <div className="max-w-6xl mx-auto">
        <SectionTitle num="07" title="CONTACT ME" />

        <div className="grid laptop:grid-cols-2 gap-6">
          {/* Left card: info + globe */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-7 flex flex-col gap-5"
          >
            <div>
              <p className="font-orbitron text-lg font-bold mb-1" style={{ color: '#22D3EE' }}>
                Let's build something amazing!
              </p>
              <p className="text-slate-muted text-sm font-grotesk">Open for internships, freelance & collaborations.</p>
            </div>

            <div className="space-y-3">
              {[
                { Icon: MdEmail, text: CONTACT_INFO.email },
                { Icon: FaPhoneAlt, text: CONTACT_INFO.phone },
                { Icon: FaLocationDot, text: CONTACT_INFO.location },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-grotesk text-slate-para">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-cyan flex-shrink-0"
                    style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)' }}>
                    <Icon size={13} />
                  </span>
                  {text}
                </div>
              ))}
            </div>

            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" data-cursor-hover
                  className="w-9 h-9 rounded-lg glass-pill flex items-center justify-center hover:shadow-glowCyan hover:scale-110 transition-all text-sm">
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
            </div>

            {/* Globe fits card width */}
            <div className="rounded-2xl overflow-hidden flex-1 min-h-[180px]"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(34,211,238,0.1)' }}>
              <EarthGlobe perf={perf} />
            </div>
          </motion.div>

          {/* Right card: contact form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-7 flex flex-col gap-4"
          >
            <p className="font-orbitron text-sm tracking-widest text-cyan/60 mb-1">SEND A MESSAGE</p>

            {/* Name — must match {{name}} in your EmailJS template */}
            <label className={inputCls} style={inputStyle}>
              <FaUser className="text-slate-muted flex-shrink-0" size={13} />
              <input
                required
                name="name"
                placeholder="Your Name"
                className="bg-transparent outline-none w-full text-slate-para placeholder:text-slate-muted"
                onFocus={(e) => Object.assign(e.target.parentElement.style, { borderColor: 'rgba(34,211,238,0.45)' })}
                onBlur={(e) => Object.assign(e.target.parentElement.style, { borderColor: 'rgba(255,255,255,0.08)' })}
              />
            </label>

            {/* Email — must match {{email}} (used as Reply To) */}
            <label className={inputCls} style={inputStyle}>
              <MdEmail className="text-slate-muted flex-shrink-0" size={14} />
              <input
                required
                type="email"
                name="email"
                placeholder="Your Email"
                className="bg-transparent outline-none w-full text-slate-para placeholder:text-slate-muted"
                onFocus={(e) => Object.assign(e.target.parentElement.style, { borderColor: 'rgba(34,211,238,0.45)' })}
                onBlur={(e) => Object.assign(e.target.parentElement.style, { borderColor: 'rgba(255,255,255,0.08)' })}
              />
            </label>

            {/* Subject — must match {{title}} */}
            <label className={inputCls} style={inputStyle}>
              <FaRegFileAlt className="text-slate-muted flex-shrink-0" size={13} />
              <input
                required
                name="title"
                placeholder="Subject"
                className="bg-transparent outline-none w-full text-slate-para placeholder:text-slate-muted"
                onFocus={(e) => Object.assign(e.target.parentElement.style, { borderColor: 'rgba(34,211,238,0.45)' })}
                onBlur={(e) => Object.assign(e.target.parentElement.style, { borderColor: 'rgba(255,255,255,0.08)' })}
              />
            </label>

            {/* Message — must match {{message}} */}
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Your Message..."
              className="rounded-xl px-4 py-3 text-sm outline-none font-grotesk text-slate-para placeholder:text-slate-muted resize-none flex-1"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(34,211,238,0.45)' }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
            />

            {/* hidden field so {{time}} in the template body isn't left blank */}
            <input type="hidden" name="time" value={new Date().toLocaleString()} readOnly />


            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary inline-flex items-center justify-center gap-2 mt-auto disabled:opacity-60 disabled:cursor-not-allowed"
              data-cursor-hover
            >
              {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'} <IoSend />
            </button>

            {status === 'success' && (
              <p className="text-sm text-center font-grotesk" style={{ color: '#22D3EE' }}>
                ✓ Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-center font-grotesk text-red-400">
                ✕ Something went wrong. Please email me directly at {CONTACT_INFO.email}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
