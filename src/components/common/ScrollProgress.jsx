import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100
      setProgress(scrolled || 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-cyan to-blue transition-[width] duration-150"
        style={{ width: `${progress}%`, boxShadow: '0 0 10px #22D3EE' }}
      />
    </div>
  )
}
