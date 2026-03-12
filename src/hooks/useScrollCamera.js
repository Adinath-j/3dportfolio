import { useRef, useEffect, useState } from 'react'

export function useScrollCamera() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const rafRef = useRef(null)
  const targetScrollY = useRef(0)
  const currentScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      targetScrollY.current = window.scrollY
    }

    const animate = () => {
      // Smooth lerp
      currentScrollY.current += (targetScrollY.current - currentScrollY.current) * 0.08
      setScrollY(currentScrollY.current)

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(currentScrollY.current / maxScroll)

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { scrollY, scrollProgress }
}

export function useMouseParallax(strength = 0.05) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const targetMouse = useRef({ x: 0, y: 0 })
  const currentMouse = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth - 0.5) * strength
      targetMouse.current.y = -(e.clientY / window.innerHeight - 0.5) * strength
    }

    const animate = () => {
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.05
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.05
      setMouse({ x: currentMouse.current.x, y: currentMouse.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [strength])

  return mouse
}