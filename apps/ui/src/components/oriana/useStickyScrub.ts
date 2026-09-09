/**
 * Sticky scrub pin under the fixed SiteHeader.
 * Uses svh so the pin always tracks the real viewport (Windows scaling, laptop
 * chrome, mobile browser UI) — no min-width / min-height gate that disables it.
 */
export const STICKY_BELOW_NAV_TOP = 'var(--site-header-height, 5rem)'
export const STICKY_BELOW_NAV_HEIGHT = 'calc(100svh - var(--site-header-height, 5rem))'

export function readSiteHeaderHeightPx(fallback = 80) {
  if (typeof window === 'undefined') return fallback
  const n = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'),
  )
  return Number.isFinite(n) && n > 0 ? n : fallback
}

/**
 * Sticky Vision / Why Choose scrub runs on every machine and resolution.
 * Pin height is fluid (`100svh - header`). Sections still use the compact
 * stacked / scroll-snap UI when `prefers-reduced-motion` is set.
 */
export function useStickyScrub() {
  return true
}
