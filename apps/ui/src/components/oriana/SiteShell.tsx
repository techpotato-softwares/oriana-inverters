'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { isBeforeWebsiteLaunch } from '@/data/launchConfig'

/** Hides site chrome on the pre-launch homepage gate. */
export function SiteShell({
  header,
  footer,
  children,
}: {
  header: ReactNode
  footer: ReactNode
  children: ReactNode
}) {
  const pathname = usePathname()
  const bare = pathname === '/' && isBeforeWebsiteLaunch()

  return (
    <>
      {bare ? null : header}
      {children}
      {bare ? null : footer}
    </>
  )
}
