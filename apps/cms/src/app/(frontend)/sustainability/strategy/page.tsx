import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'

import { FadeIn } from '@/components/oriana/FadeIn'
import { SustainabilitySubNav } from '@/components/oriana/sustainability/SustainabilitySubNav'
import { strategyPillars } from '@/components/oriana/sustainability/sustainabilityData'
import { getSustainability } from '@/utilities/getMarketing'

const fallbackSections = [
  {
    heading: '2030 Targets',
    paragraphs: [
      'Reduce Scope 1 and 2 greenhouse gas emissions by 50% versus 2020 baseline across all manufacturing facilities.',
      'Achieve 80% renewable electricity consumption at major production sites.',
      'Design 100% of new products for RoHS compliance and improved recyclability.',
    ],
  },
  {
    heading: 'Product Lifecycle',
    paragraphs: [
      'We conduct lifecycle assessments on flagship inverter platforms to identify opportunities to reduce embodied carbon in enclosures, semiconductors, and logistics.',
      'Extended warranty programmes and modular serviceability extend product life in the field, reducing e-waste.',
    ],
  },
  {
    heading: 'Supply Chain',
    paragraphs: [
      'Key suppliers are audited against our Supplier Code of Conduct covering labour practices, environmental management, and conflict minerals due diligence.',
    ],
  },
]

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
  const sections =
    data?.strategySections?.length
      ? data.strategySections.map((s) => ({
          heading: s.heading,
          paragraphs: s.body
            .split(/\n+/)
            .map((p) => p.trim())
            .filter(Boolean),
        }))
      : fallbackSections

  return (
    <main>
      <section className="relative overflow-hidden bg-oriana-navy pt-28 lg:pt-36">
        <div className="absolute inset-0 bg-gradient-to-b from-oriana-navy via-[#0f2f6b] to-oriana-navy" />
        <div className="container relative pb-12 lg:pb-16">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-sky">
              {strategyHero?.eyebrow || 'Sustainability'}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {strategyHero?.title || 'Sustainability Strategy'}
            </h1>
            {strategyHero?.description ? (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
                {strategyHero.description}
              </p>
            ) : null}
          </FadeIn>
          <FadeIn delay={0.08}>
            <SustainabilitySubNav className="mt-10" variant="dark" />
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {strategyPillars.map((pillar, i) => (
              <FadeIn key={pillar.id} delay={i * 0.04}>
                <div
                  className="border border-oriana-navy/8 bg-oriana-silver/30 p-5"
                  style={{ borderRadius: 16 }}
                >
                  <p className="font-display text-base font-semibold text-oriana-navy">
                    {pillar.label}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {pillar.stats.slice(0, 2).map((stat) => (
                      <li key={stat.label} className="text-sm text-oriana-muted">
                        <span className="font-semibold text-oriana-blue">{stat.value}</span>
                        <span className="block">{stat.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-16 max-w-3xl space-y-12">
            {sections.map((section, i) => (
              <FadeIn key={section.heading} delay={i * 0.05}>
                <h2 className="font-display text-2xl font-semibold text-oriana-navy">
                  {section.heading}
                </h2>
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
