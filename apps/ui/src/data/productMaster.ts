import type { CatalogueCategory, CatalogueProduct, CatalogueSeries } from '@/types/catalogue'

import productMasterJson from './productMaster.json'

type MegaLink = { label: string; href: string }
type MegaColumn = { title: string; href?: string; image?: string; links: MegaLink[] }
type MegaCategory = { label: string; href: string; image?: string; columns: MegaColumn[] }

export type CmsSegmentImage = {
  name: string
  slug?: string | null
  imageUrl?: string | null
}

export type CmsCategoryImages = {
  slug: string
  imageUrl?: string | null
  segments?: CmsSegmentImage[]
}

export type ProductFamily = {
  family: number
  segment: string | null
  capacity: string
  series: string
  productName: string
}

export type ProductMasterCategory = {
  name: string
  families: ProductFamily[]
}

export type ProductMaster = {
  categories: ProductMasterCategory[]
}

export const productMaster = productMasterJson as ProductMaster

const categoryDescriptions: Record<string, string> = {
  'on-grid-inverters':
    'Oriana On-Grid Solar Inverters are engineered to efficiently convert solar energy into usable AC power and seamlessly integrate it with the electrical grid.',
  'hybrid-inverters':
    'Oriana Hybrid Solar Inverters intelligently manage solar, battery, and grid power to deliver efficient energy utilization with reliable backup.',
  'utility-scale-inverters':
    'Oriana Utility-Scale Solar Inverter is engineered for high-capacity solar power plants where efficiency, reliability, grid performance, and long-term operational stability are critical.',
  bess: 'Oriana Battery Energy Storage Systems (BESS) are designed to store electrical energy and deliver it when it matters most.',
}

export function slugifyLabel(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function categorySlug(name: string): string {
  return slugifyLabel(name)
}

export function categoryHref(name: string): string {
  return `/products/category/${categorySlug(name)}`
}

export const SEGMENT_IMAGE_STRING = '/assets/products/segment-string.png'
export const SEGMENT_IMAGE_CABINET = '/assets/products/segment-cabinet.png'

const CATEGORY_IMAGES: Record<string, string> = {
  'on-grid-inverters': SEGMENT_IMAGE_STRING,
  'hybrid-inverters': SEGMENT_IMAGE_STRING,
  'utility-scale-inverters': SEGMENT_IMAGE_CABINET,
  bess: SEGMENT_IMAGE_CABINET,
}

export function categoryImage(categoryName: string, cms?: CmsCategoryImages): string {
  const fallback = CATEGORY_IMAGES[categorySlug(categoryName)] ?? SEGMENT_IMAGE_STRING
  const cmsUrl = cms?.imageUrl
  if (cmsUrl && !cmsUrl.toLowerCase().endsWith('.svg')) return cmsUrl
  return fallback
}

export function segmentImage(segmentTitle: string): string {
  const title = segmentTitle.toLowerCase()
  if (title.includes('home')) return SEGMENT_IMAGE_STRING
  if (
    title.includes('c&i') ||
    title.includes('c and i') ||
    title.includes('utility') ||
    title.includes('core') ||
    title.includes('bess')
  ) {
    return SEGMENT_IMAGE_CABINET
  }
  return SEGMENT_IMAGE_STRING
}

export function familySlug(family: ProductFamily): string {
  return slugifyLabel(family.productName)
}

export function familyHref(family: ProductFamily): string {
  return `/products/${familySlug(family)}`
}

function segmentTitle(family: ProductFamily): string {
  return family.segment || family.series || 'Products'
}

function normalizeSegmentSlug(segmentSlug: string): string {
  return segmentSlug === 'candi' ? 'c-and-i' : segmentSlug
}

export function segmentLabelForSlug(categorySlugValue: string, segmentSlug: string): string | null {
  const normalized = normalizeSegmentSlug(segmentSlug)
  for (const category of productMaster.categories) {
    if (categorySlug(category.name) !== categorySlugValue) continue
    for (const family of category.families) {
      const title = segmentTitle(family)
      if (slugifyLabel(title) === normalized) return title
    }
  }
  return null
}

export function familySlugsForSegment(categorySlugValue: string, segmentSlug: string): Set<string> {
  const slugs = new Set<string>()
  const normalized = normalizeSegmentSlug(segmentSlug)
  for (const category of productMaster.categories) {
    if (categorySlug(category.name) !== categorySlugValue) continue
    for (const family of category.families) {
      if (slugifyLabel(segmentTitle(family)) === normalized) {
        slugs.add(familySlug(family))
      }
    }
  }
  return slugs
}

type SeriesSegmentInput = {
  slug: string
  series: string
  segment?: string
  segmentKey?: string
  phases?: string
  variants?: { slug: string }[]
}

export function seriesMatchesSegment(
  series: SeriesSegmentInput,
  categorySlugValue: string,
  segmentSlug: string,
): boolean {
  const normalized = normalizeSegmentSlug(segmentSlug)
  const allowed = familySlugsForSegment(categorySlugValue, normalized)
  if (allowed.has(series.slug) || allowed.has(slugifyLabel(series.series))) return true
  if (series.variants?.some((variant) => allowed.has(variant.slug))) return true

  const title = segmentLabelForSlug(categorySlugValue, normalized)
  if (title === 'C&I' || normalized === 'c-and-i') {
    if (series.segmentKey === 'commercial') return true
    const segmentSlugOf = series.segment ? slugifyLabel(series.segment) : ''
    if (
      segmentSlugOf === 'c-and-i' ||
      segmentSlugOf === 'candi' ||
      segmentSlugOf === 'commercial' ||
      segmentSlugOf === 'commercial-and-industrial'
    ) {
      return true
    }
  }
  return false
}

const SEGMENT_DISPLAY_ALIASES: Record<string, string> = {
  'c-and-i': 'C&I',
  candi: 'C&I',
  commercial: 'Three Phase',
  'commercial-and-industrial': 'Three Phase',
  'utility-scale': 'Utility Inverter',
  'utility-grid-tied-pv-inverter': 'Utility Inverter',
  'energy-storage': 'ORIANA BESS Home',
}

/** Product-master segment for cards (C&I, not CMS "Three Phase" / "Commercial & Industrial"). */
export function seriesSegmentLabel(series: SeriesSegmentInput, categorySlugValue: string): string {
  const master = productMaster.categories.find(
    (category) => categorySlug(category.name) === categorySlugValue,
  )
  if (master) {
    const seen = new Set<string>()
    for (const family of master.families) {
      const title = family.segment || family.series || master.name
      if (seen.has(title)) continue
      seen.add(title)
      if (seriesMatchesSegment(series, categorySlugValue, slugifyLabel(title))) {
        return title
      }
    }
  }

  if (series.segmentKey === 'commercial' && categorySlugValue !== 'bess') {
    return 'Three Phase'
  }
  if (series.segment) {
    const aliased = SEGMENT_DISPLAY_ALIASES[slugifyLabel(series.segment)]
    if (aliased) return aliased
    if (series.segment !== '—' && series.segment !== 'Residential') return series.segment
  }
  if (series.phases && series.phases !== '—') return series.phases
  return series.series || 'Products'
}

/** Listing headings: Single Phase → Single Phase Inverter, and so on. */
export function listingSectionTitle(group: string): string {
  if (group === 'Single Phase') return 'Single Phase Inverter'
  if (group === 'Three Phase') return 'Three Phase Inverter'
  return group
}

export function sortSeriesByProductMaster<T extends { slug: string; series: string }>(
  seriesList: T[],
  categorySlugValue: string,
): T[] {
  const rank = new Map(
    seriesFromProductMaster(categorySlugValue).map((series, index) => [series.slug, index]),
  )
  return [...seriesList].sort((a, b) => {
    const aRank = rank.get(a.slug) ?? rank.get(slugifyLabel(a.series)) ?? 1000
    const bRank = rank.get(b.slug) ?? rank.get(slugifyLabel(b.series)) ?? 1000
    if (aRank !== bRank) return aRank - bRank
    return a.series.localeCompare(b.series)
  })
}

/** Products mega-menu: horizontal category tiles → category pages. */
export function buildProductsMegaMenu(cmsCategories?: CmsCategoryImages[]): MegaCategory[] {
  const cmsBySlug = new Map((cmsCategories ?? []).map((category) => [category.slug, category]))

  return productMaster.categories.map((category) => {
    const cms = cmsBySlug.get(categorySlug(category.name))
    const href = categoryHref(category.name)
    const image = categoryImage(category.name, cms)
    return {
      label: category.name,
      href,
      image,
      columns: [
        {
          title: category.name,
          href,
          image,
          links: [{ label: category.name, href }],
        },
      ],
    }
  })
}

/** Unique tile image URLs for `<link rel="preload">` / eager `<img>` warmup. */
export function uniqueProductsMegaMenuImageUrls(
  menu: Array<{ image?: string; columns: Array<{ image?: string }> }>,
): string[] {
  const urls: string[] = []
  const seen = new Set<string>()
  for (const category of menu) {
    const images = [category.image, ...category.columns.map((column) => column.image)]
    for (const image of images) {
      if (!image || seen.has(image)) continue
      seen.add(image)
      urls.push(image)
    }
  }
  return urls
}

export const productMasterCategories: CatalogueCategory[] = productMaster.categories.map(
  (category) => {
    const slug = categorySlug(category.name)
    return {
      slug,
      title: category.name,
      description: categoryDescriptions[slug] ?? '',
    }
  },
)

export function segmentKeyOf(
  categoryName: string,
  family: { segment: string | null; capacity?: string },
): CatalogueProduct['segmentKey'] {
  if (categoryName === 'BESS') {
    const segment = (family.segment || '').toLowerCase()
    if (segment.includes('c&i') || segment.includes('c and i')) return 'commercial'
    if (segment.includes('core')) return 'utility'
    return 'storage'
  }
  if (categoryName === 'Utility Scale Inverters') return 'utility'
  const capacity = family.capacity ?? ''
  const nums = [...capacity.replace(/,/g, '').matchAll(/(\d+(?:\.\d+)?)/g)].map((match) =>
    Number(match[1]),
  )
  if (nums.length && Math.min(...nums) >= 30) return 'commercial'
  return 'residential'
}

export function findFamilyBySlug(slug: string): {
  category: ProductMasterCategory
  family: ProductFamily
} | null {
  for (const category of productMaster.categories) {
    for (const family of category.families) {
      if (familySlug(family) === slug) return { category, family }
    }
  }
  return null
}

export function familyToSeries(
  category: ProductMasterCategory,
  family: ProductFamily,
): CatalogueSeries {
  const slug = familySlug(family)
  const catSlug = categorySlug(category.name)
  const segmentKey = segmentKeyOf(category.name, family)
  const segment = family.segment || family.series || category.name
  const description = `${family.productName} — ${family.capacity} (${family.series}).`

  const imageUrl = segmentImage(segment)

  const variant: CatalogueProduct = {
    slug,
    name: family.productName,
    category: category.name,
    categorySlug: catSlug,
    segment,
    segmentKey,
    powerRange: family.capacity,
    efficiency: '—',
    phases: family.segment || '—',
    warranty: '—',
    description,
    modelSeries: family.productName,
    heroImageUrl: imageUrl,
    heroImageAlt: family.productName,
    specs: [
      { label: 'Model', value: family.productName },
      { label: 'Model Series', value: family.productName },
      { label: 'Capacity', value: family.capacity },
    ],
  }

  return {
    series: family.productName,
    slug,
    category: category.name,
    categorySlug: catSlug,
    segment,
    segmentKey,
    phases: variant.phases,
    powerRange: family.capacity,
    description,
    heroImageUrl: imageUrl,
    heroImageAlt: family.productName,
    variants: [variant],
  }
}

export function seriesFromProductMaster(categorySlugValue?: string): CatalogueSeries[] {
  return productMaster.categories.flatMap((category) => {
    if (categorySlugValue && categorySlug(category.name) !== categorySlugValue) return []
    return category.families.map((family) => familyToSeries(category, family))
  })
}
