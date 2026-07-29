import Link from 'next/link'
import { ArrowUpRight, FileText } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { inverterMegaMenu } from '@/config/navigation'
import { getCatalogueDownloads } from '@/utilities/getCatalogue'

export const metadata = {
  title: 'Download Center',
  description: 'Datasheets, installation manuals, certificates, and software for Oriana solar inverters.',
}

const typeOrder = ['datasheet', 'manual', 'certificate', 'warranty', 'brochure', 'software']

const typeLabels: Record<string, string> = {
  datasheet: 'Datasheets',
  manual: 'Installation Manuals',
  certificate: 'Certificates & Compliance',
  warranty: 'Warranty Documents',
  brochure: 'Brochures',
  software: 'Software & Tools',
}

export default async function DownloadsPage() {
  const downloads = await getCatalogueDownloads()

  const grouped = typeOrder
    .map((type) => ({
      title: typeLabels[type] ?? type,
      items: downloads.filter((d) => d.documentType === type),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <main>
      <PageHero
        eyebrow="Resources"
        title="Download Center"
        description="Technical documentation, datasheets, installation guides, and compliance certificates for all Oriana products."
      />
      <Breadcrumbs items={[{ label: 'Resources', href: '/resources/downloads' }, { label: 'Downloads' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="mb-10 flex flex-wrap gap-3">
            {inverterMegaMenu.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="rounded border border-oriana-navy/10 px-4 py-2 text-sm font-medium text-oriana-navy hover:border-oriana-blue hover:text-oriana-blue"
              >
                {cat.title}
              </Link>
            ))}
          </div>

          {grouped.length === 0 ? (
            <p className="text-oriana-muted">
              Documents will appear here once uploaded in the{' '}
              <Link href="/admin" className="text-oriana-blue hover:underline">
                Payload admin
              </Link>
              . Run <code className="text-sm">npm run seed:catalogue</code> to load sample entries.
            </p>
          ) : (
            <div className="grid gap-10 lg:grid-cols-2">
              {grouped.map((cat) => (
                <div key={cat.title} className="rounded border border-oriana-navy/8 bg-white">
                  <h2 className="border-b border-oriana-navy/8 bg-oriana-silver/40 px-6 py-4 font-display text-lg font-bold text-oriana-navy">
                    {cat.title}
                  </h2>
                  <ul className="divide-y divide-oriana-navy/8">
                    {cat.items.map((item) => (
                      <li key={item.id}>
                        {item.fileUrl ? (
                          <a
                            href={item.fileUrl}
                            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-oriana-silver/30"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="flex items-start gap-3">
                              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-oriana-blue" />
                              <div>
                                <p className="text-sm font-medium text-oriana-navy">{item.title}</p>
                                {item.relatedProductName && (
                                  <p className="mt-0.5 text-xs text-oriana-muted">{item.relatedProductName}</p>
                                )}
                              </div>
                            </div>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-oriana-blue" />
                          </a>
                        ) : (
                          <span className="flex px-6 py-4 text-sm text-oriana-muted">{item.title}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <p className="mt-10 text-center text-sm text-oriana-muted">
            Can&apos;t find what you need?{' '}
            <Link href="/support" className="font-semibold text-oriana-blue hover:underline">
              Contact technical support
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
