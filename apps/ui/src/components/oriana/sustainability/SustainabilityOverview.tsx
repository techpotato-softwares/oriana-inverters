'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Download, Mail } from 'lucide-react'

import { AnimatedCounter } from '@/components/oriana/AnimatedCounter'
import { FadeIn } from '@/components/oriana/FadeIn'
import { SustainabilitySubNav } from '@/components/oriana/sustainability/SustainabilitySubNav'
import {
  climateTargets,
  fallbackHonors,
  fallbackPolicies,
  fallbackReports,
  strategyPillars,
  type ReportCard,
} from '@/components/oriana/sustainability/sustainabilityData'
import { cn } from '@/utilities/ui'

export type SustainabilityNewsItem = {
  title: string
  href: string
  date?: string
}

export type SustainabilityHonor = {
  title: string
  image?: string | null
}

type SustainabilityOverviewProps = {
  heroTitle?: string
  heroImage?: string
  reports?: ReportCard[]
  policies?: ReportCard[]
  honors?: SustainabilityHonor[]
  news?: SustainabilityNewsItem[]
  contactEmail?: string
}

export function SustainabilityOverview({
  heroTitle = 'Green Mission. Better Life',
  heroImage = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
  reports = fallbackReports,
  policies = fallbackPolicies,
  honors = fallbackHonors,
  news = [],
  contactEmail = 'esg@orianainverters.com',
}: SustainabilityOverviewProps) {
  const [activePillar, setActivePillar] = useState(strategyPillars[0].id)
  const [reportTab, setReportTab] = useState<'reports' | 'policies'>('reports')

  const pillar = strategyPillars.find((p) => p.id === activePillar) ?? strategyPillars[0]
  const activeDocs = reportTab === 'reports' ? reports : policies

  return (
    <main>
      <section className="relative overflow-hidden bg-oriana-navy pt-28 lg:pt-48">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-oriana-navy/70 via-oriana-navy/55 to-oriana-navy/90" />
        <div className="container relative pb-12 lg:pb-16">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-sky">
              Sustainability
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
              {heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={0.08}>
            <SustainabilitySubNav className="mt-10" variant="dark" />
          </FadeIn>
        </div>
      </section>

      <section id="climate-targets" className="scroll-mt-24 bg-white py-16 lg:py-24">
        <div className="container">
          <FadeIn>
            <h2 className="font-display text-3xl font-semibold text-oriana-navy lg:text-4xl">
              Oriana Climate Targets
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-oriana-muted">
              Our roadmap aligns operational decarbonisation with supply-chain accountability,
              following internationally recognised carbon neutrality definitions.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {climateTargets.map((target, i) => (
              <FadeIn key={target.year} delay={i * 0.06}>
                <article
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-oriana-navy/8 bg-oriana-silver/30"
                  style={{ borderRadius: 16 }}
                >
                  <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 px-6 py-8 text-white">
                    <p className="font-display text-5xl font-light">{target.year}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/75">
                      {target.scope}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col px-6 py-6">
                    <p className="text-sm leading-relaxed text-oriana-navy">{target.title}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="strategy" className="scroll-mt-24 bg-oriana-silver/40 py-16 lg:py-24">
        <div className="container">
          <FadeIn>
            <h2 className="font-display text-3xl font-semibold text-oriana-navy lg:text-4xl">
              Sustainability Strategy
            </h2>
          </FadeIn>

          <div className="mt-8 flex flex-wrap gap-2 lg:gap-3">
            {strategyPillars.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePillar(item.id)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition',
                  activePillar === item.id
                    ? 'bg-oriana-blue text-white shadow-md'
                    : 'bg-white text-oriana-navy hover:bg-oriana-blue/10',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <FadeIn key={pillar.id}>
              <div
                className="relative min-h-[280px] overflow-hidden lg:min-h-[360px]"
                style={{ borderRadius: 16 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pillar.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-oriana-navy/25" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-oriana-navy/80 to-transparent p-6">
                  <p className="font-display text-2xl font-semibold text-white">{pillar.label}</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.05} key={`${pillar.id}-stats`}>
              <div
                className="flex h-full flex-col border border-oriana-navy/8 bg-white p-6 lg:p-8"
                style={{ borderRadius: 16 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-display text-xl font-semibold text-oriana-navy">
                    {pillar.label}
                  </p>
                  <Link
                    href="/sustainability/strategy"
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-oriana-blue hover:underline"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-8 grid flex-1 gap-6 sm:grid-cols-2">
                  {pillar.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-display text-2xl font-light text-oriana-blue lg:text-3xl">
                        <AnimatedCounter value={stat.value} />
                      </p>
                      <p className="mt-1.5 text-sm leading-snug text-oriana-muted">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/sustainability/strategy"
                  className="mt-8 text-sm font-semibold text-oriana-blue hover:underline"
                >
                  All strategies →
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="reports" className="scroll-mt-24 bg-white py-16 lg:py-24">
        <div className="container">
          <FadeIn>
            <h2 className="font-display text-3xl font-semibold text-oriana-navy lg:text-4xl">
              Latest Reports &amp; Policies
            </h2>
          </FadeIn>

          <div className="mt-8 flex gap-6 border-b border-oriana-navy/10">
            {(['reports', 'policies'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setReportTab(tab)}
                className={cn(
                  'relative pb-4 text-sm font-semibold capitalize transition',
                  reportTab === tab
                    ? 'text-oriana-blue after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-oriana-blue'
                    : 'text-oriana-muted hover:text-oriana-navy',
                )}
              >
                {tab === 'reports' ? 'Sustainability Report' : 'Sustainability Policy'}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activeDocs.slice(0, 3).map((doc, i) => (
              <FadeIn key={doc.title} delay={i * 0.05}>
                <Link
                  href={doc.href}
                  className="group flex h-full flex-col overflow-hidden border border-oriana-navy/8 bg-oriana-silver/20 transition hover:border-oriana-blue/30 hover:shadow-md"
                  style={{ borderRadius: 16 }}
                >
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-oriana-blue">
                      {doc.tag || 'Sustainability'}
                    </span>
                    <p className="mt-3 font-display text-lg font-semibold text-oriana-navy group-hover:text-oriana-blue">
                      {doc.title}
                    </p>
                    <p className="mt-2 text-sm text-oriana-muted">{doc.year}</p>
                  </div>
                  <div className="flex items-center gap-2 border-t border-oriana-navy/8 px-6 py-4 text-sm font-semibold text-oriana-blue">
                    <Download className="h-4 w-4" />
                    Download
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/sustainability/reports"
              className="inline-flex items-center gap-2 text-sm font-semibold text-oriana-blue hover:underline"
            >
              Explore more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="honors" className="scroll-mt-24 bg-oriana-silver/40 py-16 lg:py-24">
        <div className="container">
          <FadeIn>
            <h2 className="font-display text-3xl font-semibold text-oriana-navy lg:text-4xl">
              Honors and Awards
            </h2>
          </FadeIn>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {honors.slice(0, 4).map((honor, i) => (
              <FadeIn key={honor.title} delay={i * 0.05}>
                <article
                  className="overflow-hidden border border-oriana-navy/8 bg-white"
                  style={{ borderRadius: 16 }}
                >
                  <div className="relative aspect-[4/3] bg-oriana-silver">
                    {honor.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={honor.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-oriana-blue/20 to-emerald-600/20" />
                    )}
                  </div>
                  <p className="p-4 text-sm font-medium leading-snug text-oriana-navy">
                    {honor.title}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {news.length > 0 && (
        <section id="news" className="scroll-mt-24 bg-white py-16 lg:py-24">
          <div className="container">
            <FadeIn>
              <h2 className="font-display text-3xl font-semibold text-oriana-navy lg:text-4xl">
                Latest News
              </h2>
            </FadeIn>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {news.slice(0, 3).map((item, i) => (
                <FadeIn key={item.href} delay={i * 0.05}>
                  <Link
                    href={item.href}
                    className="group block h-full border border-oriana-navy/8 p-6 transition hover:border-oriana-blue/30 hover:shadow-md"
                    style={{ borderRadius: 16 }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-oriana-blue">
                      Sustainability
                    </p>
                    <p className="mt-3 font-display text-lg font-semibold leading-snug text-oriana-navy group-hover:text-oriana-blue">
                      {item.title}
                    </p>
                    {item.date ? (
                      <p className="mt-3 text-sm text-oriana-muted">{item.date}</p>
                    ) : null}
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="scroll-mt-24 bg-oriana-navy py-16 lg:py-24">
        <div className="container">
          <FadeIn>
            <div
              className="mx-auto max-w-3xl border border-white/15 bg-white/5 px-8 py-12 text-center backdrop-blur-sm lg:px-14 lg:py-16"
              style={{ borderRadius: 24 }}
            >
              <h2 className="font-display text-3xl font-semibold text-white lg:text-4xl">
                Contact Us
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70">
                Your insights drive our progress. Contact our ESG team to share feedback, ask
                questions, or explore partnerships for a greener tomorrow.
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-oriana-sky px-8 py-3.5 text-sm font-semibold text-oriana-navy transition hover:bg-white"
              >
                <Mail className="h-4 w-4" />
                Email ESG Team
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
