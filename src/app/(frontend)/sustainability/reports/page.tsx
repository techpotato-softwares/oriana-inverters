import Link from 'next/link'
import { FileText } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'

export const metadata = {
  title: 'Reports & Policies',
  description: 'Oriana sustainability reports, environmental policies, and compliance documents.',
}

const reports = [
  { title: '2025 ESG & Sustainability Report', year: '2025', size: '4.8 MB' },
  { title: 'Environmental Policy', year: '2024', size: '620 KB' },
  { title: 'Supplier Code of Conduct', year: '2024', size: '480 KB' },
  { title: 'Conflict Minerals Statement', year: '2025', size: '310 KB' },
  { title: 'ISO 14001 Certificate', year: '2024', size: '520 KB' },
]

export default function SustainabilityReportsPage() {
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
                  href="/resources/downloads"
                  className="flex items-center justify-between gap-4 px-6 py-5 transition hover:bg-oriana-silver/40"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-5 w-5 shrink-0 text-oriana-blue" />
                    <div>
                      <p className="font-medium text-oriana-navy">{doc.title}</p>
                      <p className="mt-0.5 text-xs text-oriana-muted">
                        {doc.year} · PDF · {doc.size}
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
