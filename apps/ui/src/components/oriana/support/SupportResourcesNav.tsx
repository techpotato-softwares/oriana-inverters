'use client'

import { HeroPageNav } from '@/components/oriana/HeroPageNav'

export const supportResourcePages = [
  { label: 'Service & Support', href: '/support' },
  { label: 'Warranty', href: '/support/warranty' },
  { label: 'Download Center', href: '/resources/downloads' },
  { label: 'FAQs', href: '/resources/faqs' },
  { label: 'Videos', href: '/resources/videos' },
] as const

export function SupportResourcesNav() {
  return <HeroPageNav items={supportResourcePages} label="Support resources" />
}
