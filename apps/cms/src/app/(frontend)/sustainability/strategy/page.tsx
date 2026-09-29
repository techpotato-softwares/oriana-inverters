import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'

import { ComingSoon } from '@/components/oriana/ComingSoon'
import { FadeIn } from '@/components/oriana/FadeIn'
import { SustainabilitySubNav } from '@/components/oriana/sustainability/SustainabilitySubNav'
import { getSustainability } from '@/utilities/getMarketing'

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
    data?.strategySections?.map((s) => ({
      heading: s.heading,
      paragraphs: s.body
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean),
    })) ?? []

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
      <section className="relative overflow-hidden bg-oriana-deep pt-28 lg:pt-36">
        <div className="absolute inset-0 bg-gradient-to-b from-oriana-deep via-[#0f2f6b] to-oriana-deep" />
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
