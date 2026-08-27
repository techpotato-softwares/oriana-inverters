import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { FadeIn } from '@/components/oriana/FadeIn'
import { PageHero } from '@/components/oriana/PageHero'

export const metadata: Metadata = {
  title: 'Oriana Foundation',
  description:
    'The Oriana Foundation supports community solar access, STEM education, and environmental stewardship programmes.',
}

export default function OrianaFoundationPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Us"
        title="Oriana Foundation"
        description="Investing in communities and the next generation of clean energy leaders."
      />
      <Breadcrumbs
        items={[
          { label: 'About Us', href: '/about' },
          { label: 'Oriana Foundation' },
        ]}
      />

      <section className="py-12 lg:py-16">
        <div className="container max-w-3xl">
          <FadeIn>
            <p className="text-sm leading-relaxed text-oriana-muted">
              The Oriana Foundation partners with schools, nonprofits, and local governments to
              expand access to solar education, fund community microgrids, and support disaster
              relief through portable power systems.
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
