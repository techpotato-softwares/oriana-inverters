'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Download } from 'lucide-react'

import { FadeIn } from '@/components/oriana/FadeIn'
import { SectionHeading } from '@/components/oriana/sustainability/SectionHeading'
import type { ReportCard } from '@/components/oriana/sustainability/sustainabilityData'
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

const tabs = [
  { id: 'reports', label: 'Sustainability Report' },
  { id: 'policies', label: 'Sustainability Policy' },
] as const

export function SustainabilityReports({
  reports,
  policies,
}: {
  reports: ReportCard[]
  policies: ReportCard[]
}) {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>(
    reports.length > 0 ? 'reports' : 'policies',
  )
  if (reports.length === 0 && policies.length === 0) return null
  const docs = tab === 'reports' ? reports : policies

  return (
    <section id="reports" className="scroll-mt-24 bg-oriana-surface py-20 lg:py-28">
      <div className="container">
        <FadeIn>
          <SectionHeading eyebrow="Transparency" title="Latest reports & policies" />
        </FadeIn>

        {reports.length > 0 && policies.length > 0 ? (
        <div
          role="tablist"
          aria-label="Document type"
          className="mt-10 flex gap-8 border-b border-oriana-deep/10"
        >
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={cn(
                'relative pb-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue',
                tab === item.id
                  ? 'text-oriana-blue after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-oriana-blue'
                  : 'text-oriana-muted hover:text-oriana-blue',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        ) : null}

        {docs.length === 0 ? (
          <p className="mt-8 text-sm text-oriana-muted">No documents in this category yet.</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {docs.slice(0, 3).map((doc, i) => (
              <FadeIn key={doc.title} delay={i * 0.05}>
                <Link
                  href={doc.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-oriana-deep/8 bg-white transition-shadow duration-300 hover:shadow-[0_24px_60px_-40px_rgba(7,21,37,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
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
                  <div className="flex items-center gap-2 border-t border-oriana-deep/8 px-6 py-4 text-sm font-semibold text-oriana-blue">
                    <Download className="h-4 w-4" aria-hidden />
                    Download
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}

        <Link
          href="/sustainability/reports"
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-oriana-blue hover:underline"
        >
          Explore more
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  )
}

export function SustainabilityHonors({ honors }: { honors: SustainabilityHonor[] }) {
  if (honors.length === 0) return null

  return (
    <section id="honors" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="container">
        <FadeIn>
          <SectionHeading eyebrow="Recognition" title="Honors and awards" />
        </FadeIn>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {honors.slice(0, 4).map((honor, i) => (
            <FadeIn key={honor.title} delay={i * 0.05}>
              <article className="overflow-hidden rounded-2xl border border-oriana-deep/8 bg-white">
                <div className="relative aspect-[4/3] bg-oriana-silver">
                  {honor.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={honor.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-oriana-blue/20 to-oriana-sky/20" />
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
  )
}

export function SustainabilityNews({ news }: { news: SustainabilityNewsItem[] }) {
  if (news.length === 0) return null

  return (
    <section id="news" className="scroll-mt-24 bg-oriana-surface py-20 lg:py-28">
      <div className="container">
        <FadeIn>
          <SectionHeading eyebrow="Updates" title="Latest news" />
        </FadeIn>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {news.slice(0, 3).map((item, i) => (
            <FadeIn key={item.href} delay={i * 0.05}>
              <Link
                href={item.href}
                className="group block h-full rounded-2xl border border-oriana-deep/8 bg-white p-6 transition-shadow duration-300 hover:shadow-[0_24px_60px_-40px_rgba(7,21,37,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-oriana-blue">
                  Sustainability
                </p>
                <p className="mt-3 font-display text-lg font-semibold leading-snug text-oriana-navy group-hover:text-oriana-blue">
                  {item.title}
                </p>
                {item.date ? <p className="mt-3 text-sm text-oriana-muted">{item.date}</p> : null}
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
