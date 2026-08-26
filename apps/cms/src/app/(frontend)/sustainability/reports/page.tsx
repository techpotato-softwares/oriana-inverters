import Link from 'next/link'
import { FileText } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getSustainabilityReports } from '@/utilities/getMarketing'
import type { Media, SustainabilityReport } from '@/payload-types'

function mediaUrl(v: unknown): string | null {
  return v && typeof v === 'object' && 'url' in v && (v as Media).url ? (v as Media).url! : null
}

export const metadata = {
  title: 'Reports & Policies',
  description: 'Oriana sustainability reports, environmental policies, and compliance documents.',
}

const fallbackReports = [
  { title: '2025 ESG & Sustainability Report', year: '2025', size: '4.8 MB', href: '/resources/downloads' },
  { title: 'Environmental Policy', year: '2024', size: '620 KB', href: '/resources/downloads' },
  { title: 'Supplier Code of Conduct', year: '2024', size: '480 KB', href: '/resources/downloads' },
  { title: 'Conflict Minerals Statement', year: '2025', size: '310 KB', href: '/resources/downloads' },
  { title: 'ISO 14001 Certificate', year: '2024', size: '520 KB', href: '/resources/downloads' },
]

export default async function SustainabilityReportsPage() {
  const docs = (await getSustainabilityReports()) as SustainabilityReport[]
  const reports =
    docs.length > 0
      ? docs.map((doc) => ({
          title: doc.title,
          year: doc.year,
          size: doc.size || '',
          href: mediaUrl(doc.file) || doc.externalUrl || '/resources/downloads',
        }))
      : fallbackReports

  return (
    <main>
      <PageHero
        eyebrow="Sustainability"
        title="Reports & Policies"
        description="Download our latest environmental, social, and governance disclosures."
      />
      <Breadcrumbs
        items={[{ label: 'Sustainability', href: '/sustainability' }, { label: 'Reports' }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container max-w-2xl">
          <ul className="divide-y divide-oriana-navy/8 border border-oriana-navy/8 bg-white">
            {reports.map((doc) => (
              <li key={doc.title}>
                <Link
                  href={doc.href}
                  className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-oriana-silver/40"
                  {...(doc.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-5 w-5 shrink-0 text-oriana-blue" />
                    <div>
                      <p className="font-medium text-oriana-navy">{doc.title}</p>
                      <p className="mt-0.5 text-xs text-oriana-muted">
                        {[doc.year, 'PDF', doc.size].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-oriana-blue">Download</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
