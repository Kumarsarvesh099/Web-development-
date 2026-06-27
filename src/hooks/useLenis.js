import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false, // native scroll on touch devices for battery (Doc 7 #31)
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)
    window.__lenis = lenis

    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      window.__lenis = null
    }
  }, [enabled])
}
