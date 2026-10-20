/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 *
 * Absolute same-site URLs (apex / www / CloudFront) are rewritten to a
 * relative path so the browser loads media from the host serving the page.
 * Apex forwarding often only 301s `/` and 404s `/api/media/file/…`.
 *
 * Local paths (e.g. `/api/media/file/image.webp`) stay relative so
 * Next.js image optimization does not fetch through `remotePatterns`.
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const next = toSiteRelative(url)
  if (!cacheTag) return next

  // Payload already appends `?prefix=…` for S3-backed uploads, so a second `?`
  // would fold the cache tag into the prefix value and the file request 403s.
  const separator = next.includes('?') ? '&' : '?'
  return `${next}${separator}v=${encodeURIComponent(cacheTag)}`
}

function toSiteRelative(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) return url

  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')
    if (host === 'orianainverters.com' || host.endsWith('.cloudfront.net')) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`
    }
  } catch {
    return url
  }

  return url
}
