import type { CatalogueCategory, CatalogueProduct, CatalogueSeries } from '@/types/catalogue'

import productMasterJson from './productMaster.json'

type MegaLink = { label: string; href: string }
type MegaColumn = { title: string; href?: string; image?: string; links: MegaLink[] }
type MegaCategory = { label: string; href: string; columns: MegaColumn[] }

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
    'Grid-tied string inverters for residential, commercial, and industrial solar systems.',
  'hybrid-inverters':
    'Hybrid inverters with battery integration for home and C&I energy storage.',
  'utility-scale-inverters':
    'High-capacity grid-tied inverters engineered for utility-scale solar plants.',
  bess: 'Battery energy storage systems for residential applications.',
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

export function segmentHref(categoryName: string, segmentTitle: string): string {
  return `${categoryHref(categoryName)}?segment=${encodeURIComponent(slugifyLabel(segmentTitle))}`
}

export const SEGMENT_IMAGE_STRING = '/assets/products/segment-string.png'
export const SEGMENT_IMAGE_CABINET = '/assets/products/segment-cabinet.png'

export function segmentImage(segmentTitle: string): string {
  const title = segmentTitle.toLowerCase()
  if (
    title.includes('c&i') ||
    title.includes('c and i') ||
    title.includes('utility') ||
    title.includes('bess')
  ) {
    return SEGMENT_IMAGE_CABINET
  }
  return SEGMENT_IMAGE_STRING
}

function cmsSegmentImageUrl(
  cmsCategory: CmsCategoryImages | undefined,
  segmentTitle: string,
): string | null {
  if (!cmsCategory?.segments?.length) return null
  const key = slugifyLabel(segmentTitle)
  for (const segment of cmsCategory.segments) {
    if (!segment.imageUrl) continue
    const segmentKey = slugifyLabel(segment.slug || segment.name)
    if (segmentKey === key || slugifyLabel(segment.name) === key) return segment.imageUrl
  }
  return null
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

function groupFamiliesBySegment(families: ProductFamily[]) {
  const order: string[] = []
  const groups = new Map<string, ProductFamily[]>()

  for (const family of families) {
    const title = segmentTitle(family)
    if (!groups.has(title)) {
      groups.set(title, [])
      order.push(title)
    }
    groups.get(title)!.push(family)
  }

  return order.map((title) => ({ title, families: groups.get(title)! }))
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
  commercial: 'C&I',
  'commercial-and-industrial': 'C&I',
  'utility-scale': 'Utility Grid-Tied PV Inverter',
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

  if (series.segmentKey === 'commercial') return 'C&I'
  if (series.segment) {
    const aliased = SEGMENT_DISPLAY_ALIASES[slugifyLabel(series.segment)]
    if (aliased) return aliased
    if (series.segment !== '—' && series.segment !== 'Residential') return series.segment
  }
  if (series.phases && series.phases !== '—') return series.phases
  return series.series || 'Products'
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

/** Products mega-menu: category rail → segment tiles → category product list. */
export function buildProductsMegaMenu(cmsCategories?: CmsCategoryImages[]): MegaCategory[] {
  const cmsBySlug = new Map((cmsCategories ?? []).map((category) => [category.slug, category]))

  return productMaster.categories.map((category) => {
    const cms = cmsBySlug.get(categorySlug(category.name))
    const groups = groupFamiliesBySegment(category.families)
    const usedKeys = new Set(groups.map((group) => slugifyLabel(group.title)))

    const columns: MegaColumn[] = groups.map((group) => {
      const href = segmentHref(category.name, group.title)
      return {
        title: group.title,
        href,
        image: cmsSegmentImageUrl(cms, group.title) || segmentImage(group.title),
        links: [{ label: group.title, href }],
      }
    })

    for (const segment of cms?.segments ?? []) {
      const key = slugifyLabel(segment.slug || segment.name)
      if (!key || usedKeys.has(key) || !segment.imageUrl) continue
      usedKeys.add(key)
      const href = segmentHref(category.name, segment.name)
      columns.push({
        title: segment.name,
        href,
        image: segment.imageUrl || segmentImage(segment.name),
        links: [{ label: segment.name, href }],
      })
    }

    return {
      label: category.name,
      href: categoryHref(category.name),
      columns,
    }
  })
}

/** Unique tile image URLs for `<link rel="preload">` / eager `<img>` warmup. */
export function uniqueProductsMegaMenuImageUrls(
  menu: Array<{ columns: Array<{ image?: string }> }>,
): string[] {
  const urls: string[] = []
  const seen = new Set<string>()
  for (const category of menu) {
    for (const column of category.columns) {
      const image = column.image
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
  family: { segment: string | null },
): CatalogueProduct['segmentKey'] {
  if (categoryName === 'BESS') return 'storage'
  if (categoryName === 'Utility Scale Inverters') return 'utility'
  if (family.segment === 'C&I') return 'commercial'
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
    modelSeries: family.series,
    specs: [
      { label: 'Model', value: family.productName },
      { label: 'Model Series', value: family.series },
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
    variants: [variant],
  }
}

export function seriesFromProductMaster(categorySlugValue?: string): CatalogueSeries[] {
  return productMaster.categories.flatMap((category) => {
    if (categorySlugValue && categorySlug(category.name) !== categorySlugValue) return []
    return category.families.map((family) => familyToSeries(category, family))
  })
}
