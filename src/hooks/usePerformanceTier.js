import { useMemo } from 'react'
import useWindowSize from './useWindowSize'

// Tier thresholds collapse the 8 breakpoints into the 4 performance
// categories used throughout Document 7 (mobile / tablet / laptop / desktop).
function tierFromWidth(width) {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  if (width < 1280) return 'laptop'
  return 'desktop'
}

const BUDGETS = {
  desktop: { particles: 200, stars: 1200, bloom: 'high', blurPx: 24, orbitRings: 3, lights: 6, shadow: 'strong', textureSize: 2048, cursor: true, tilt: true, parallax: true },
  laptop:  { particles: 150, stars: 900,  bloom: 'medium', blurPx: 20, orbitRings: 3, lights: 4, shadow: 'medium', textureSize: 1024, cursor: true, tilt: true, parallax: true },
  tablet:  { particles: 80,  stars: 600,  bloom: 'low', blurPx: 16, orbitRings: 2, lights: 3, shadow: 'light', textureSize: 1024, cursor: false, tilt: false, parallax: false },
  mobile:  { particles: 35,  stars: 300,  bloom: 'off', blurPx: 12, orbitRings: 1, lights: 2, shadow: 'light', textureSize: 512, cursor: false, tilt: false, parallax: false },
}

export default function usePerformanceTier() {
  const { width, breakpoint } = useWindowSize()
  const tier = useMemo(() => tierFromWidth(width), [width])
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const budget = BUDGETS[tier]

  return {
    tier,            // 'mobile' | 'tablet' | 'laptop' | 'desktop'
    breakpoint,       // fine-grained breakpoint name
    isTouch,
    prefersReducedMotion,
    ...budget,
    // hard overrides
    cursor: budget.cursor && !isTouch && !prefersReducedMotion,
    tilt: budget.tilt && !isTouch,
    parallax: budget.parallax && !isTouch,
    particles: prefersReducedMotion ? 0 : budget.particles,
    stars: prefersReducedMotion ? Math.floor(budget.stars / 3) : budget.stars,
  }
}
