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

async function hasValidPayloadToken(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('payload-token')?.value
  if (!token) return false

  const secret = process.env.PAYLOAD_SECRET
  if (!secret) {
    // Can't verify in this runtime; allow through and let Payload decide.
    return true
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret))
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
