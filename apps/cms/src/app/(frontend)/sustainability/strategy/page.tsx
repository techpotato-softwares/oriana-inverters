import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'

import { ComingSoon } from '@/components/oriana/ComingSoon'
import { FadeIn } from '@/components/oriana/FadeIn'
import { SustainabilityHero } from '@/components/oriana/sustainability/SustainabilityHero'
import { defaultHero } from '@/components/oriana/sustainability/sustainabilityData'
import { getSustainability } from '@/utilities/getMarketing'
import { realStrategySections } from '@/utilities/placeholderContent'
import { visibleItems } from '@/utilities/visibility'
import type { Media } from '@/payload-types'

function mediaUrl(v: unknown): string | null {
  return v && typeof v === 'object' && 'url' in v && (v as Media).url ? (v as Media).url! : null
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSustainability()
  return {
    title: data?.strategyHero?.title || data?.seo?.metaTitle || 'Sustainability Strategy',
    description:
      data?.strategyHero?.description ||
      data?.seo?.metaDescription ||
      'Oriana Inverters environmental strategy and 2030 sustainability targets.',
  }
}

export default async function SustainabilityStrategyPage() {
  const data = await getSustainability()
  const strategyHero = data?.strategyHero
  const sections = visibleItems(realStrategySections(data?.strategySections)).map((section) => ({
    heading: section.heading || '',
    paragraphs: (section.body || '')
      .split(/\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
  }))

  if (sections.length === 0) {
    return (
      <main>
        <ComingSoon
          eyebrow="Sustainability"
          title={strategyHero?.title || 'Sustainability Strategy'}
          description={
            strategyHero?.description ||
            'Detailed strategy content will appear here once it is published in the CMS.'
          }
          breadcrumbs={[
            { label: 'Sustainability', href: '/sustainability' },
            { label: 'Strategy' },
          ]}
        />
      </main>
    )
  }

  return (
    <main>
      <SustainabilityHero
        eyebrow={strategyHero?.eyebrow || 'Sustainability'}
        title={strategyHero?.title || 'Sustainability Strategy'}
        description={strategyHero?.description || undefined}
        videoSrc={mediaUrl(data?.heroVideo) || defaultHero.videoSrc}
        posterSrc={mediaUrl(data?.image) || mediaUrl(data?.hero?.image) || defaultHero.posterSrc}
        cta={null}
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl space-y-12">
            {sections.map((section, i) => (
              <FadeIn key={section.heading} delay={i * 0.05}>
                <h2 className="font-display text-2xl font-semibold text-oriana-navy">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-oriana-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>

          <Link
            href="/sustainability"
            className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-oriana-blue hover:underline"
          >
            Back to overview
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
