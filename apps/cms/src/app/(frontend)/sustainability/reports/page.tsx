import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getSustainabilityReportsContent } from '@/utilities/getSiteContent'

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSustainabilityReportsContent()
  return {
    title: content.seo?.metaTitle,
    description: content.seo?.metaDescription,
  }
}

export default async function SustainabilityReportsPage() {
  const content = await getSustainabilityReportsContent()

  return (
    <main>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />
      <Breadcrumbs
        items={[{ label: 'Sustainability', href: '/sustainability' }, { label: 'Reports' }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container max-w-2xl">
          <ul className="divide-y divide-oriana-navy/8 border border-oriana-navy/8 bg-white">
            {content.reports.map((doc) => (
              <li key={doc.title}>
                <Link
                  href={doc.href}
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
