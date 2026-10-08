import Link from 'next/link'

import { SectionSubNav, type SubNavSection } from '@/components/oriana/SectionSubNav'

export type SupportSection = SubNavSection

const defaultSections: SupportSection[] = [
  { label: 'Service brand', id: 'service-brand' },
  { label: 'Our strength', id: 'our-strengths' },
  { label: 'Our approach', id: 'our-approach' },
  { label: 'Global presence', id: 'global-presence' },
  { label: 'Service stories', id: 'service-stories' },
  { label: 'Resources', id: 'resources' },
]

export function SupportSubNav({
  sections = defaultSections,
}: {
  sections?: SupportSection[]
}) {
  return (
    <SectionSubNav
      sections={sections}
      label="Support page sections"
      pillId="support-subnav-pill"
      aside={
        <Link
          href="/contact"
          className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-oriana-blue transition-colors hover:text-oriana-sky focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue xl:inline-flex"
        >
          Contact support
          <span aria-hidden>›</span>
        </Link>
      }
    />
  )
}
