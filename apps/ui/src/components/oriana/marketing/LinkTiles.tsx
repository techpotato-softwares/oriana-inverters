import Link from 'next/link'

import type { LinkItem } from './types'

/** Grid of quiet link tiles with a trailing arrow. */
export function LinkTiles({ links, className = 'mt-16' }: { links: LinkItem[]; className?: string }) {
  if (links.length === 0) return null
  return (
    <div className={`${className} grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
      {links.map((link) => (
        <Link
          key={`${link.href}-${link.label}`}
          href={link.href}
          className="flex items-center justify-between rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-4 font-medium text-oriana-navy transition hover:border-oriana-blue hover:bg-white"
        >
          {link.label}
          <span className="text-oriana-blue" aria-hidden>
            →
          </span>
        </Link>
      ))}
    </div>
  )
}

/** Inline row of text links with arrows. */
export function InlineLinks({ links, className = 'mt-12' }: { links: LinkItem[]; className?: string }) {
  if (links.length === 0) return null
  return (
    <div className={`${className} flex flex-wrap gap-4`}>
      {links.map((link) => (
        <Link
          key={`${link.href}-${link.label}`}
          href={link.href}
          className="text-sm font-semibold text-oriana-blue hover:underline"
        >
          {link.label} →
        </Link>
      ))}
    </div>
  )
}
