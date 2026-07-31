import canUseDOM from './canUseDOM'

/** Ensures a value is a valid absolute URL (adds https:// when missing). */
export const normalizeServerURL = (url: string): string => {
  const trimmed = url.trim()
  if (!trimmed) return 'http://localhost:3000'
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed.replace(/\/$/, '')
  }
  return `https://${trimmed.replace(/\/$/, '')}`
}

export const getServerSideURL = () => {
  // Prefer runtime-only env vars. Next.js inlines process.env.NEXT_PUBLIC_* at
  // build time, so Docker builds bake localhost forever unless we read a
  // non-NEXT_PUBLIC name (or use bracket access) that Lambda can set after deploy.
  const runtimeUrl =
    process.env.PAYLOAD_SERVER_URL ||
    process.env.SERVER_URL ||
    process.env['NEXT_PUBLIC_SERVER_URL']

  if (runtimeUrl) {
    return normalizeServerURL(runtimeUrl)
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return normalizeServerURL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  }

  return 'http://localhost:3000'
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.PAYLOAD_SERVER_URL) {
    return normalizeServerURL(process.env.PAYLOAD_SERVER_URL)
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return normalizeServerURL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  }

  if (process.env['NEXT_PUBLIC_SERVER_URL']) {
    return normalizeServerURL(process.env['NEXT_PUBLIC_SERVER_URL'])
  }

  return ''
}
