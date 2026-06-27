import { useEffect, useState } from 'react'

export default function useMouse(enabled = true) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled])

  return pos
}
