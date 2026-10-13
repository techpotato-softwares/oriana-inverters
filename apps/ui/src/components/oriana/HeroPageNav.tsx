'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utilities/ui'

export type HeroPageNavItem = { label: string; href: string }

/** Sibling-page links shown at the foot of a full-bleed section hero. */
export function HeroPageNav({
  items,
  label,
  className,
}: {
  items: readonly HeroPageNavItem[]
  label: string
  className?: string
}) {
  const pathname = usePathname()

  return (
    <nav aria-label={label} className={cn('border-b border-white/15', className)}>
      <ul className="-mx-4 flex gap-x-8 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const active = pathname === item.href
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative inline-flex min-h-11 items-center pb-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white',
                  active
                    ? 'text-white after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-oriana-sky'
                    : 'text-white/65 hover:text-white',
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
