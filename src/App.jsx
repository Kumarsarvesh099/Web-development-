import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import useLenis from './hooks/useLenis'
import useScrollSpy from './hooks/useScrollSpy'
import usePerformanceTier from './hooks/usePerformanceTier'

import Loader from './components/loader/Loader'
import Cursor from './components/cursor/Cursor'
import ScrollProgress from './components/common/ScrollProgress'
import Scene from './components/three/Scene'
import Navbar from './components/navbar/Navbar'
import PlanetNavigation from './components/planetNavigation/PlanetNavigation'
import Hero from './components/hero/Hero'
import About from './components/about/About'
import SkillsGalaxy from './components/skills/SkillsGalaxy'
import Projects from './components/projects/Projects'
import Experience from './components/experience/Experience'
import Achievements from './components/achievements/Achievements'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const perf = usePerformanceTier()
  useLenis(!perf.isTouch) // smooth scroll desktop, native on touch devices (battery)
  const active = useScrollSpy()
  const [loaded, setLoaded] = useState(false)

  // generic fade-up-blur reveal for every section, once loader finishes
  useEffect(() => {
    if (!loaded) return
    const panels = document.querySelectorAll('section')
    const anims = []
    panels.forEach((panel) => {
      const anim = gsap.fromTo(
        panel,
        { opacity: 0, y: 50, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: panel, start: 'top 80%', once: true },
        }
      )
      anims.push(anim)
    })
    ScrollTrigger.refresh()
    return () => anims.forEach((a) => a.scrollTrigger?.kill())
  }, [loaded])

  return (
    <div className="relative">
      <Loader onDone={() => setLoaded(true)} />
      <ScrollProgress />
      <Cursor enabled={perf.cursor} />
      <Scene perf={perf} />

      <Navbar active={active} />
      <PlanetNavigation active={active} />

      <main className="relative z-10">
        <Hero perf={perf} />
        <About />
        <SkillsGalaxy perf={perf} />
        <Projects perf={perf} />
        <Experience />
        <Achievements />
        <Contact perf={perf} />
      </main>

      <Footer />
    </div>
  )
}
