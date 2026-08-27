'use client'

import Link from 'next/link'

import type { SimpleNavLink } from '@/config/navigation'

type NavSimplePanelProps = {
  label?: string
  links: SimpleNavLink[]
  ariaLabel?: string
}

export function NavSimplePanel({
  label = 'Menu',
  links,
  ariaLabel,
}: NavSimplePanelProps) {
  return (
    <div
      className="absolute left-0 right-0 top-full z-40 border-t border-white/60 shadow-[0_12px_40px_rgba(7,21,37,0.12)] backdrop-blur-2xl backdrop-saturate-150"
      style={{
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
      }}
      role="region"
      aria-label={ariaLabel ?? `${label} menu`}
    >
      <div className="container py-6 lg:py-8">
        <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-0">
          {links.map((link, index) => (
            <li key={link.href} className="flex items-center sm:shrink-0">
              {index > 0 ? (
                <span
                  className="mx-5 hidden h-4 w-px shrink-0 bg-oriana-navy/15 sm:block"
                  aria-hidden
                />
              ) : null}
              <Link
                href={link.href}
                className="block py-2 text-sm font-medium text-oriana-navy transition hover:text-oriana-blue sm:py-0"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
