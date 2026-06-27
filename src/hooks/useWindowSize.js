import { useEffect, useState } from 'react'

const BREAKPOINTS = [
  ['mobileS', 0], ['mobileM', 375], ['mobileL', 425],
  ['tablet', 768], ['laptop', 1024], ['desktop', 1280],
  ['xl', 1536], ['2k', 1920],
]

function getBreakpoint(width) {
  let current = 'mobileS'
  for (const [name, min] of BREAKPOINTS) {
    if (width >= min) current = name
  }
  return current
}

export default function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    breakpoint: typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'desktop',
  })

  useEffect(() => {
    let frame
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
          breakpoint: getBreakpoint(window.innerWidth),
        })
      })
    }
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(frame) }
  }, [])

  return size
}
