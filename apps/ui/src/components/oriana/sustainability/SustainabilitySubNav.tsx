'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'

export const sustainabilitySubNav = [
  { label: 'Overview', href: '/sustainability' },
  { label: 'Sustainability Strategy', href: '/sustainability/strategy' },
  { label: 'Reports and Policies', href: '/sustainability/reports' },
] as const

export function SustainabilitySubNav({
  className,
  variant = 'dark',
}: {
  className?: string
  variant?: 'dark' | 'light'
}) {
  const pathname = usePathname()
  const isDark = variant === 'dark'

  return (
    <nav
      className={cn(
        'flex flex-wrap gap-x-8 gap-y-2 border-b',
        isDark ? 'border-white/15' : 'border-oriana-navy/10',
        className,
      )}
      aria-label="Sustainability sections"
    >
      {sustainabilitySubNav.map((item) => {
        const active =
          item.href === '/sustainability'
            ? pathname === '/sustainability'
            : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'relative pb-4 text-sm font-medium transition-colors',
              active
                ? isDark
                  ? 'text-white after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-oriana-sky'
                  : 'text-oriana-blue after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-oriana-blue'
                : isDark
                  ? 'text-white/65 hover:text-white'
                  : 'text-oriana-muted hover:text-oriana-navy',
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
