'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { ProductImage } from '@/components/oriana/ProductImage'
import {
  formatProductPowerLabel,
  productCardTypeLabel,
} from '@/components/oriana/ProductSeriesCard'
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

function seriesHeadline(categorySlug: string): string {
  if (categorySlug === 'hybrid-inverters') return 'Hybrid Inverter for PV and Storage'
  if (categorySlug === 'utility-scale-inverters') return 'Utility Grid-Tied PV Inverter'
  if (categorySlug === 'bess') return 'Residential Energy Storage System'
  return 'String Inverter for Grid-Tied PV'
}

function featureGroups(series: CatalogueSeries, selected: CatalogueProduct) {
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

function specTiles(series: CatalogueSeries, selected: CatalogueProduct) {
  const tiles: { value: string; label: string }[] = []
  const power = formatProductPowerLabel(selected.powerRange || series.powerRange)
  if (power) {
    tiles.push({
      value: power,
      label: series.categorySlug === 'bess' ? 'Storage Capacity' : 'Rated AC Output Power',
    })
  }
  if (selected.phases && selected.phases !== '—') {
    tiles.push({ value: selected.phases, label: 'Phases' })
  }
  if (selected.efficiency && selected.efficiency !== '—') {
    tiles.push({ value: selected.efficiency, label: 'Max. Efficiency' })
  }
  if (selected.warranty && selected.warranty !== '—') {
    tiles.push({ value: selected.warranty, label: 'Warranty' })
  }
  const extra = selected.specs.find(
    (spec) =>
      spec.value &&
      spec.value !== '—' &&
      !['Model', 'Model Series', 'Capacity', 'Series'].includes(spec.label),
  )
  if (extra && tiles.length < 4) {
    tiles.push({ value: extra.value, label: extra.label })
  }
  if (tiles.length < 4 && series.variants.length > 1) {
    tiles.push({
      value: String(series.variants.length),
      label: series.categorySlug === 'bess' ? 'Capacity Options' : 'Power Variants',
    })
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
  const headline = seriesHeadline(series.categorySlug)
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
      title: 'Installation Guide',
      detail: `${series.series} Quick Installation Guide`,
      href: '/resources/downloads',
      external: false,
    },
  ]

  return (
    <>
      <section className="bg-white">
        <div className="container grid items-center gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-14">
          <div className="overflow-hidden rounded-3xl bg-oriana-surface px-6 py-8 md:px-10 md:py-12">
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

          <div>
            <p className="text-sm font-medium text-oriana-blue">{typeLabel}</p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-oriana-navy md:text-4xl lg:text-5xl">
              {headline}
            </h1>
            <p className="mt-4 font-display text-lg font-medium leading-snug text-oriana-navy md:text-2xl">
              {series.series}
            </p>
            {series.description ? (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-oriana-muted md:text-base">
                {series.description}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-oriana-navy/10 bg-oriana-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-oriana-navy">
                {audience}
              </span>
              {selected.phases && selected.phases !== '—' ? (
                <span className="rounded-full border border-oriana-navy/10 px-3 py-1 text-xs font-medium text-oriana-muted">
                  {selected.phases}
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
                            : 'border-oriana-navy/12 bg-white text-oriana-navy hover:border-oriana-blue/40',
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
        </div>
      </section>

      <div className="sticky top-16 z-20 border-b border-oriana-navy/10 bg-white/95 backdrop-blur-md lg:top-20">
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
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {features.map((group) => (
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

            <div className="mx-auto mt-14 max-w-lg">
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
                {series.series}
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
