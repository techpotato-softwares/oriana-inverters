import type { Payload, PayloadRequest } from 'payload'

import { seedSite } from './site'

/**
 * Admin /next/seed entry — seeds Oriana site content (idempotent).
 * Legacy Payload website-template demo seed has been replaced.
 */
export const seed = async ({
  payload,
}: {
  payload: Payload
  req?: PayloadRequest
}): Promise<void> => {
  await seedSite({ payload })
}
