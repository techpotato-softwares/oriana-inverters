'use client'

import { HeroPageNav } from '@/components/oriana/HeroPageNav'

export const aboutPages = [
  { label: 'Company Profile', href: '/about' },
  { label: 'Brand Story', href: '/about/brand-story' },
  { label: 'Vision & Mission', href: '/about/vision-mission' },
  { label: 'Achievements', href: '/about/achievements' },
  { label: 'Life at ORIANA', href: '/careers' },
] as const

/** Sibling links across the About section, shown at the foot of each About hero. */
export function AboutPageNav({ className }: { className?: string }) {
  return <HeroPageNav items={aboutPages} label="About ORIANA" className={className} />
}
