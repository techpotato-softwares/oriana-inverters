import Link from 'next/link'
import { Download } from 'lucide-react'

import { FadeIn } from '@/components/oriana/FadeIn'
import { SustainabilitySubNav } from '@/components/oriana/sustainability/SustainabilitySubNav'
import {
  fallbackPolicies,
  fallbackReports,
} from '@/components/oriana/sustainability/sustainabilityData'
import { getSustainabilityReports } from '@/utilities/getMarketing'
import type { Media, SustainabilityReport } from '@/payload-types'

function mediaUrl(v: unknown): string | null {
  return v && typeof v === 'object' && 'url' in v && (v as Media).url ? (v as Media).url! : null
}

export const metadata = {
  title: 'Reports & Policies',
  description: 'Oriana sustainability reports, environmental policies, and compliance documents.',
}

export default async function SustainabilityReportsPage() {
  const docs = (await getSustainabilityReports()) as SustainabilityReport[]
  const reports =
    docs.length > 0
      ? docs.map((doc) => ({
          title: doc.title,
          year: doc.year,
          size: doc.size || '',
          href: mediaUrl(doc.file) || doc.externalUrl || '/resources/downloads',
          tag: 'Enterprise',
        }))
      : fallbackReports.map((r) => ({ ...r, size: 'PDF' }))

  const policies = fallbackPolicies.map((p) => ({ ...p, size: 'PDF' }))

  return (
    <main>
      <section className="relative overflow-hidden bg-oriana-navy pt-28 lg:pt-36">
        <div className="absolute inset-0 bg-gradient-to-b from-oriana-navy via-[#0f2f6b] to-oriana-navy" />
        <div className="container relative pb-12 lg:pb-16">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oriana-sky">
              Sustainability
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Reports &amp; Policies
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
              Download our latest environmental, social, and governance disclosures.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <SustainabilitySubNav className="mt-10" variant="dark" />
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container">
          <FadeIn>
            <h2 className="font-display text-2xl font-semibold text-oriana-navy">
              Sustainability Reports
            </h2>
          </FadeIn>
          <ul className="mt-8 divide-y divide-oriana-navy/8 border border-oriana-navy/8 bg-white">
            {reports.map((doc) => (
              <li key={doc.title}>
                <Link
                  href={doc.href}
                  className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-oriana-silver/40"
                  {...(doc.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-oriana-blue">
                      {doc.tag}
                    </p>
                    <p className="mt-1 font-medium text-oriana-navy">{doc.title}</p>
                    <p className="mt-0.5 text-xs text-oriana-muted">
                      {[doc.year, 'PDF', doc.size].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm text-oriana-blue">
                    <Download className="h-4 w-4" />
                    Download
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <FadeIn delay={0.05}>
            <h2 className="mt-16 font-display text-2xl font-semibold text-oriana-navy">
              Sustainability Policies
            </h2>
          </FadeIn>
          <ul className="mt-8 divide-y divide-oriana-navy/8 border border-oriana-navy/8 bg-white">
            {policies.map((doc) => (
              <li key={doc.title}>
                <Link
                  href={doc.href}
                  className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-oriana-silver/40"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-oriana-blue">
                      {doc.tag}
                    </p>
                    <p className="mt-1 font-medium text-oriana-navy">{doc.title}</p>
                    <p className="mt-0.5 text-xs text-oriana-muted">
                      {[doc.year, 'PDF', doc.size].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm text-oriana-blue">
                    <Download className="h-4 w-4" />
                    Download
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
