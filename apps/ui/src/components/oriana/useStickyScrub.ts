import { useLayoutEffect, useState } from 'react'

/** Desktop sticky scrub: wide enough for split / horizontal track. */
export const STICKY_MIN_WIDTH = 1024
/**
 * Floor for sticky pin layouts. Keep this below typical laptop chrome
 * (13" ~1440×900 minus browser UI is often 650–780px, not 820+).
 */
export const STICKY_MIN_HEIGHT = 560

/** Pin sticky sections under the fixed SiteHeader. */
export const STICKY_BELOW_NAV_TOP = 'var(--site-header-height, 5rem)'
export const STICKY_BELOW_NAV_HEIGHT = 'calc(100svh - var(--site-header-height, 5rem))'

export function readSiteHeaderHeightPx(fallback = 80) {
  if (typeof window === 'undefined') return fallback
  const n = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'),
  )
  return Number.isFinite(n) && n > 0 ? n : fallback
}

/** True when the viewport can run sticky scroll-scrub sections. */
export function useStickyScrub() {
  const [enabled, setEnabled] = useState(false)

  useLayoutEffect(() => {
    const widthMq = window.matchMedia(`(min-width: ${STICKY_MIN_WIDTH}px)`)
    const heightMq = window.matchMedia(`(min-height: ${STICKY_MIN_HEIGHT}px)`)
    const sync = () => setEnabled(widthMq.matches && heightMq.matches)
    sync()
    widthMq.addEventListener('change', sync)
    heightMq.addEventListener('change', sync)
    return () => {
      widthMq.removeEventListener('change', sync)
      heightMq.removeEventListener('change', sync)
    }
  }, [])

  return enabled
}
