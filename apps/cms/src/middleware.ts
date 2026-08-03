import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Unauthenticated visits to /admin (and collection routes) used to throw
 * NEXT_REDIRECT inside Payload's RSC tree. Under our AdminRootShell Suspense
 * workaround for Lambda, that digest often surfaces as:
 *   "An error occurred in the Server Components render"
 * Handle the auth gate with a normal HTTP redirect instead.
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

export function middleware(request: NextRequest) {
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

  const token = request.cookies.get('payload-token')
  if (token?.value) {
    return NextResponse.next()
  }

  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/admin/login'
  loginUrl.search = ''
  if (pathname !== '/admin' && pathname !== '/admin/') {
    loginUrl.searchParams.set('redirect', pathname)
  }

  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
