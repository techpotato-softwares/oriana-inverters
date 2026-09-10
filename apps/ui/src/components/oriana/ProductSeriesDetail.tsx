'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Activity, BarChart3, CircleChevronRight, Shield, Waves } from 'lucide-react'
import { ProductImage } from './ProductImage'
import {
  formatProductPowerLabel,
  productCardTypeLabel,
  ProductSeriesCard,
} from '@/components/oriana/ProductSeriesCard'
import {
  type OnGridFeatureIcon,
  type OnGridFeatureListItem,
} from '@/data/onGridProductPage'
import { resolveProductPageData } from '@/utilities/mapProductPage'
import {
  isFileDocument,
  resolveDatasheetUrl,
  type AllProductsCard,
} from '@/utilities/allProductsCatalogue'
import { cn } from '@/utilities/ui'
import type { CatalogueProduct, CatalogueSeries } from '@/types/catalogue'

type Props = {
  series: CatalogueSeries
  related?: AllProductsCard[]
  relatedHref?: string
  initialModelSlug?: string | null
  formId?: number | null
}

type TabId = 'overview' | 'documents'

const AUDIENCE_LABEL: Record<CatalogueProduct['segmentKey'], string> = {
  residential: 'Homeowners',
  commercial: 'Business Owners',
  utility: 'Large Scale',
  storage: 'Homeowners',
}

function seriesTypeLabel(series: CatalogueSeries, selected: CatalogueProduct): string {
  const pageData = resolveProductPageData(series, selected)
  if (pageData?.heroType) return pageData.heroType

  const group = selected.phases || series.segment || series.phases || ''
  return productCardTypeLabel(group, series.categorySlug)
}

/** Product model name only — capacity lives in the spec tiles, not the title. */
function heroProductTitle(series: CatalogueSeries, selected: CatalogueProduct): string {
  return selected.modelSeries || series.series
}

function relatedSectionHeading(segmentKey: CatalogueProduct['segmentKey']): string {
  if (segmentKey === 'commercial') return 'Products for Business'
  if (segmentKey === 'utility') return 'Products for Utility'
  return 'Products for Home'
}

function featureGroups(series: CatalogueSeries, selected: CatalogueProduct) {
  const pageData = resolveProductPageData(series, selected)
  // Explicit page data wins — empty featureGroups means advantages are deferred.
  if (pageData) {
    return (pageData.featureGroups ?? []).map((group) => ({
      title: group.title,
      items: group.items,
    }))
  }

  const warranty =
    selected.warranty && selected.warranty !== '—'
      ? `${selected.warranty} product warranty`
      : 'Installer-backed aftercare and warranty support'
  const category = series.categorySlug

  if (
    category === 'hybrid-inverters' ||
    category === 'utility-scale-inverters' ||
    category === 'bess'
  ) {
    return []
  }

  return [
    {
      title: 'HIGH YIELD',
      items: [
        'High conversion efficiency across the operating range',
        'Designed for rooftop and commercial PV arrays',
        'Stable output in varying irradiance',
      ],
    },
    {
      title: 'SAFE AND RELIABLE',
      items: [
        'Grid-tied protection for continuous operation',
        'Built for residential, C&I, and outdoor sites',
        warranty,
      ],
    },
    {
      title: 'USER FRIENDLY SETUP',
      items: [
        'Compact form factor for faster installation',
        'Straightforward commissioning for certified installers',
        'Lightweight compared with legacy string platforms',
      ],
    },
    {
      title: 'SMART MANAGEMENT',
      items: [
        'Ready for plant monitoring and remote visibility',
        'Supports installer service and aftercare',
        'Clear operating status for site teams',
      ],
    },
  ]
}

function findSpec(product: CatalogueProduct, ...labels: string[]): string | null {
  for (const label of labels) {
    const hit = product.specs.find(
      (spec) => spec.label.toLowerCase() === label.toLowerCase() && spec.value && spec.value !== '—',
    )
    if (hit) return hit.value
  }
  return null
}

function specTiles(series: CatalogueSeries, selected: CatalogueProduct) {
  const pageData = resolveProductPageData(series, selected)
  if (pageData) {
    const labels = pageData.tileLabels
    return [
      {
        value: pageData.maxPvInputVoltage,
        label: labels?.maxPvInputVoltage ?? 'Max. PV Input Voltage',
      },
      {
        value: pageData.ratedAcOutputPower,
        label: labels?.ratedAcOutputPower ?? 'Rated AC Output Power',
      },
      {
        value: pageData.ratedAcVoltage,
        label: labels?.ratedAcVoltage ?? 'Rated AC Voltage',
      },
      {
        value: pageData.maxEfficiency,
        label: labels?.maxEfficiency ?? 'Max. Efficiency',
      },
    ]
  }

  const tiles: { value: string; label: string }[] = []
  const maxPv = findSpec(selected, 'Max. PV Input Voltage', 'Max PV Input Voltage')
  if (maxPv) tiles.push({ value: maxPv, label: 'Max. PV Input Voltage' })

  const power =
    findSpec(selected, 'Rated AC Output Power') ||
    formatProductPowerLabel(selected.powerRange || series.powerRange)
  if (power) {
    tiles.push({
      value: power,
      label: series.categorySlug === 'bess' ? 'Storage Capacity' : 'Rated AC Output Power',
    })
  }

  const voltage = findSpec(selected, 'Rated AC Voltage')
  if (voltage) tiles.push({ value: voltage, label: 'Rated AC Voltage' })

  const efficiency =
    findSpec(selected, 'Max. Efficiency') ||
    (selected.efficiency && selected.efficiency !== '—' ? selected.efficiency : null)
  if (efficiency) tiles.push({ value: efficiency, label: 'Max. Efficiency' })

  if (tiles.length < 4 && selected.phases && selected.phases !== '—') {
    tiles.push({ value: selected.phases, label: 'Phases' })
  }
  if (tiles.length < 4 && selected.warranty && selected.warranty !== '—') {
    tiles.push({ value: selected.warranty, label: 'Warranty' })
  }
  return tiles.slice(0, 4)
}

function ProductInquiryForm({
  seriesName,
  formId,
}: {
  seriesName: string
  formId?: number | null
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const firstName = String(fd.get('firstName') ?? '').trim()
    const lastName = String(fd.get('lastName') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const role = String(fd.get('role') ?? '').trim()
    const city = String(fd.get('city') ?? '').trim()
    const name = [firstName, lastName].filter(Boolean).join(' ')
    const message = [
      `Product enquiry: ${seriesName}`,
      role ? `Role: ${role}` : '',
      city ? `City: ${city}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const submissionData = [
      { field: 'name', value: name },
      { field: 'email', value: email },
      { field: 'company', value: role },
      { field: 'message', value: message },
    ].filter((row) => row.value)

    if (!formId) {
      setStatus('sent')
      return
    }

    setStatus('sending')
    setErrorMessage('')
    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: formId, submissionData }),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          errors?: { message?: string }[]
        } | null
        throw new Error(body?.errors?.[0]?.message || 'Unable to submit. Please try again.')
      }
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Unable to submit. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <p className="rounded-xl bg-white px-6 py-8 text-center text-sm text-oriana-navy">
        Thank you. Our team will be in touch about {seriesName}.
      </p>
    )
  }

  const fieldClass =
    'w-full rounded-md border border-oriana-navy/12 bg-white px-4 py-3 text-sm text-oriana-navy placeholder:text-oriana-muted/70 focus:border-oriana-blue focus:outline-none focus:ring-2 focus:ring-oriana-blue/15'

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="block text-sm text-oriana-navy">
        <span className="mb-2 block">Which best describes you?</span>
        <select name="role" required defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Select your Role
          </option>
          <option value="Homeowner">Homeowner</option>
          <option value="Installer">Installer</option>
          <option value="Distributor">Distributor</option>
          <option value="Business Owner">Business Owner</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <span className="hidden sm:block" />
      <label className="block text-sm text-oriana-navy">
        <span className="mb-2 block">First Name</span>
        <input name="firstName" required autoComplete="given-name" className={fieldClass} />
      </label>
      <label className="block text-sm text-oriana-navy">
        <span className="mb-2 block">Last Name</span>
        <input name="lastName" required autoComplete="family-name" className={fieldClass} />
      </label>
      <label className="block text-sm text-oriana-navy sm:col-span-2">
        <span className="mb-2 block">Email</span>
        <input name="email" type="email" required autoComplete="email" className={fieldClass} />
      </label>
      <label className="block text-sm text-oriana-navy sm:col-span-2">
        <span className="mb-2 block">City</span>
        <input name="city" autoComplete="address-level2" className={fieldClass} />
      </label>
      <label className="flex items-start gap-2 text-xs leading-relaxed text-oriana-muted sm:col-span-2">
        <input type="checkbox" required className="mt-0.5" />
        <span>
          I have read and agree to the Oriana{' '}
          <Link href="/terms" className="text-oriana-blue hover:underline">
            Terms of Use
          </Link>
          .
        </span>
      </label>
      {status === 'error' && errorMessage ? (
        <p className="text-sm text-red-600 sm:col-span-2">{errorMessage}</p>
      ) : null}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-md bg-oriana-blue px-10 py-3 text-sm font-semibold text-white transition hover:bg-oriana-deep disabled:opacity-60"
        >
          {status === 'sending' ? 'Submitting…' : 'Submit'}
        </button>
      </div>
    </form>
  )
}

function FeatureIconGlyph({ icon }: { icon: OnGridFeatureIcon }) {
  const box = 'flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-oriana-navy/80 text-oriana-navy'
  if (icon === 'export') {
    return (
      <span className={cn(box, 'font-display text-lg font-bold')} aria-hidden>
        F
      </span>
    )
  }
  if (icon === 'lv') {
    return (
      <span className={cn(box, 'font-display text-sm font-bold tracking-wide')} aria-hidden>
        LV
      </span>
    )
  }
  if (icon === 'pid') {
    return (
      <span className={cn(box, 'flex-col gap-0.5')} aria-hidden>
        <span className="grid grid-cols-3 gap-px">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 border border-oriana-navy/80" />
          ))}
        </span>
        <span className="text-[8px] font-bold leading-none">PID</span>
      </span>
    )
  }
  if (icon === 'spd') return <span className={box}><Shield className="h-5 w-5" strokeWidth={1.5} /></span>
  if (icon === 'wave') return <span className={box}><Waves className="h-5 w-5" strokeWidth={1.5} /></span>
  if (icon === 'monitor') return <span className={box}><Activity className="h-5 w-5" strokeWidth={1.5} /></span>
  return <span className={box}><BarChart3 className="h-5 w-5" strokeWidth={1.5} /></span>
}

function FeatureIconList({ items }: { items: OnGridFeatureListItem[] }) {
  return (
    <ul className="mx-auto flex max-w-2xl flex-col gap-5">
      {items.map((item) => (
        <li key={item.text} className="flex items-center gap-4">
          <FeatureIconGlyph icon={item.icon} />
          <span className="text-sm font-medium text-oriana-navy md:text-base">{item.text}</span>
        </li>
      ))}
    </ul>
  )
}

function FeatureQuadrant({
  groups,
}: {
  groups: { title: string; items: string[] }[]
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {groups.map((group) => (
        <article
          key={group.title}
          className="rounded-2xl bg-white px-8 py-9 shadow-[0_8px_28px_rgba(7,21,37,0.06)]"
        >
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-oriana-blue">
            {group.title}
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-oriana-navy/80">
            {group.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-oriana-navy/35" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

export function ProductSeriesDetail({
  series,
  related = [],
  relatedHref,
  initialModelSlug,
  formId,
}: Props) {
  const [tab, setTab] = useState<TabId>('overview')
  const [compactDownloads, setCompactDownloads] = useState(true)

  const resolveSlug = (preferred?: string | null) =>
    series.variants.find((variant) => variant.slug === preferred)?.slug ??
    series.variants[0]?.slug ??
    ''

  const [selectedSlug, setSelectedSlug] = useState(() => resolveSlug(initialModelSlug))

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const sync = () => setCompactDownloads(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const params =
      typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
    const modelFromUrl = params?.get('model')
    const tabFromUrl = params?.get('tab')
    setSelectedSlug(resolveSlug(modelFromUrl || initialModelSlug))
    if (tabFromUrl === 'documents') setTab('documents')
    // eslint-disable-next-line react-hooks/exhaustive-deps -- resolve against latest series variants
  }, [initialModelSlug, series.slug])

  const selected: CatalogueProduct | undefined =
    series.variants.find((variant) => variant.slug === selectedSlug) ?? series.variants[0]

  if (!selected) return null

  const audience = AUDIENCE_LABEL[selected.segmentKey] ?? AUDIENCE_LABEL[series.segmentKey]
  const pageData = resolveProductPageData(series, selected)
  const features = featureGroups(series, selected)
  const featureList = pageData?.featureLayout === 'list' ? pageData.featureList ?? [] : null
  const tiles = specTiles(series, selected)
  const datasheetUrl = resolveDatasheetUrl(
    series.categorySlug,
    selected.datasheetUrl ?? series.variants.find((item) => item.datasheetUrl)?.datasheetUrl,
  )
  const exploreHref = relatedHref ?? `/products/category/${series.categorySlug}`
  const relatedTitle = relatedSectionHeading(selected.segmentKey ?? series.segmentKey)
  const powerLabel =
    pageData?.ratedAcOutputPower ?? formatProductPowerLabel(series.powerRange)
  const productTitle = heroProductTitle(series, selected)
  const typeLabel = seriesTypeLabel(series, selected)

  const selectTab = (next: TabId) => {
    setTab(next)
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    if (next === 'documents') url.searchParams.set('tab', 'documents')
    else url.searchParams.delete('tab')
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
  }

  const downloads = [
    {
      title: 'Datasheet',
      detail: powerLabel ? `${powerLabel} datasheet` : 'Product datasheet',
      href: datasheetUrl,
      external: isFileDocument(datasheetUrl),
    },
    {
      title: 'User Manual',
      detail: powerLabel ? `${powerLabel} user manual` : 'User manual',
      href: '/resources/downloads',
      external: false,
    },
    {
      title: 'Quick Installation Guide',
      detail: powerLabel ? `${powerLabel} quick installation guide` : 'Quick installation guide',
      href: '/resources/downloads',
      external: false,
    },
    {
      title: 'Installation Video',
      detail: powerLabel ? `${powerLabel} installation video` : 'Installation video',
      href: '/resources/videos',
      external: false,
    },
  ]

  const tabBar = (
    <div
      id="product-tabs"
      className="sticky top-[var(--site-header-height,5rem)] z-20 border-b border-oriana-navy/10 bg-white/95 backdrop-blur-md"
    >
      <div className="container">
        <div role="tablist" aria-label="Product sections" className="flex justify-center gap-1">
          {(
            [
              { id: 'overview', label: 'Overview' },
              { id: 'documents', label: 'Documents & Installation' },
            ] as const
          ).map((item) => {
            const active = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`product-panel-${item.id}`}
                id={`product-tab-${item.id}`}
                onClick={() => selectTab(item.id)}
                className={cn(
                  'relative px-5 py-4 text-sm font-semibold transition md:px-8 md:text-base',
                  active ? 'text-oriana-blue' : 'text-oriana-muted hover:text-oriana-navy',
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute inset-x-4 bottom-0 h-1 rounded-full bg-oriana-blue transition-transform duration-200',
                    active ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  const productShot = (
    <ProductImage
      name={series.series}
      categorySlug={series.categorySlug}
      src={selected.heroImageUrl ?? series.heroImageUrl}
      alt={selected.heroImageAlt ?? series.heroImageAlt}
      className="mx-auto aspect-square w-full max-w-[min(100%,min(28rem,52svh))] bg-transparent"
      plain
      priority={tab === 'overview'}
    />
  )

  return (
    <>
      {tab === 'overview' ? (
        <section
          className="relative flex items-center overflow-hidden"
          style={{
            // One screen below site header + breadcrumb strip (cap on very tall displays)
            height:
              'min(1200px, calc(100svh - var(--site-header-height, 5rem) - var(--product-breadcrumb-height, 3.25rem)))',
            maxHeight:
              'min(1200px, calc(100svh - var(--site-header-height, 5rem) - var(--product-breadcrumb-height, 3.25rem)))',
            background:
              'linear-gradient(180deg, #d9dee6 0%, #e8ecf1 42%, #f4f6f8 78%, #ffffff 100%)',
          }}
        >
          <div className="container grid h-full max-h-full w-full items-center gap-6 py-[clamp(0.75rem,2.5svh,2rem)] lg:grid-cols-2 lg:gap-10 lg:py-[clamp(1rem,3svh,2.5rem)]">
            <div className="order-2 min-w-0 lg:order-1">
              {typeLabel ? (
                <p className="text-sm font-medium text-oriana-muted md:text-base">{typeLabel}</p>
              ) : null}
              <h1
                className={`font-display text-xl font-light tracking-tight text-[#606060] md:text-2xl lg:text-[clamp(1.25rem,2.2vw,1.65rem)] lg:leading-snug ${typeLabel ? 'mt-2' : ''}`}
              >
                {productTitle}
              </h1>
              <div className="mt-[clamp(1rem,2.5svh,2rem)] flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border border-oriana-navy/10 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-oriana-navy backdrop-blur">
                  {audience}
                </span>
              </div>
            </div>
            <div className="order-1 flex min-h-0 items-center justify-center lg:order-2">
              <div className="mx-auto flex h-full max-h-full w-full max-w-md items-center justify-center lg:max-w-none">
                {productShot}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Sticky tab bar only spans product content — related products sit outside so the bar unpins. */}
      <div>
        {tabBar}

        {tab === 'overview' ? (
          featureList?.length || features.length > 0 ? (
            <section
              id="product-panel-overview"
              role="tabpanel"
              aria-labelledby="product-tab-overview"
              className="bg-oriana-surface py-12 lg:py-16"
            >
              <div className="container">
                {featureList?.length ? (
                  <div className="rounded-2xl bg-white px-6 py-10 shadow-[0_8px_28px_rgba(7,21,37,0.06)] sm:px-10">
                    <FeatureIconList items={featureList} />
                  </div>
                ) : (
                  <FeatureQuadrant groups={features} />
                )}
              </div>
            </section>
          ) : (
            <div
              id="product-panel-overview"
              role="tabpanel"
              aria-labelledby="product-tab-overview"
              className="sr-only"
            />
          )
        ) : (
          <section
            id="product-panel-documents"
            role="tabpanel"
            aria-labelledby="product-tab-documents"
            className="bg-white"
          >
            <div
              className="relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, #d9dee6 0%, #e8ecf1 42%, #f4f6f8 78%, #ffffff 100%)',
              }}
            >
              <div className="container grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-16 lg:py-24">
                <div className="order-2 lg:order-1">
                  {typeLabel ? (
                    <p className="text-sm font-medium text-oriana-muted md:text-base">{typeLabel}</p>
                  ) : null}
                  <h1
                    className={`font-display text-xl font-light tracking-tight text-[#606060] md:text-2xl lg:text-[1.65rem] lg:leading-snug ${typeLabel ? 'mt-2' : ''}`}
                  >
                    {productTitle}
                  </h1>
                  {tiles.length > 0 ? (
                    <dl className="mt-10 grid sm:grid-cols-2">
                      {tiles.map((tile, index) => {
                        const isTopRow = index < 2
                        const isLeft = index % 2 === 0
                        return (
                          <div
                            key={tile.label}
                            className={cn(
                              'py-6',
                              isTopRow && tiles.length > 2 ? 'border-b border-oriana-navy/10' : null,
                              isLeft ? 'sm:pr-10' : 'sm:pl-10',
                            )}
                          >
                            <dt className="font-display text-3xl font-light tracking-tight text-[#606060] md:text-4xl">
                              {tile.value}
                            </dt>
                            <dd className="mt-2 text-sm text-oriana-muted">{tile.label}</dd>
                          </div>
                        )
                      })}
                    </dl>
                  ) : (
                    <p className="mt-6 max-w-md text-base leading-relaxed text-oriana-muted">
                      {series.category} documents, manuals, and installation guides.
                    </p>
                  )}
                </div>
                <div className="order-1 mx-auto w-full max-w-xl lg:order-2 lg:max-w-none">
                  <ProductImage
                    name={series.series}
                    categorySlug={series.categorySlug}
                    src={selected.heroImageUrl ?? series.heroImageUrl}
                    alt={selected.heroImageAlt ?? series.heroImageAlt}
                    className="aspect-[4/5] w-full bg-transparent sm:aspect-square"
                    plain
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="container scroll-mt-[calc(var(--site-header-height,5rem)+3.75rem)] py-14 pt-16 lg:py-20">
              <h2 className="text-center font-display text-2xl font-semibold text-oriana-navy md:text-3xl">
                Downloads
              </h2>
              <ul className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2">
                {downloads.map((doc) => {
                  const inner = compactDownloads ? (
                    <>
                      <span className="block text-center">
                        <span className="block font-display text-[17px] font-medium text-oriana-blue transition-colors group-hover:text-white">
                          {doc.title}
                        </span>
                        <span className="mt-2.5 block text-base leading-normal text-oriana-muted transition-colors group-hover:text-white/85">
                          {doc.detail}
                        </span>
                      </span>
                      <span className="mt-8 flex justify-center">
                        <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-oriana-navy/15 bg-white px-5 text-sm font-semibold text-oriana-navy transition-colors group-hover:border-white/40 group-hover:bg-white/15 group-hover:text-white">
                          View
                          <CircleChevronRight className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        <span className="block truncate font-display text-[17px] font-medium text-oriana-blue transition-colors group-hover:text-white">
                          {doc.title}
                        </span>
                        <span className="mt-2.5 block text-base leading-normal text-oriana-muted transition-colors group-hover:text-white/85">
                          {doc.detail}
                        </span>
                      </span>
                      <CircleChevronRight
                        className="mt-10 h-8 w-8 text-oriana-navy/55 transition-colors group-hover:text-white"
                        strokeWidth={1.6}
                        aria-hidden
                      />
                    </>
                  )
                  const cardClass = compactDownloads
                    ? 'group flex h-full min-h-[14.25rem] w-full flex-col justify-between rounded-[22px] bg-[#f1f3f7] px-6 py-7 transition-colors hover:bg-oriana-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oriana-blue/40'
                    : 'group flex h-full min-h-[14.25rem] flex-col justify-between rounded-[22px] bg-[#f1f3f7] px-10 py-9 transition-colors hover:bg-oriana-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oriana-blue/40'
                  return (
                    <li key={doc.title} className="w-full">
                      {doc.external ? (
                        <a
                          href={doc.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cardClass}
                        >
                          {inner}
                        </a>
                      ) : (
                        <Link href={doc.href} className={cardClass}>
                          {inner}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        )}
      </div>

      {tab === 'overview' && related.length > 0 ? (
        <section className="bg-white py-12 lg:py-16" aria-labelledby="related-products-heading">
          <div className="container">
            <h2
              id="related-products-heading"
              className="font-display text-2xl font-semibold text-oriana-navy md:text-3xl"
            >
              {relatedTitle}
            </h2>
            <div className="mt-8 grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {related.slice(0, 3).map((card) => (
                <ProductSeriesCard
                  key={card.slug}
                  href={`/products/${card.slug}`}
                  title={card.series}
                  name={card.series}
                  categorySlug={card.categorySlug}
                  imageSrc={card.heroImageUrl}
                  imageAlt={card.heroImageAlt}
                />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Link
                href={exploreHref}
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-oriana-blue px-8 py-2.5 text-sm font-semibold text-oriana-blue transition hover:bg-oriana-blue hover:text-white"
              >
                Explore more
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative z-0 border-t border-oriana-navy/10 bg-oriana-surface">
        <div className="container grid gap-10 py-12 lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-16">
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-oriana-navy md:text-3xl">
              Contact us
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-oriana-muted md:text-base">
              Ask about availability, design support, and supply through authorised Oriana
              distributors.
            </p>
          </div>
          <ProductInquiryForm seriesName={series.series} formId={formId} />
        </div>
      </section>
    </>
  )
}
