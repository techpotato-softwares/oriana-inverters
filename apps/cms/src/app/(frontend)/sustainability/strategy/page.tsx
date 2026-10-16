import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'

import { FadeIn } from '@/components/oriana/FadeIn'
import { SustainabilityHero } from '@/components/oriana/sustainability/SustainabilityHero'
import {
  defaultHero,
  defaultStrategyHero,
  defaultStrategyPillars,
  defaultStrategySections,
  type StrategySection,
} from '@/components/oriana/sustainability/sustainabilityData'
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
    title: data?.strategyHero?.title || defaultStrategyHero.title,
    description:
      data?.strategyHero?.description ||
      data?.seo?.metaDescription ||
      defaultStrategyHero.description,
  }
}

export default async function SustainabilityStrategyPage() {
  const data = await getSustainability()
  const strategyHero = data?.strategyHero

  const cmsSections: StrategySection[] = visibleItems(
    realStrategySections(data?.strategySections),
  ).map((section) => ({
    heading: section.heading || '',
    paragraphs: (section.body || '')
      .split(/\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean),
  }))

  const sections = cmsSections.length > 0 ? cmsSections : defaultStrategySections

  return (
    <main>
      <SustainabilityHero
        eyebrow={strategyHero?.eyebrow || defaultStrategyHero.eyebrow}
        title={strategyHero?.title || defaultStrategyHero.title}
        description={strategyHero?.description || defaultStrategyHero.description}
        videoSrc={mediaUrl(data?.heroVideo) || defaultHero.videoSrc}
        posterSrc={mediaUrl(data?.image) || mediaUrl(data?.hero?.image) || defaultHero.posterSrc}
        cta={{ label: 'View reports & policies', href: '/sustainability/reports' }}
      />

      <section className="bg-oriana-surface section-safe-y">
        <div className="container">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oriana-blue">
              Focus areas
            </p>
            <h2 className="fluid-heading mt-3 max-w-2xl font-display font-semibold text-oriana-navy">
              How we organise the work
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-oriana-muted">
              Inspired by leading inverter makers’ ESG frameworks, adapted to Oriana’s manufacturing
              footprint and partner network in India.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {defaultStrategyPillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 0.05}>
                <article className="flex h-full flex-col rounded-2xl border border-oriana-navy/8 bg-white p-6 lg:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oriana-blue">
                    {pillar.title}
                  </p>
                  <h3 className="mt-3 font-display text-lg font-semibold text-oriana-navy">
                    {pillar.headline}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-oriana-muted">{pillar.body}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white section-safe-y">
        <div className="container">
          <div className="max-w-3xl space-y-12">
            {sections.map((section, i) => (
              <FadeIn key={section.heading} delay={i * 0.05}>
                <h2 className="fluid-heading font-display font-semibold text-oriana-navy">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-oriana-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-4">
            <Link
              href="/sustainability/reports"
              className="inline-flex items-center gap-2 rounded-full bg-oriana-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-oriana-deep"
            >
              Reports &amp; policies
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/sustainability"
              className="inline-flex items-center gap-2 rounded-full border border-oriana-navy/15 px-6 py-3 text-sm font-semibold text-oriana-navy transition hover:border-oriana-blue hover:text-oriana-blue"
            >
              Back to overview
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
