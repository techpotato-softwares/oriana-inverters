import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { LinkItem } from './types'

/** Grid of link tiles with a round arrow badge that fills on hover. */
export function LinkTiles({ links, className = 'mt-16' }: { links: LinkItem[]; className?: string }) {
  if (links.length === 0) return null
  return (
    <ul className={`${className} grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
      {links.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          <Link
            href={link.href}
            className="group relative flex min-h-[4.75rem] items-center justify-between gap-4 overflow-hidden rounded-2xl border border-oriana-navy/10 bg-white py-4 pl-6 pr-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-oriana-blue/40 hover:shadow-[0_18px_40px_-24px_rgba(19,71,163,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oriana-blue motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <span className="font-display text-base font-semibold text-oriana-navy transition-colors duration-300 group-hover:text-oriana-blue">
              {link.label}
            </span>
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-oriana-surface text-oriana-blue transition-colors duration-300 group-hover:bg-oriana-blue group-hover:text-white motion-reduce:transition-none"
            >
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </span>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-oriana-blue to-oriana-sky transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
            />
          </Link>
        </li>
      ))}
    </ul>
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
