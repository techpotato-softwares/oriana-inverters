import type { Payload } from 'payload'

import { defaultLaunchPage } from '@/data/launchDefaults'

/** Upsert Launch page global defaults (Admin → Launch page). */
export async function seedLaunchPage(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: 'launch-page',
    data: {
      enabled: defaultLaunchPage.enabled,
      countdownSeconds: defaultLaunchPage.countdownSeconds,
      headline: defaultLaunchPage.headline,
      subheadline: defaultLaunchPage.subheadline,
      launchMessage: defaultLaunchPage.launchMessage,
      redirectUrl: defaultLaunchPage.redirectUrl,
      redirectDelayMs: defaultLaunchPage.redirectDelayMs,
    },
    overrideAccess: true,
    context: { disableRevalidate: true },
  })
  payload.logger.info('— Launch page global upserted (/launch)')
}
