/**
 * Seed media helpers: reuse by filename, upload into S3 when configured,
 * and fall back to an existing media id when upload fails or CI has no bucket.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload } from 'payload'

const filename = fileURLToPath(import.meta.url)
export const uiAssetsRoot = path.resolve(
  path.dirname(filename),
  '../../../../../ui/public/assets',
)

/** Unwrap a Payload upload relation (id | { id } | null). */
export function mediaId(value: unknown): number | string | null {
  if (value == null) return null
  if (typeof value === 'number' || typeof value === 'string') return value
  if (typeof value === 'object' && value !== null && 'id' in value) {
    const id = (value as { id: unknown }).id
    if (typeof id === 'number' || typeof id === 'string') return id
  }
  return null
}

function mimetypeFor(name: string): string {
  if (name.endsWith('.svg')) return 'image/svg+xml'
  if (name.endsWith('.png')) return 'image/png'
  if (name.endsWith('.jpg') || name.endsWith('.jpeg')) return 'image/jpeg'
  if (name.endsWith('.webp')) return 'image/webp'
  return 'application/octet-stream'
}

function inCi(): boolean {
  return process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true'
}

/**
 * Prefer existing Media by filename (already on S3), else upload from
 * apps/ui/public/assets. On CI without S3_BUCKET, skip create and return keepId
 * so we never point globals at runner-local files that disappear after the job.
 */
export async function resolveSeedMedia(
  payload: Payload,
  relativePath: string,
  alt: string,
  keepId?: number | string | null,
): Promise<number | string | null> {
  const name = path.basename(relativePath)

  try {
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: name } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const hit = existing.docs[0]
    if (hit?.id != null) {
      payload.logger.info(`Reusing media \`${name}\` (id=${hit.id})`)
      return hit.id
    }
  } catch (err) {
    payload.logger.warn(`Media lookup failed for ${name}: ${err}`)
  }

  const s3Bucket = process.env.S3_BUCKET?.trim()
  if (inCi() && !s3Bucket) {
    payload.logger.warn(
      `S3_BUCKET unset in CI — not creating local-only media for \`${name}\`; keeping existing id=${keepId ?? 'none'}`,
    )
    return keepId ?? null
  }

  const fullPath = path.join(uiAssetsRoot, relativePath)
  if (!fs.existsSync(fullPath)) {
    payload.logger.warn(`Asset missing: ${fullPath} — keeping existing id=${keepId ?? 'none'}`)
    return keepId ?? null
  }

  const data = fs.readFileSync(fullPath)
  try {
    const doc = await payload.create({
      collection: 'media',
      data: {
        alt,
        mediaType: 'image',
        tags: [{ tag: 'seed' }, { tag: 'hero' }],
      } as never,
      file: {
        data,
        mimetype: mimetypeFor(name),
        name,
        size: data.length,
      },
      overrideAccess: true,
      context: { disableRevalidate: true },
    })
    payload.logger.info(
      `Uploaded media \`${name}\` → id=${doc.id}${s3Bucket ? ` (S3://${s3Bucket})` : ' (local disk)'}`,
    )
    return doc.id
  } catch (err) {
    payload.logger.warn(
      `Upload failed for ${relativePath}: ${err} — keeping existing id=${keepId ?? 'none'}`,
    )
    return keepId ?? null
  }
}

/** Prefer newly resolved id; if null, keep the previous relation. */
export function preferMedia(
  next: number | string | null | undefined,
  prev: number | string | null | undefined,
): number | string | null {
  return next ?? prev ?? null
}
