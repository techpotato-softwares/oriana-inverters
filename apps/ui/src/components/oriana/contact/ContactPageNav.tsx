'use client'

import { HeroPageNav } from '@/components/oriana/HeroPageNav'

export const contactPages = [
  { label: 'Contact Oriana', href: '/contact' },
  { label: 'Sales Enquiry', href: '/contact/sales' },
  { label: 'Request a Quote', href: '/contact/quote' },
  { label: 'Become a Distributor', href: '/partners/become-a-distributor' },
  { label: 'Where to Buy', href: '/where-to-buy' },
] as const

export function ContactPageNav() {
  return <HeroPageNav items={contactPages} label="Contact" />
}
