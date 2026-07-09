import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact']

export default function useScrollSpy() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const triggers = SECTIONS.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActive(id),
        onEnterBack: () => setActive(id),
      })
    )
    return () => triggers.forEach((t) => t.kill())
  }, [])

  return active
}
