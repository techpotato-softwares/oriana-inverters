'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Download, FileText } from 'lucide-react'

import { FadeIn } from '@/components/oriana/FadeIn'
import { cn } from '@/utilities/ui'

export type ProductDownloadRow = {
  id: string
  name: string
  href: string
  powerRange?: string
  datasheetUrl?: string | null
  manualUrl?: string | null
}

export type ProductDownloadCategory = {
  slug: string
  title: string
  products: ProductDownloadRow[]
}

function Unavailable({ label }: { label: string }) {
  return (
    <span
      className="inline-flex min-h-10 min-w-10 items-center justify-center text-sm font-semibold uppercase tracking-wide text-oriana-muted"
      aria-label={`${label} not available`}
    >
      NA
    </span>
  )
}

function DocIconLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download
      aria-label={`Download ${label}`}
      title={`Download ${label}`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-oriana-blue/25 text-oriana-blue transition hover:border-oriana-blue hover:bg-oriana-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oriana-blue"
    >
      <Download className="h-4 w-4" aria-hidden />
    </a>
  )
}

/**
 * Horizontal category tabs → table of products that have a datasheet and/or manual.
 * Missing file cells show NA; empty categories show “No resource available”.
 */
export function ProductDownloadsByCategory({
  categories,
}: {
  categories: ProductDownloadCategory[]
}) {
  const tabs = useMemo(() => categories, [categories])
  const [activeSlug, setActiveSlug] = useState(tabs[0]?.slug ?? '')

  const active = tabs.find((category) => category.slug === activeSlug) ?? tabs[0]

  if (!tabs.length || !active) return null

  return (
    <section className="py-12 lg:py-16" aria-labelledby="product-docs-heading">
      <div className="container">
        <FadeIn>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-oriana-blue">
              Product documentation
            </p>
            <h2
              id="product-docs-heading"
              className="mt-3 font-display text-3xl font-semibold text-oriana-navy md:text-4xl"
            >
              Datasheets &amp; manuals
            </h2>
            <p className="mt-3 text-base leading-relaxed text-oriana-muted">
              Select a category to view products with downloadable datasheets and installation
              manuals.
            </p>
          </div>
        </FadeIn>

        <div
          role="tablist"
          aria-label="Product categories"
          className="mt-8 flex gap-1 overflow-x-auto border-b border-oriana-navy/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((category) => {
            const selected = category.slug === active.slug
            return (
              <button
                key={category.slug}
                type="button"
                role="tab"
                id={`download-tab-${category.slug}`}
                aria-selected={selected}
                aria-controls={`download-panel-${category.slug}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveSlug(category.slug)}
                className={cn(
                  'relative shrink-0 px-4 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oriana-blue sm:px-5',
                  selected ? 'text-oriana-blue' : 'text-oriana-muted hover:text-oriana-navy',
                )}
              >
                {category.title}
                {selected ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-oriana-blue"
                  />
                ) : null}
              </button>
            )
          })}
        </div>

        <div
          key={active.slug}
          role="tabpanel"
          id={`download-panel-${active.slug}`}
          aria-labelledby={`download-tab-${active.slug}`}
          className="mt-0"
        >
          {!active.products.length ? (
            <div className="mt-6 rounded-2xl border border-oriana-navy/10 bg-oriana-surface px-6 py-12 text-center">
              <FileText className="mx-auto h-8 w-8 text-oriana-navy/25" aria-hidden />
              <p className="mt-4 font-display text-base font-semibold text-oriana-navy">
                No resource available
              </p>
              <p className="mt-2 text-sm text-oriana-muted">
                No datasheets or manuals are published for this category yet.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-6 hidden overflow-hidden rounded-2xl border border-oriana-navy/10 bg-white md:block">
                <table className="w-full text-left">
                  <thead className="bg-oriana-surface">
                    <tr className="border-b border-oriana-navy/10 text-xs font-semibold uppercase tracking-[0.12em] text-oriana-muted">
                      <th scope="col" className="px-6 py-4">
                        Product name
                      </th>
                      <th scope="col" className="w-40 px-6 py-4 text-center">
                        Datasheet
                      </th>
                      <th scope="col" className="w-40 px-6 py-4 text-center">
                        Manual
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-oriana-navy/8">
                    {active.products.map((product) => (
                      <tr key={product.id} className="align-middle">
                        <td className="px-6 py-5">
                          <Link
                            href={product.href}
                            className="font-display text-base font-semibold text-oriana-navy transition hover:text-oriana-blue"
                          >
                            {product.name}
                          </Link>
                          {product.powerRange ? (
                            <p className="mt-1 text-sm text-oriana-muted">{product.powerRange}</p>
                          ) : null}
                        </td>
                        <td className="px-6 py-5 text-center">
                          {product.datasheetUrl ? (
                            <DocIconLink href={product.datasheetUrl} label="datasheet" />
                          ) : (
                            <Unavailable label="Datasheet" />
                          )}
                        </td>
                        <td className="px-6 py-5 text-center">
                          {product.manualUrl ? (
                            <DocIconLink href={product.manualUrl} label="manual" />
                          ) : (
                            <Unavailable label="Manual" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="mt-6 divide-y divide-oriana-navy/10 overflow-hidden rounded-2xl border border-oriana-navy/10 bg-white md:hidden">
                {active.products.map((product) => (
                  <li key={product.id} className="px-5 py-5">
                    <Link
                      href={product.href}
                      className="font-display text-base font-semibold text-oriana-navy"
                    >
                      {product.name}
                    </Link>
                    {product.powerRange ? (
                      <p className="mt-1 text-sm text-oriana-muted">{product.powerRange}</p>
                    ) : null}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-oriana-surface px-3 py-3 text-center">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-oriana-muted">
                          Datasheet
                        </p>
                        <div className="mt-2 flex justify-center">
                          {product.datasheetUrl ? (
                            <DocIconLink href={product.datasheetUrl} label="datasheet" />
                          ) : (
                            <Unavailable label="Datasheet" />
                          )}
                        </div>
                      </div>
                      <div className="rounded-xl bg-oriana-surface px-3 py-3 text-center">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-oriana-muted">
                          Manual
                        </p>
                        <div className="mt-2 flex justify-center">
                          {product.manualUrl ? (
                            <DocIconLink href={product.manualUrl} label="manual" />
                          ) : (
                            <Unavailable label="Manual" />
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
