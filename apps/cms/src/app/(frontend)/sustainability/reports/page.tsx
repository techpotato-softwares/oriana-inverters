import Link from 'next/link'
import { Download, Mail } from 'lucide-react'

import { FadeIn } from '@/components/oriana/FadeIn'
import { SustainabilityHero } from '@/components/oriana/sustainability/SustainabilityHero'
import {
  defaultHero,
  defaultPolicies,
  defaultReportPlaceholders,
  defaultReportsHero,
  type ReportCard,
} from '@/components/oriana/sustainability/sustainabilityData'
import { getSustainability, getSustainabilityReports } from '@/utilities/getMarketing'
import type { Media, SustainabilityReport } from '@/payload-types'

function mediaUrl(v: unknown): string | null {
  return v && typeof v === 'object' && 'url' in v && (v as Media).url ? (v as Media).url! : null
}

export const metadata = {
  title: 'Reports & Policies',
  description: 'Oriana sustainability reports, environmental policies, and compliance documents.',
}

function DocList({
  heading,
  items,
  emptyHint,
}: {
  heading: string
  items: ReportCard[]
  emptyHint?: string
}) {
  return (
    <div>
      <FadeIn>
        <h2 className="fluid-heading font-display font-semibold text-oriana-navy">{heading}</h2>
      </FadeIn>
      {items.length === 0 ? (
        <p className="mt-6 text-sm text-oriana-muted">{emptyHint}</p>
      ) : (
        <ul className="mt-8 divide-y divide-oriana-navy/8 overflow-hidden rounded-2xl border border-oriana-navy/8 bg-white">
          {items.map((doc) => {
            const isExternal = doc.href.startsWith('http')
            const isContact = doc.href.includes('/contact')
            return (
              <li key={doc.title}>
                <Link
                  href={doc.href}
                  className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-oriana-silver/40 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-oriana-blue"
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-oriana-blue">
                      {doc.tag || 'Sustainability'}
                    </p>
                    <p className="mt-1 font-medium text-oriana-navy">{doc.title}</p>
                    <p className="mt-0.5 text-xs text-oriana-muted">{doc.year}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-oriana-blue">
                    {isContact ? (
                      <>
                        <Mail className="h-4 w-4" aria-hidden />
                        Request
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" aria-hidden />
                        Download
                      </>
                    )}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default async function SustainabilityReportsPage() {
  const [docs, sustainability] = await Promise.all([
    getSustainabilityReports() as Promise<SustainabilityReport[]>,
    getSustainability(),
  ])

  const reports: ReportCard[] =
    docs.length > 0
      ? docs.map((doc) => ({
          title: doc.title,
          year: doc.year,
          href: mediaUrl(doc.file) || doc.externalUrl || '/resources/downloads',
          tag: 'Enterprise',
        }))
      : defaultReportPlaceholders

  return (
    <main>
      <SustainabilityHero
        eyebrow={defaultReportsHero.eyebrow}
        title={defaultReportsHero.title}
        description={defaultReportsHero.description}
        videoSrc={mediaUrl(sustainability?.heroVideo) || defaultHero.videoSrc}
        posterSrc={
          mediaUrl(sustainability?.image) ||
          mediaUrl(sustainability?.hero?.image) ||
          defaultHero.posterSrc
        }
        cta={{ label: 'Contact ESG team', href: '/contact' }}
      />

      <section className="bg-white section-safe-y">
        <div className="container space-y-16">
          <DocList
            heading="Sustainability reports"
            items={reports}
            emptyHint="Published ESG reports will appear here."
          />
          <DocList
            heading="Policies & guidelines"
            items={defaultPolicies}
            emptyHint="Policy documents will appear here once published."
          />

          <FadeIn>
            <p className="max-w-2xl text-sm leading-relaxed text-oriana-muted">
              Need a specific disclosure or previous-year PDF?{' '}
              <Link href="/contact" className="font-semibold text-oriana-blue hover:underline">
                Email our ESG team
              </Link>{' '}
              and we will share the latest available documents.
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
