/**
 * Hard-coded public website launch (IST).
 * After this instant, the homepage gate is off automatically — no admin toggle.
 *
 * 20 October 2026, 2:30 PM IST (Asia/Kolkata, UTC+05:30)
 */
export const WEBSITE_LAUNCH_AT = new Date('2026-10-20T14:30:00+05:30')

export const WEBSITE_LAUNCH_AT_MS = WEBSITE_LAUNCH_AT.getTime()

export function isBeforeWebsiteLaunch(nowMs: number = Date.now()): boolean {
  return nowMs < WEBSITE_LAUNCH_AT_MS
}

export function msUntilWebsiteLaunch(nowMs: number = Date.now()): number {
  return Math.max(0, WEBSITE_LAUNCH_AT_MS - nowMs)
}

/** Remaining time as HH:MM:SS (hours may exceed 24). */
export function formatLaunchCountdown(ms: number): { hh: string; mm: string; ss: string } {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const hh = Math.floor(totalSec / 3600)
  const mm = Math.floor((totalSec % 3600) / 60)
  const ss = totalSec % 60
  return {
    hh: String(hh).padStart(2, '0'),
    mm: String(mm).padStart(2, '0'),
    ss: String(ss).padStart(2, '0'),
  }
}
