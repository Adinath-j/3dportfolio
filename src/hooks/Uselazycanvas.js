import { useState, useEffect, useRef } from 'react'

/**
 * Returns a ref to attach to the wrapper div, and a boolean `shouldRender`.
 * The canvas only mounts when the section scrolls into view (+ rootMargin buffer).
 * Once mounted it stays mounted (no unmount on scroll-out) to avoid context churn.
 */
export function useLazyCanvas(rootMargin = '200px') {
  const wrapperRef = useRef(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    // If IntersectionObserver isn't available, just render immediately
    if (typeof IntersectionObserver === 'undefined') {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect() // Once rendered, never unmount
        }
      },
      { rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return { wrapperRef, shouldRender }
}