'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Activity,
  BarChart3,
  FileText,
  Hand,
  LineChart,
  Settings2,
  ShieldCheck,
} from 'lucide-react'
import { ProductImage } from './ProductImage'
import {
  formatProductPowerLabel,
  productCardTypeLabel,
} from '@/components/oriana/ProductSeriesCard'
import { getOnGridSeriesPageData } from '@/data/onGridProductPage'
import { seriesSegmentLabel } from '@/data/productMaster'
import { isFileDocument, resolveDatasheetUrl } from '@/utilities/allProductsCatalogue'
import { cn } from '@/utilities/ui'
import type { CatalogueProduct, CatalogueSeries } from '@/types/catalogue'

type Props = {
  series: CatalogueSeries
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

const FEATURE_ICONS = {
  Efficient: BarChart3,
  Intelligent: LineChart,
  Adaptive: Settings2,
  Reliable: ShieldCheck,
  'HIGH YIELD': Activity,
  'SAFE AND RELIABLE': Hand,
  'USER FRIENDLY SETUP': Settings2,
  'SMART MANAGEMENT': LineChart,
} as const

function seriesHeadline(series: CatalogueSeries, selected: CatalogueProduct): string {
  const pageData = getOnGridSeriesPageData(
    selected.modelSeries,
    series.series,
    series.slug,
    selected.slug,
  )
  if (pageData?.heroType) return pageData.heroType

  if (series.categorySlug === 'hybrid-inverters') {
    return selected.phases?.includes('Single')
      ? '1-Phase Hybrid Inverter'
      : '3-Phase Hybrid Inverter'
  }
  if (series.categorySlug === 'utility-scale-inverters') return 'Utility Grid-Tied PV Inverter'
  if (series.categorySlug === 'bess') return 'Residential Energy Storage System'
  if (selected.phases?.includes('Single')) return '1-Phase String Inverter'
  if (selected.phases?.includes('Three')) return '3-Phase String Inverter'
  return 'String Inverter for Grid-Tied PV'
}

function heroTitle(series: CatalogueSeries, selected: CatalogueProduct): string {
  const pageData = getOnGridSeriesPageData(
    selected.modelSeries,
    series.series,
    series.slug,
    selected.slug,
  )
  const modelName = selected.modelSeries || series.series
  const power = pageData?.ratedAcOutputPower ?? formatProductPowerLabel(series.powerRange)
  // Sungrow-style: "5~6kW SG5.0/6.0RS"
  if (power && modelName) return `${power.replace(/\s+/g, '')} ${modelName}`
  return modelName
}

function featureGroups(series: CatalogueSeries, selected: CatalogueProduct) {
  const pageData = getOnGridSeriesPageData(
    selected.modelSeries,
    series.series,
    series.slug,
    selected.slug,
  )
  if (pageData?.featureGroups?.length) {
    return pageData.featureGroups.map((group) => ({
      title: group.title,
      items: group.items,
    }))
  }

  const warranty =
    selected.warranty && selected.warranty !== '—'
      ? `${selected.warranty} product warranty`
      : 'Installer-backed aftercare and warranty support'
  const category = series.categorySlug

  if (category === 'hybrid-inverters') {
    return [
      {
        title: 'HIGH YIELD',
        items: [
          'Hybrid conversion for PV generation and battery storage',
          'Designed to raise self-consumption on residential and C&I sites',
          'Stable output across a wide operating window',
        ],
      },
      {
        title: 'SAFE AND RELIABLE',
        items: [
          'Grid-tied protection for everyday operation',
          'Built for continuous indoor or sheltered outdoor use',
          warranty,
        ],
      },
      {
        title: 'USER FRIENDLY SETUP',
        items: [
          'Compact installation for homes and commercial plant rooms',
          'Straightforward commissioning for certified installers',
          'Clear operating status at a glance',
        ],
      },
      {
        title: 'SMART MANAGEMENT',
        items: [
          'Ready for remote monitoring and plant visibility',
          'Supports time-of-use and backup energy strategies',
          'Fits Oriana installer service workflows',
        ],
      },
    ]
  }

  if (category === 'utility-scale-inverters') {
    return [
      {
        title: 'HIGH YIELD',
        items: [
          'High-capacity conversion for utility PV plants',
          'Engineered to sustain output across long operating hours',
          'Supports high-voltage array architectures',
        ],
      },
      {
        title: 'SAFE AND RELIABLE',
        items: [
          'Plant-grade grid protection and isolation',
          'Designed for continuous utility-site duty',
          warranty,
        ],
      },
      {
        title: 'USER FRIENDLY SETUP',
        items: [
          'Cabinet form factor for utility skids and e-houses',
          'Service access for commissioning teams',
          'Clear status indication for plant operators',
        ],
      },
      {
        title: 'SMART MANAGEMENT',
        items: [
          'Integrates with plant monitoring and SCADA workflows',
          'Supports fleet-level performance visibility',
          'Built for long-term O&M programmes',
        ],
      },
    ]
  }

  if (category === 'bess') {
    return [
      {
        title: 'HIGH YIELD',
        items: [
          'Home battery storage from 5 kWh to 16 kWh',
          'Stores surplus PV for evening and backup use',
          'Sized for typical residential loads',
        ],
      },
      {
        title: 'SAFE AND RELIABLE',
        items: [
          'Residential energy storage with layered protection',
          'Designed for daily charge and discharge cycles',
          warranty,
        ],
      },
      {
        title: 'USER FRIENDLY SETUP',
        items: [
          'Compact home installation with certified installers',
          'Pairs with Oriana hybrid and on-grid systems',
          'Quiet, indoor-friendly operation',
        ],
      },
      {
        title: 'SMART MANAGEMENT',
        items: [
          'Monitor stored energy and household use',
          'Supports self-consumption optimisation',
          'Ready for installer aftercare',
        ],
      },
    ]
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
  const pageData = getOnGridSeriesPageData(
    selected.modelSeries,
    series.series,
    series.slug,
    selected.slug,
  )
  if (pageData) {
    return [
      { value: pageData.maxPvInputVoltage, label: 'Max. PV Input Voltage' },
      { value: pageData.ratedAcOutputPower, label: 'Rated AC Output Power' },
      { value: pageData.ratedAcVoltage, label: 'Rated AC Voltage' },
      { value: pageData.maxEfficiency, label: 'Max. Efficiency' },
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
          className="rounded-md bg-oriana-blue px-10 py-3 text-sm font-semibold text-white transition hover:bg-oriana-navy disabled:opacity-60"
        >
          {status === 'sending' ? 'Submitting…' : 'Submit'}
        </button>
      </div>
    </form>
  )
}

function FeatureQuadrant({
  groups,
}: {
  groups: { title: string; items: string[] }[]
}) {
  const isCompact = groups.every((g) =>
    ['Efficient', 'Intelligent', 'Adaptive', 'Reliable'].includes(g.title),
  )

  if (isCompact) {
    return (
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[#f3f4f6]">
        <div className="pointer-events-none absolute inset-x-1/2 inset-y-8 w-px -translate-x-1/2 bg-oriana-navy/10" />
        <div className="pointer-events-none absolute inset-x-8 inset-y-1/2 h-px -translate-y-1/2 bg-oriana-navy/10" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-oriana-navy/25" />
        <div className="grid sm:grid-cols-2">
          {groups.map((group) => {
            const Icon = FEATURE_ICONS[group.title as keyof typeof FEATURE_ICONS] ?? BarChart3
            return (
              <div
                key={group.title}
                className="flex flex-col items-center px-8 py-10 text-center sm:px-10 sm:py-12"
              >
                <Icon className="h-10 w-10 text-oriana-navy" strokeWidth={1.5} aria-hidden />
                <h2 className="mt-5 text-lg font-semibold text-oriana-navy">{group.title}</h2>
                <ul className="mt-4 space-y-2 text-left text-sm leading-relaxed text-oriana-navy/75">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-oriana-navy/50" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {groups.map((group) => (
        <div key={group.title}>
          <h2 className="text-sm font-bold uppercase tracking-widest text-oriana-blue">
            {group.title}
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-oriana-navy/80">
            {group.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-oriana-blue" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function ProductSeriesDetail({ series, initialModelSlug, formId }: Props) {
  const router = useRouter()
  const [tab, setTab] = useState<TabId>('overview')

  const resolveSlug = (preferred?: string | null) =>
    series.variants.find((variant) => variant.slug === preferred)?.slug ??
    series.variants[0]?.slug ??
    ''

  const [selectedSlug, setSelectedSlug] = useState(() => resolveSlug(initialModelSlug))

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

  const typeLabel = productCardTypeLabel(
    seriesSegmentLabel(series, series.categorySlug),
    series.categorySlug,
  )
  const headline = seriesHeadline(series, selected)
  const title = heroTitle(series, selected)
  const audience = AUDIENCE_LABEL[selected.segmentKey] ?? AUDIENCE_LABEL[series.segmentKey]
  const features = featureGroups(series, selected)
  const tiles = specTiles(series, selected)
  const datasheetUrl = resolveDatasheetUrl(
    series.categorySlug,
    selected.datasheetUrl ?? series.variants.find((item) => item.datasheetUrl)?.datasheetUrl,
  )

  const selectVariant = (slug: string) => {
    setSelectedSlug(slug)
    const url = `/products/${series.slug}?model=${encodeURIComponent(slug)}`
    router.replace(url, { scroll: false })
  }

  const downloads = [
    {
      title: 'Datasheet',
      detail: `${series.series} Datasheet`,
      href: datasheetUrl,
      external: isFileDocument(datasheetUrl),
    },
    {
      title: 'User Manual',
      detail: `${series.series} User Manual`,
      href: '/resources/downloads',
      external: false,
    },
    {
      title: 'Quick Installation Guide',
      detail: `${series.series} Quick Installation Guide`,
      href: '/resources/downloads',
      external: false,
    },
    {
      title: 'Installation Video',
      detail: `${series.series} Installation Video`,
      href: '/resources/videos',
      external: false,
    },
  ]

  return (
    <>
      {/* Sungrow-style hero: copy left, product render right, soft studio gradient */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #d9dee6 0%, #e8ecf1 42%, #f4f6f8 78%, #ffffff 100%)',
        }}
      >
        <div className="container grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-medium text-oriana-muted md:text-base">{headline}</p>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-oriana-navy md:text-4xl lg:text-[2.5rem] lg:leading-tight">
              {title}
            </h1>
            {series.description ? (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-oriana-muted md:text-base">
                {series.description}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-oriana-navy/10 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-oriana-navy backdrop-blur">
                {audience}
              </span>
              {typeLabel ? (
                <span className="rounded-full border border-oriana-navy/10 bg-white/50 px-3 py-1.5 text-xs font-medium text-oriana-muted">
                  {typeLabel}
                </span>
              ) : null}
            </div>

            {series.variants.length > 1 ? (
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-oriana-muted">
                  Select capacity
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {series.variants.map((variant) => {
                    const active = variant.slug === selected.slug
                    return (
                      <button
                        key={variant.slug}
                        type="button"
                        onClick={() => selectVariant(variant.slug)}
                        className={cn(
                          'rounded-md border px-3.5 py-2 text-sm font-semibold transition',
                          active
                            ? 'border-oriana-blue bg-oriana-blue text-white'
                            : 'border-oriana-navy/12 bg-white/80 text-oriana-navy hover:border-oriana-blue/40',
                        )}
                        aria-pressed={active}
                      >
                        {variant.powerRange}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <div className="order-1 lg:order-2">
            <div className="mx-auto max-w-md lg:max-w-none">
              <ProductImage
                name={series.series}
                categorySlug={series.categorySlug}
                src={selected.heroImageUrl ?? series.heroImageUrl}
                alt={selected.heroImageAlt ?? series.heroImageAlt}
                className="aspect-square w-full bg-transparent"
                plain
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-[var(--site-header-height,5rem)] z-20 border-b border-oriana-navy/10 bg-white/95 backdrop-blur-md">
        <div className="container">
          <div role="tablist" aria-label="Product sections" className="flex gap-1">
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
                  onClick={() => setTab(item.id)}
                  className={cn(
                    'relative px-4 py-4 text-sm font-semibold transition md:px-6 md:text-base',
                    active ? 'text-oriana-navy' : 'text-oriana-muted hover:text-oriana-navy',
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute inset-x-3 bottom-0 h-1 rounded-full bg-oriana-blue transition-transform duration-200',
                      active ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {tab === 'overview' ? (
        <section className="bg-white py-12 lg:py-16" role="tabpanel">
          <div className="container">
            <FeatureQuadrant groups={features} />

            <div className="mx-auto mt-16 max-w-lg">
              <ProductImage
                name={series.series}
                categorySlug={series.categorySlug}
                src={selected.heroImageUrl ?? series.heroImageUrl}
                alt={selected.heroImageAlt ?? series.heroImageAlt}
                className="aspect-square w-full bg-transparent"
                plain
              />
            </div>

            <div className="mt-14">
              <h2 className="text-center font-display text-2xl font-semibold text-oriana-navy md:text-3xl">
                {title}
              </h2>
              <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {tiles.map((tile) => (
                  <div key={tile.label} className="text-center">
                    <dt className="font-display text-3xl font-semibold tracking-tight text-oriana-navy md:text-4xl">
                      {tile.value}
                    </dt>
                    <dd className="mt-2 text-sm text-oriana-muted">{tile.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white py-12 lg:py-16" role="tabpanel">
          <div className="container max-w-3xl">
            <h2 className="font-display text-2xl font-semibold text-oriana-navy">Downloads</h2>
            <ul className="mt-8 divide-y divide-oriana-navy/10 border-y border-oriana-navy/10">
              {downloads.map((doc) => {
                const inner = (
                  <>
                    <span className="inline-flex items-start gap-3">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-oriana-blue" />
                      <span>
                        <span className="block font-semibold">{doc.title}</span>
                        <span className="mt-1 block text-xs font-normal text-oriana-muted">
                          {doc.detail}
                        </span>
                      </span>
                    </span>
                    <span className="text-xs font-medium text-oriana-muted">
                      {doc.external ? 'PDF' : 'View'}
                    </span>
                  </>
                )
                return (
                  <li key={doc.title}>
                    {doc.external ? (
                      <a
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-4 py-5 text-sm text-oriana-navy transition hover:text-oriana-blue"
                      >
                        {inner}
                      </a>
                    ) : (
                      <Link
                        href={doc.href}
                        className="flex items-center justify-between gap-4 py-5 text-sm text-oriana-navy transition hover:text-oriana-blue"
                      >
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

      <section className="border-t border-oriana-navy/10 bg-oriana-surface">
        <div className="container grid gap-10 py-12 lg:grid-cols-2 lg:items-start lg:gap-16 lg:py-16">
          <div>
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-oriana-navy md:text-3xl">
              Contact us
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-oriana-muted md:text-base">
              Ask about {series.series} — availability, design support, and supply through
              authorised Oriana distributors.
            </p>
          </div>
          <ProductInquiryForm seriesName={series.series} formId={formId} />
        </div>
      </section>
    </>
  )
}
