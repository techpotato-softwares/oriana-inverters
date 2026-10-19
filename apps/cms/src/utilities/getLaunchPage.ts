import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import {
  clampCountdownSeconds,
  clampRedirectDelayMs,
  defaultLaunchPage,
  normalizeRedirectUrl,
  type LaunchPageView,
} from '@/data/launchDefaults'

function mapLaunchDoc(doc: Record<string, unknown> | null | undefined): LaunchPageView {
  if (!doc) return defaultLaunchPage
  return {
    enabled: doc.enabled !== false,
    countdownSeconds: clampCountdownSeconds(doc.countdownSeconds),
    headline:
      typeof doc.headline === 'string' && doc.headline.trim()
        ? doc.headline.trim()
        : defaultLaunchPage.headline,
    subheadline:
      typeof doc.subheadline === 'string' && doc.subheadline.trim()
        ? doc.subheadline.trim()
        : defaultLaunchPage.subheadline,
    launchMessage:
      typeof doc.launchMessage === 'string' && doc.launchMessage.trim()
        ? doc.launchMessage.trim()
        : defaultLaunchPage.launchMessage,
    redirectUrl: normalizeRedirectUrl(doc.redirectUrl),
    redirectDelayMs: clampRedirectDelayMs(doc.redirectDelayMs),
  }
}

async function fetchLaunchPage(): Promise<LaunchPageView> {
  try {
    const payload = await getPayload({ config: configPromise })
    const doc = await payload.findGlobal({
      slug: 'launch-page',
      depth: 0,
    })
    return mapLaunchDoc(doc as unknown as Record<string, unknown>)
  } catch {
    return defaultLaunchPage
  }
}

export const getLaunchPage = unstable_cache(fetchLaunchPage, ['launch-page'], {
  tags: ['launch-page'],
  revalidate: 60,
})
