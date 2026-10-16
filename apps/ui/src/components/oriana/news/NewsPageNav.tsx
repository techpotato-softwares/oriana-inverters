'use client'

import { HeroPageNav } from '@/components/oriana/HeroPageNav'

export const newsPages = [
  { label: 'Newsroom', href: '/news' },
  { label: 'Press Releases', href: '/news/press-releases' },
  { label: 'Events', href: '/news/events' },
] as const

export function NewsPageNav() {
  return <HeroPageNav items={newsPages} label="News & Media" />
}
