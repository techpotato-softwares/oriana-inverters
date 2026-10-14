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
 * Viewport height aligned with CSS `svh` / sticky pin math.
 * Prefer `clientHeight` over `innerHeight` so classic Windows scrollbars and
 * DPI scaling do not desync scrub progress from the pinned section height.
 */
export function readViewportHeightPx(fallback = 800) {
  if (typeof window === 'undefined') return fallback
  const vv = window.visualViewport?.height
  if (typeof vv === 'number' && vv > 0) return vv
  return document.documentElement.clientHeight || window.innerHeight || fallback
}

/** Pin height in px — must match `STICKY_BELOW_NAV_HEIGHT` (`100svh - header`). */
export function readStickyPinHeightPx(fallbackHeader = 80) {
  return Math.max(readViewportHeightPx() - readSiteHeaderHeightPx(fallbackHeader), 1)
}

/**
 * Prefer the live sticky element's box when available so CSS `svh` and JS scrub
 * share one measurement across Mac overlay scrollbars and Windows classic ones.
 */
export function measureStickyPinHeightPx(
  section: HTMLElement | null,
  fallbackHeader = 80,
) {
  const sticky = section?.querySelector<HTMLElement>('[data-sticky-pin]')
  const measured = sticky?.getBoundingClientRect().height ?? 0
  return measured > 0 ? measured : readStickyPinHeightPx(fallbackHeader)
}

/**
 * Sticky Vision / Why Choose scrub runs on every machine and resolution.
 * Pin height is fluid (`100svh - header`). Sections still use the compact
 * stacked / scroll-snap UI when `prefers-reduced-motion` is set.
 */
export function useStickyScrub() {
  return true
}
