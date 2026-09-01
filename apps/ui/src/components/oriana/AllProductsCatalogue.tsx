'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, SlidersHorizontal, X } from 'lucide-react'
import { ProductImage } from './ProductImage'
import { ProductSeriesSections } from './ProductSeriesSections'
import { cn } from '@/utilities/ui'
import type {
  AllProductsCard,
  AllProductsTab,
  CatalogueByCategory,
  ParsedPower,
} from '@/utilities/allProductsCatalogue'

const CUSTOMER_TYPE_LABELS: Record<AllProductsCard['segmentKey'], string> = {
  residential: 'Homeowners',
  commercial: 'Business Owners',
  utility: 'Large Scale',
  storage: 'Energy Storage',
}

const KW_BUCKETS = [
  { id: 'lt10', label: '< 10 kW', min: 0, max: 10 },
  { id: '10-30', label: '10 - 30 kW', min: 10, max: 30 },
  { id: '30-100', label: '30 - 100 kW', min: 30, max: 100 },
  { id: '100plus', label: '> 100 kW', min: 100, max: Infinity },
] as const

const KWH_BUCKETS = [
  { id: 'lt10kwh', label: '< 10 kWh', min: 0, max: 10 },
  { id: '10-50kwh', label: '10 - 50 kWh', min: 10, max: 50 },
  { id: '50pluskwh', label: '> 50 kWh', min: 50, max: Infinity },
] as const

type CapacityBucket = { id: string; label: string; min: number; max: number }

type FilterState = {
  segment: string
  customerType: string
  capacity: string
}

const EMPTY_FILTERS: FilterState = { segment: 'all', customerType: 'all', capacity: 'all' }

function powerOverlapsBucket(power: ParsedPower, bucket: CapacityBucket): boolean {
  if (bucket.max === Infinity) return power.max >= bucket.min
  if (bucket.min === 0) return power.min < bucket.max
  return power.min < bucket.max && power.max >= bucket.min
}

export function AllProductsCatalogue({
  tabs,
  catalogues,
}: {
  tabs: AllProductsTab[]
  catalogues: CatalogueByCategory
}) {
  const [activeSlug, setActiveSlug] = useState(tabs[0]?.slug ?? '')
  const [draft, setDraft] = useState<FilterState>(EMPTY_FILTERS)
  const [applied, setApplied] = useState<FilterState>(EMPTY_FILTERS)
  const [filterOpen, setFilterOpen] = useState(false)
  const filterTriggerRef = useRef<HTMLButtonElement>(null)
  const filterCloseRef = useRef<HTMLButtonElement>(null)

  const cards = catalogues[activeSlug]?.cards ?? []
  const featured = catalogues[activeSlug]?.featured ?? null

  const segmentOptions = useMemo(() => {
    const seen = new Set<string>()
    const options: string[] = []
    for (const card of cards) {
      if (seen.has(card.group)) continue
      seen.add(card.group)
      options.push(card.group)
    }
    return options
  }, [cards])

  const customerTypeOptions = useMemo(() => {
    const seen = new Set<AllProductsCard['segmentKey']>()
    for (const card of cards) seen.add(card.segmentKey)
    return [...seen]
  }, [cards])

  const capacityUnit = useMemo(() => {
    const units = new Set(cards.map((card) => card.power?.unit).filter(Boolean))
    if (units.size === 1) return [...units][0] as ParsedPower['unit']
    return 'kW'
  }, [cards])

  const capacityBuckets = capacityUnit === 'kWh' ? KWH_BUCKETS : KW_BUCKETS

  const availableCapacityBuckets = useMemo(
    () =>
      capacityBuckets.filter((bucket) => {
        const matchCount = cards.filter(
          (card) => card.power && powerOverlapsBucket(card.power, bucket),
        ).length
        return matchCount > 0 && matchCount < cards.length
      }),
    [cards, capacityBuckets],
  )

  const showSegmentFilter = segmentOptions.length > 1
  const showCustomerFilter = customerTypeOptions.length > 1
  const showCapacityFilter = availableCapacityBuckets.length > 0
  const showFilters = showSegmentFilter || showCustomerFilter || showCapacityFilter
  const hasActiveFilters =
    applied.segment !== 'all' || applied.customerType !== 'all' || applied.capacity !== 'all'

  const filtered = useMemo(() => {
    return cards.filter((card) => {
      if (applied.segment !== 'all' && card.group !== applied.segment) return false
      if (applied.customerType !== 'all' && card.segmentKey !== applied.customerType) return false
      if (applied.capacity !== 'all') {
        const bucket = availableCapacityBuckets.find((item) => item.id === applied.capacity)
        if (!bucket || !card.power || !powerOverlapsBucket(card.power, bucket)) return false
      }
      return true
    })
  }, [applied, availableCapacityBuckets, cards])

  const selectCategory = (slug: string) => {
    if (slug === activeSlug) return
    setActiveSlug(slug)
    setDraft(EMPTY_FILTERS)
    setApplied(EMPTY_FILTERS)
    setFilterOpen(false)
  }

  const openFilters = () => {
    setDraft(applied)
    setFilterOpen(true)
  }

  const closeFilters = () => {
    setDraft(applied)
    setFilterOpen(false)
    filterTriggerRef.current?.focus()
  }

  const applyFilters = () => {
    setApplied(draft)
    setFilterOpen(false)
    filterTriggerRef.current?.focus()
  }

  const clearFilters = () => {
    setDraft(EMPTY_FILTERS)
  }

  useEffect(() => {
    if (!filterOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    filterCloseRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setDraft(applied)
      setFilterOpen(false)
      filterTriggerRef.current?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [applied, filterOpen])

  return (
    <>
      <nav
        aria-label="Product categories"
        className={cn(
          'sticky top-[4.25rem] border-b border-oriana-navy/10 bg-white/95 backdrop-blur-md',
          filterOpen ? 'z-[55]' : 'z-30',
        )}
      >
        <div className="container flex items-center gap-3">
          <ul role="tablist" aria-label="Product categories" className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const active = tab.slug === activeSlug
              return (
                <li key={tab.slug} className="shrink-0">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectCategory(tab.slug)}
                    className={cn(
                      'relative block whitespace-nowrap px-4 py-4 text-sm font-semibold transition-colors md:px-6 md:text-base',
                      active
                        ? 'text-oriana-navy'
                        : 'text-oriana-muted hover:text-oriana-navy',
                    )}
                  >
                    {tab.title}
                    <span
                      className={cn(
                        'absolute inset-x-3 bottom-0 h-[3px] origin-center rounded-full bg-oriana-blue transition-transform duration-200',
                        active ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
          {showFilters ? (
            <button
              ref={filterTriggerRef}
              type="button"
              onClick={filterOpen ? closeFilters : openFilters}
              aria-label="Filter products"
              aria-haspopup="dialog"
              aria-expanded={filterOpen}
              className={cn(
                'relative shrink-0 rounded-md p-2.5 text-oriana-navy transition hover:bg-oriana-silver',
                (filterOpen || hasActiveFilters) && 'text-oriana-blue',
              )}
            >
              <SlidersHorizontal className="h-5 w-5" strokeWidth={1.75} />
              {hasActiveFilters ? (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-oriana-blue" />
              ) : null}
            </button>
          ) : null}
        </div>
      </nav>

      {filterOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-oriana-navy/25 p-4"
          onClick={closeFilters}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-filters-title"
            className="relative max-h-[min(36rem,calc(100vh-2rem))] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white px-6 py-8 shadow-[0_18px_60px_rgba(7,21,37,0.18)] md:px-10 md:py-10"
            onClick={(event) => event.stopPropagation()}
          >
              <h2 id="product-filters-title" className="sr-only">
                Filter products
              </h2>
              <div className="flex justify-end">
                <button
                  ref={filterCloseRef}
                  type="button"
                  onClick={closeFilters}
                  aria-label="Close filters"
                  className="-mr-1.5 -mt-2 rounded-md p-1.5 text-oriana-navy/55 transition hover:bg-oriana-silver hover:text-oriana-navy"
                >
                  <X className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>

              <div className="-mt-2 space-y-1">
                {showCustomerFilter ? (
                  <FilterRow
                    title="By Customer Type"
                    value={draft.customerType}
                    options={[
                      { id: 'all', label: 'All' },
                      ...customerTypeOptions.map((key) => ({
                        id: key,
                        label: CUSTOMER_TYPE_LABELS[key],
                      })),
                    ]}
                    onChange={(value) => setDraft((prev) => ({ ...prev, customerType: value }))}
                  />
                ) : null}
                {showSegmentFilter ? (
                  <FilterRow
                    title="By Segment"
                    value={draft.segment}
                    options={[
                      { id: 'all', label: 'All' },
                      ...segmentOptions.map((segment) => ({ id: segment, label: segment })),
                    ]}
                    onChange={(value) => setDraft((prev) => ({ ...prev, segment: value }))}
                  />
                ) : null}
                {showCapacityFilter ? (
                  <FilterRow
                    title="By Capacity"
                    value={draft.capacity}
                    options={[
                      { id: 'all', label: 'All' },
                      ...availableCapacityBuckets.map((bucket) => ({
                        id: bucket.id,
                        label: bucket.label,
                      })),
                    ]}
                    onChange={(value) => setDraft((prev) => ({ ...prev, capacity: value }))}
                  />
                ) : null}
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="min-w-[88px] rounded-md border-2 border-oriana-blue px-6 py-2 text-sm font-semibold text-oriana-blue transition hover:bg-oriana-blue/5"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={applyFilters}
                  className="min-w-[88px] rounded-md bg-oriana-blue px-6 py-2 text-sm font-semibold text-white transition hover:bg-oriana-navy"
                >
                  Go
                </button>
              </div>
            </div>
        </div>
      ) : null}

      <div className="bg-oriana-surface">
        <div className="container py-12 lg:py-16">
          {featured ? (
            <section aria-labelledby="new-products-heading" className="mb-14 lg:mb-16">
              <h2
                id="new-products-heading"
                className="font-display text-2xl font-semibold text-oriana-navy md:text-3xl"
              >
                New Products
              </h2>
              <Link
                href={`/products/${featured.slug}`}
                className="mt-6 grid overflow-hidden rounded-2xl bg-gradient-to-br from-[#050d18] via-oriana-navy to-[#0a1f4a] shadow-lg transition hover:shadow-xl lg:grid-cols-[1.15fr_0.85fr]"
              >
                <div className="flex flex-col justify-center px-8 py-10 md:px-12 md:py-14">
                  <span className="inline-flex w-fit rounded-sm bg-oriana-sun px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-oriana-navy">
                    New
                  </span>
                  <p className="mt-5 text-sm font-medium text-white/55">{featured.powerRange}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white md:text-4xl">
                    {featured.series}
                  </h3>
                  <p className="mt-3 text-sm text-white/60">{featured.group}</p>
                  <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-oriana-blue px-5 py-2.5 text-sm font-semibold text-white">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="relative min-h-[220px] bg-gradient-to-br from-white/5 to-transparent lg:min-h-[320px]">
                  <ProductImage
                    name={featured.series}
                    categorySlug={featured.categorySlug}
                    src={featured.heroImageUrl}
                    alt={featured.heroImageAlt}
                    className="aspect-auto h-full min-h-[220px] bg-transparent lg:min-h-[320px]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>
              </Link>
            </section>
          ) : null}

          {cards.length === 0 ? (
            <div className="rounded-lg border border-dashed border-oriana-navy/20 bg-oriana-surface px-8 py-16 text-center">
              <h2 className="font-display text-2xl font-semibold text-oriana-navy">
                Explore our inverter range
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-oriana-muted">
                Our product catalogue is being updated. Contact us for current models and
                availability, or request a quote for your project.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-md bg-oriana-blue px-6 py-3 text-sm font-semibold text-white hover:bg-oriana-navy"
              >
                Request a quote
              </Link>
            </div>
          ) : filtered.length === 0 ? (
            <p className="rounded-lg border border-dashed border-oriana-navy/15 bg-oriana-surface px-6 py-10 text-center text-sm text-oriana-muted">
              No series match these filters.{' '}
              <button
                type="button"
                onClick={() => {
                  setDraft(EMPTY_FILTERS)
                  setApplied(EMPTY_FILTERS)
                }}
                className="font-semibold text-oriana-blue hover:underline"
              >
                Clear filters
              </button>
            </p>
          ) : (
            <div>
              <ProductSeriesSections cards={filtered} />
            </div>
          )}
        </div>
      </div>

      <section className="border-t border-oriana-navy/8 bg-oriana-silver/60">
        <div className="container flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center lg:py-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-oriana-navy md:text-3xl">
              Find a Distributor
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-oriana-muted md:text-base">
              Identify an authorized Oriana distributor to source inverters and storage with
              confidence — backed by local support, training, and genuine products.
            </p>
          </div>
          <Link
            href="/where-to-buy"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-oriana-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-oriana-navy"
          >
            Connect with Your Distributor
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}

function FilterRow({
  title,
  value,
  options,
  onChange,
}: {
  title: string
  value: string
  options: { id: string; label: string }[]
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:gap-10">
      <p className="w-44 shrink-0 text-[15px] font-semibold text-oriana-navy">{title}</p>
      <div
        role="radiogroup"
        aria-label={title}
        className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3"
      >
        {options.map((option) => {
          const active = option.id === value
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.id)}
              className="inline-flex items-center gap-2.5 whitespace-nowrap text-sm text-oriana-navy"
            >
              <span
                className={cn(
                  'flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2',
                  active ? 'border-oriana-blue' : 'border-oriana-navy/30',
                )}
              >
                {active ? <span className="h-2.5 w-2.5 rounded-full bg-oriana-blue" /> : null}
              </span>
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
