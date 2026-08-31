import { seriesSegmentLabel } from '@/data/productMaster'
import type { CatalogueProduct, CatalogueSeries } from '@/types/catalogue'

export type AllProductsTab = {
  slug: string
  title: string
}

export type ParsedPower = {
  min: number
  max: number
  unit: 'kW' | 'kWh'
}

export type AllProductsCard = {
  slug: string
  series: string
  group: string
  segmentKey: CatalogueProduct['segmentKey']
  powerRange: string
  variantCount: number
  heroImageUrl?: string | null
  heroImageAlt?: string | null
  datasheetUrl?: string | null
  featured: boolean
  categorySlug: string
  power: ParsedPower | null
}

export function parsePowerRange(powerRange: string): ParsedPower | null {
  const text = powerRange.replace(/,/g, '').toLowerCase()
  if (!text || text === '—') return null
  const unit: ParsedPower['unit'] = /\bkwh\b/.test(text) ? 'kWh' : 'kW'
  const nums = [...text.matchAll(/(\d+(?:\.\d+)?)/g)].map((match) => Number(match[1]))
  if (!nums.length) return null
  return { min: Math.min(...nums), max: Math.max(...nums), unit }
}

export function groupLabelForSeries(series: CatalogueSeries): string {
  return seriesSegmentLabel(series, series.categorySlug)
}

export function seriesToCatalogueCard(series: CatalogueSeries): AllProductsCard {
  const featuredVariant = series.variants.find((variant) => variant.featured)
  const datasheetUrl =
    series.variants.find((variant) => variant.datasheetUrl)?.datasheetUrl ?? null

  return {
    slug: series.slug,
    series: series.series,
    group: groupLabelForSeries(series),
    segmentKey: series.segmentKey,
    powerRange: series.powerRange,
    variantCount: series.variants.length,
    heroImageUrl: featuredVariant?.heroImageUrl ?? series.heroImageUrl,
    heroImageAlt: featuredVariant?.heroImageAlt ?? series.heroImageAlt ?? series.series,
    datasheetUrl,
    featured: series.variants.some((variant) => variant.featured),
    categorySlug: series.categorySlug,
    power: parsePowerRange(series.powerRange),
  }
}

export function pickFeaturedCard(cards: AllProductsCard[]): AllProductsCard | null {
  return cards.find((card) => card.featured) ?? cards[0] ?? null
}

export type CatalogueByCategory = Record<
  string,
  { cards: AllProductsCard[]; featured: AllProductsCard | null }
>

export function groupCardsBySegment(
  cards: AllProductsCard[],
): { title: string; cards: AllProductsCard[] }[] {
  const order: string[] = []
  const groups = new Map<string, AllProductsCard[]>()
  for (const card of cards) {
    const title = card.group
    if (!groups.has(title)) {
      groups.set(title, [])
      order.push(title)
    }
    groups.get(title)!.push(card)
  }
  return order.map((title) => ({ title, cards: groups.get(title)! }))
}

export const CATEGORY_DATASHEET_URL: Record<string, string> = {
  'on-grid-inverters': '/media/on-grid-inverters-datasheet.pdf',
  'hybrid-inverters': '/media/hybrid-inverters-datasheet.pdf',
  'utility-scale-inverters': '/media/utility-scale-inverters-datasheet.pdf',
  bess: '/media/bess-home-datasheet.pdf',
}

export function resolveDatasheetUrl(
  categorySlug: string,
  datasheetUrl?: string | null,
): string {
  if (datasheetUrl) return datasheetUrl
  return CATEGORY_DATASHEET_URL[categorySlug] ?? '/resources/downloads'
}

export function isFileDocument(url: string): boolean {
  return /\.(pdf|zip|docx?)$/i.test(url.split('?')[0] ?? '')
}

export const CANONICAL_CATEGORY_SLUGS = [
  'on-grid-inverters',
  'hybrid-inverters',
  'utility-scale-inverters',
  'bess',
] as const

export function sortCatalogueTabs(tabs: AllProductsTab[]): AllProductsTab[] {
  const bySlug = new Map(tabs.map((tab) => [tab.slug, tab]))
  const canonical = CANONICAL_CATEGORY_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (tab): tab is AllProductsTab => Boolean(tab),
  )
  if (canonical.length) return canonical

  return [...tabs].sort((a, b) => a.title.localeCompare(b.title))
}
