import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

/**
 * Unauthenticated (or expired-token) visits to /admin used to throw
 * NEXT_REDIRECT inside Payload's RSC tree. Under our AdminRootShell Suspense
 * workaround for Lambda, that digest surfaces as:
 *   "An error occurred in the Server Components render"
 *
 * Gate with a normal HTTP redirect. Also verify the JWT — a stale
 * `payload-token` cookie is truthy but invalid, and Payload still RSC-redirects.
 *
 * IMPORTANT: Payload does not sign with the raw PAYLOAD_SECRET. It uses
 * sha256(secret).digest('hex').slice(0, 32) — see payload/dist/index.js.
 * Verifying with the raw secret rejects every valid login cookie and causes
 * an immediate /admin → /admin/login redirect loop.
 */
const PUBLIC_ADMIN_ROUTES = [
  '/admin/login',
  '/admin/create-first-user',
  '/admin/forgot',
  '/admin/reset',
  '/admin/logout',
  '/admin/logout-inactivity',
  '/admin/unauthorized',
]

async function payloadJwtSecretKey(rawSecret: string): Promise<Uint8Array> {
  // Match Payload's Node crypto.createHash('sha256').update(secret).digest('hex').slice(0, 32)
  // using Web Crypto so this Edge middleware stays portable.
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rawSecret))
  const hex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32)
  return new TextEncoder().encode(hex)
}

async function hasValidPayloadToken(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('payload-token')?.value
  if (!token) return false

  const secret = process.env.PAYLOAD_SECRET
  if (!secret) {
    // Can't verify in this runtime; allow through and let Payload decide.
    return true
  }

  try {
    await jwtVerify(token, await payloadJwtSecretKey(secret))
    return true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const isPublic = PUBLIC_ADMIN_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )
  if (isPublic) {
    return NextResponse.next()
  }

  if (await hasValidPayloadToken(request)) {
    return NextResponse.next()
  }

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/admin/login'
  loginUrl.search = ''
  if (pathname !== '/admin' && pathname !== '/admin/') {
    loginUrl.searchParams.set('redirect', pathname)
  }

  const response = NextResponse.redirect(loginUrl)
  // Drop expired/invalid token so Payload doesn't keep RSC-redirecting.
  response.cookies.set({
    name: 'payload-token',
    value: '',
    path: '/',
    maxAge: 0,
  })
  return response
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
