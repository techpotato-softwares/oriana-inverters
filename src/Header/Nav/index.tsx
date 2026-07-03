'use client'

import React from 'react'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

const defaultNav = [
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions/residential' },
  { label: 'Resources', href: '/posts' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-6">
      {navItems.length > 0
        ? navItems.map(({ link }, i) => <CMSLink key={i} {...link} appearance="link" />)
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
        href="/contact"
        className="hidden rounded-full bg-oriana-accent px-5 py-2 text-sm font-semibold text-oriana-navy transition hover:bg-white md:inline-flex"
      >
        Get a Quote
      </Link>
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="h-5 w-5 text-white/80" />
      </Link>
    </nav>
  )
}
