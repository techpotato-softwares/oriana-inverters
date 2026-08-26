'use client'

import React from 'react'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

const defaultNav = [
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions/residential' },
  { label: 'Resources', href: '/posts' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const items =
    data?.primaryNav?.map((item) => ({
      label: item?.label || '',
      href:
        item?.columns?.[0]?.href ||
        item?.columns?.[0]?.links?.[0]?.href ||
        '#',
    })).filter((item) => item.label) || []

  return (
    <nav className="flex items-center gap-6">
      {items.length > 0
        ? items.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))
        : defaultNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
      <Link
        href={data?.requestQuote?.href || '/contact'}
        className="hidden rounded-full bg-oriana-accent px-5 py-2 text-sm font-semibold text-oriana-navy transition hover:bg-white md:inline-flex"
      >
        {data?.requestQuote?.label || 'Get a Quote'}
      </Link>
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="h-5 w-5 text-white/80" />
      </Link>
    </nav>
  )
}
