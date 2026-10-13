'use client'

import { HeroPageNav } from '@/components/oriana/HeroPageNav'

export const partnersPages = [
  { label: 'Overview', href: '/partners' },
  { label: 'Distributors', href: '/partners/distributors' },
  { label: 'Become a Distributor', href: '/partners/become-a-distributor' },
  { label: 'Find a Distributor', href: '/where-to-buy' },
] as const

export function PartnersPageNav() {
  return <HeroPageNav items={partnersPages} label="Partners" />
}
