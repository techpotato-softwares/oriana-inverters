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
  const url =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')

  return normalizeServerURL(url)
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return normalizeServerURL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  }

  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return normalizeServerURL(process.env.NEXT_PUBLIC_SERVER_URL)
  }

  return ''
}
