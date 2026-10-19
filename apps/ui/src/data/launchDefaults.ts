export type LaunchPageView = {
  enabled: boolean
  countdownSeconds: number
  headline: string
  subheadline: string
  launchMessage: string
  redirectUrl: string
  redirectDelayMs: number
}

export const defaultLaunchPage: LaunchPageView = {
  enabled: true,
  countdownSeconds: 10,
  headline: 'We’re launching',
  subheadline: 'Oriana Inverters is almost ready. Hang tight for a moment.',
  launchMessage: 'We’re live!',
  redirectUrl: '/',
  redirectDelayMs: 3200,
}

export function clampCountdownSeconds(value: unknown): number {
  const n = typeof value === 'number' && Number.isFinite(value) ? Math.round(value) : 10
  return Math.min(60, Math.max(3, n))
}

export function clampRedirectDelayMs(value: unknown): number {
  const n = typeof value === 'number' && Number.isFinite(value) ? Math.round(value) : 3200
  return Math.min(10000, Math.max(500, n))
}

export function normalizeRedirectUrl(value: unknown): string {
  const raw = typeof value === 'string' ? value.trim() : ''
  if (!raw) return '/'
  // Allow same-origin paths and absolute http(s) URLs only.
  if (raw.startsWith('/') && !raw.startsWith('//')) return raw
  try {
    const url = new URL(raw)
    if (url.protocol === 'http:' || url.protocol === 'https:') return url.toString()
  } catch {
    /* fall through */
  }
  return '/'
}
