import Link from 'next/link'
import { ArrowUpRight, FileText } from 'lucide-react'

import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { FadeIn } from '@/components/oriana/FadeIn'
import { PageHero } from '@/components/oriana/PageHero'
import {
  ProductDownloadsByCategory,
  type ProductDownloadCategory,
} from '@/components/oriana/ProductDownloadsByCategory'
import { heroImages } from '@/components/oriana/heroImages'
import {
  getCatalogueCategories,
  getCatalogueDownloads,
  getCatalogueSeries,
} from '@/utilities/getCatalogue'

export const metadata = {
  title: 'Download Center',
  description: 'Datasheets, installation manuals, certificates, and software for Oriana solar inverters.',
}

function firstDocUrl(urls: Array<string | null | undefined>): string | null {
  for (const url of urls) {
    if (url?.trim()) return url.trim()
  }
  return null
}

export default async function DownloadsPage() {
  const [categories, seriesList, downloads] = await Promise.all([
    getCatalogueCategories(),
    getCatalogueSeries(),
    getCatalogueDownloads(),
  ])

  // Utility stays hidden on the download centre while product visibility is rolled out.
  const isUtilityCategory = (slug: string) =>
    slug === 'utility-scale-inverters' || /utility/i.test(slug)

  // All visible non-utility categories stay as tabs; rows only include series with a datasheet and/or manual.
  const productCategories: ProductDownloadCategory[] = categories
    .filter((category) => !isUtilityCategory(category.slug))
    .map((category) => {
      const products = seriesList
        .filter((series) => series.categorySlug === category.slug)
        .map((series) => {
          const datasheetUrl = firstDocUrl(series.variants.map((variant) => variant.datasheetUrl))
          const manualUrl = firstDocUrl(series.variants.map((variant) => variant.manualUrl))
          return {
            id: series.slug,
            name: series.series,
            href: `/products/${series.slug}`,
            powerRange: series.powerRange !== '—' ? series.powerRange : undefined,
            datasheetUrl,
            manualUrl,
          }
        })
        .filter((product) => Boolean(product.datasheetUrl || product.manualUrl))

      return {
        slug: category.slug,
        title: category.title,
        products,
      }
    })

  const certificates = downloads.filter(
    (item) => item.documentType === 'certificate' && !/utility/i.test(item.title),
  )

  return (
    <main>
      <PageHero
        image={heroImages.downloads}
        eyebrow="Resources"
        title="Download Center"
        description="Technical documentation, datasheets, installation guides, and compliance certificates for all Oriana products."
      />
      <Breadcrumbs items={[{ label: 'Resources', href: '/resources/downloads' }, { label: 'Downloads' }]} />

      {productCategories.length > 0 ? (
        <ProductDownloadsByCategory categories={productCategories} />
      ) : null}

      <section
        className={`pb-12 lg:pb-16 ${productCategories.length > 0 ? 'pt-0' : 'pt-12 lg:pt-16'}`}
        aria-labelledby="certificates-heading"
      >
        <div className="container">
          <FadeIn>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oriana-blue">
                Compliance
              </p>
              <h2
                id="certificates-heading"
                className="fluid-heading mt-3 font-display font-semibold text-oriana-navy"
              >
                Certificates &amp; Compliance
              </h2>
              <p className="mt-3 text-base leading-relaxed text-oriana-muted">
                Shared certification and compliance documents for Oriana products.
              </p>
            </div>
          </FadeIn>

          <div className="mt-8 overflow-hidden rounded-2xl border border-oriana-navy/10 bg-white">
            {certificates.length > 0 ? (
              <ul className="divide-y divide-oriana-navy/8">
                {certificates.map((item) => (
                  <li key={item.id}>
                    {item.fileUrl ? (
                      <a
                        href={item.fileUrl}
                        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-oriana-silver/30 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-oriana-blue"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="flex items-start gap-3">
                          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-oriana-blue" aria-hidden />
                          <div>
                            <p className="text-sm font-medium text-oriana-navy">{item.title}</p>
                            {item.relatedProductName ? (
                              <p className="mt-0.5 text-xs text-oriana-muted">
                                {item.relatedProductName}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-oriana-blue" aria-hidden />
                      </a>
                    ) : (
                      <span className="flex px-6 py-4 text-sm text-oriana-muted">{item.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-6 py-10 text-center text-sm text-oriana-muted">
                Not available — certificates will appear here when published.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container">
          <p className="text-center text-sm text-oriana-muted">
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
