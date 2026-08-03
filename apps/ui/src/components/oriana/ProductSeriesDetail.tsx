'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { ProductImage } from '@/components/oriana/ProductImage'
import { cn } from '@/utilities/ui'
import type { CatalogueProduct, CatalogueSeries } from '@/types/catalogue'

type Props = {
  series: CatalogueSeries
  initialModelSlug?: string | null
}

export function ProductSeriesDetail({ series, initialModelSlug }: Props) {
  const router = useRouter()

  const resolveSlug = (preferred?: string | null) =>
    series.variants.find((v) => v.slug === preferred)?.slug ?? series.variants[0]?.slug ?? ''

  const [selectedSlug, setSelectedSlug] = useState(() => resolveSlug(initialModelSlug))

  useEffect(() => {
    const modelFromUrl =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('model')
        : null
    setSelectedSlug(resolveSlug(modelFromUrl || initialModelSlug))
    // eslint-disable-next-line react-hooks/exhaustive-deps -- resolve against latest series variants
  }, [initialModelSlug, series.slug])

  const selected: CatalogueProduct | undefined =
    series.variants.find((v) => v.slug === selectedSlug) ?? series.variants[0]

  if (!selected) return null

  const modelCode =
    selected.specs.find((s) => s.label === 'Model')?.value ?? selected.name

  const selectVariant = (slug: string) => {
    setSelectedSlug(slug)
    const url = `/products/${series.slug}?model=${encodeURIComponent(slug)}`
    router.replace(url, { scroll: false })
  }

  return (
    <section className="py-12 lg:py-16">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="sticky top-28 overflow-hidden rounded-2xl border border-oriana-navy/10 bg-gradient-to-br from-oriana-silver/80 via-white to-white p-6 shadow-sm">
              <ProductImage
                name={series.series}
                categorySlug={series.categorySlug}
                src={selected.heroImageUrl ?? series.heroImageUrl}
                alt={selected.heroImageAlt ?? series.heroImageAlt}
                className="rounded-xl"
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-oriana-blue">
              {series.category}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-oriana-navy md:text-4xl">
              {series.series}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-oriana-muted">
              {series.description}
            </p>

            <div className="mt-8">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-oriana-navy">Select capacity</p>
                  <p className="mt-1 text-xs text-oriana-muted">
                    {series.variants.length}{' '}
                    {series.variants.length === 1 ? 'variant' : 'variants'} in this series
                  </p>
                </div>
                <p className="font-mono text-sm text-oriana-navy/70">{modelCode}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {series.variants.map((variant) => {
                  const active = variant.slug === selected.slug
                  return (
                    <button
                      key={variant.slug}
                      type="button"
                      onClick={() => selectVariant(variant.slug)}
                      className={cn(
                        'min-w-[4.5rem] rounded-lg border px-4 py-2.5 text-sm font-semibold transition',
                        active
                          ? 'border-oriana-blue bg-oriana-blue text-white shadow-sm'
                          : 'border-oriana-navy/15 bg-white text-oriana-navy hover:border-oriana-blue/40',
                      )}
                      aria-pressed={active}
                    >
                      {variant.powerRange}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-oriana-navy/10 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-oriana-navy/8 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-oriana-muted">
                    Selected model
                  </p>
                  <h2 className="mt-1 font-display text-xl font-bold text-oriana-navy">
                    {selected.name}
                  </h2>
                </div>
                <p className="text-sm text-oriana-muted">{selected.phases}</p>
              </div>

              <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-oriana-navy">
                Key specifications
              </h3>
              <table className="mt-3 w-full border-collapse text-sm">
                <tbody>
                  {selected.specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-oriana-navy/8">
                      <td className="py-3 pr-4 font-medium text-oriana-navy">{spec.label}</td>
                      <td className="py-3 text-right text-oriana-muted sm:text-left">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b border-oriana-navy/8">
                    <td className="py-3 pr-4 font-medium text-oriana-navy">Max Efficiency</td>
                    <td className="py-3 text-right text-oriana-muted sm:text-left">
                      {selected.efficiency}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-oriana-navy">Warranty</td>
                    <td className="py-3 text-right text-oriana-muted sm:text-left">
                      {selected.warranty}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-oriana-navy/10 bg-oriana-silver/40 p-5">
                <h3 className="font-semibold text-oriana-navy">Downloads</h3>
                <ul className="mt-3 space-y-2.5">
                  {selected.datasheetUrl ? (
                    <li>
                      <a
                        href={selected.datasheetUrl}
                        className="flex items-center gap-2 text-sm text-oriana-blue hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="h-4 w-4" />
                        Datasheet (PDF)
                      </a>
                    </li>
                  ) : null}
                  {['Installation Manual', 'Certificates'].map((doc) => (
                    <li key={doc}>
                      <Link
                        href="/resources/downloads"
                        className="flex items-center gap-2 text-sm text-oriana-blue hover:underline"
                      >
                        <FileText className="h-4 w-4" />
                        {doc}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="flex flex-1 items-center justify-center rounded-xl bg-oriana-blue px-5 py-3.5 text-sm font-bold text-white transition hover:bg-oriana-navy"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/where-to-buy"
                  className="flex flex-1 items-center justify-center rounded-xl border border-oriana-navy/15 px-5 py-3.5 text-sm font-semibold text-oriana-navy transition hover:border-oriana-blue"
                >
                  Find a Distributor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
