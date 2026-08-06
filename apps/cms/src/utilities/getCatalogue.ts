import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { staticCategories } from '@/data/products'
import { mapCategory, mapDownload, mapProduct } from '@/utilities/mapCatalogue'
import { groupProductsIntoSeries, seriesNameOf, slugifySeries } from '@/utilities/series'
import type {
  CatalogueCategory,
  CatalogueDownload,
  CatalogueNavItem,
  CatalogueProduct,
  CatalogueSeries,
} from '@/types/catalogue'

async function getPayloadSafe() {
  try {
    return await getPayload({ config: configPromise })
  } catch (error) {
    console.error('[getCatalogue] Payload init failed:', error)
    return null
  }
}

function relationId(value: unknown): number | string | null {
  if (typeof value === 'number' || typeof value === 'string') return value
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id: unknown }).id
    if (typeof id === 'number' || typeof id === 'string') return id
  }
  return null
}

/** Products come only from Payload Admin (published). No hardcoded product fallback. */
async function fetchPublishedProducts(): Promise<CatalogueProduct[]> {
  const payload = await getPayloadSafe()
  if (!payload) return []

  try {
    // depth:0 — populating media via depth≥1 used to throw on Lambda when seed
    // files weren't in S3 and emptied the whole catalogue. Join categories +
    // media separately so hero/datasheet URLs still resolve for the frontend.
    const [result, categoriesResult, mediaResult] = await Promise.all([
      payload.find({
        collection: 'products',
        depth: 0,
        limit: 500,
        pagination: false,
        where: {
          _status: { equals: 'published' },
        },
        sort: 'name',
      }),
      payload.find({
        collection: 'categories',
        depth: 0,
        limit: 100,
        pagination: false,
      }),
      payload.find({
        collection: 'media',
        depth: 0,
        limit: 500,
        pagination: false,
      }),
    ])

    const categoriesById = new Map(categoriesResult.docs.map((doc) => [doc.id, doc]))
    const mediaById = new Map(mediaResult.docs.map((doc) => [doc.id, doc]))

    return result.docs.map((doc) => {
      const categoryId = relationId(doc.category)
      const categoryDoc =
        categoryId !== null ? categoriesById.get(categoryId) : null

      const heroId = relationId(doc.heroImage)
      const datasheetId = relationId(doc.datasheetPdf)

      return mapProduct({
        ...doc,
        category: categoryDoc ?? doc.category,
        heroImage: (heroId !== null ? mediaById.get(heroId) : null) ?? doc.heroImage,
        datasheetPdf:
          (datasheetId !== null ? mediaById.get(datasheetId) : null) ?? doc.datasheetPdf,
      })
    })
  } catch (error) {
    console.error('[getCatalogue] products query failed:', error)
    return []
  }
}

/** Categories come from Admin; empty CMS returns no categories (create them in Admin). */
async function fetchCategories(): Promise<CatalogueCategory[]> {
  const payload = await getPayloadSafe()
  if (!payload) return []

  try {
    const result = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      pagination: false,
      sort: 'sortOrder',
    })

    if (!result.docs.length) return []

    return result.docs.map(mapCategory).sort((a, b) => (a.sortOrder ?? 100) - (b.sortOrder ?? 100))
  } catch (error) {
    console.error('[getCatalogue] categories query failed:', error)
    return []
  }
}

async function fetchDownloads(): Promise<CatalogueDownload[]> {
  const payload = await getPayloadSafe()
  if (!payload) return []

  try {
    const result = await payload.find({
      collection: 'downloads',
      depth: 0,
      limit: 200,
      pagination: false,
      sort: 'title',
    })

    return result.docs.map(mapDownload)
  } catch (error) {
    console.error('[getCatalogue] downloads query failed:', error)
    return []
  }
}

export const getCatalogueProducts = unstable_cache(fetchPublishedProducts, ['catalogue-products'], {
  tags: ['products'],
})

export const getCatalogueCategories = unstable_cache(fetchCategories, ['catalogue-categories'], {
  tags: ['categories'],
})

export const getCatalogueDownloads = unstable_cache(fetchDownloads, ['catalogue-downloads'], {
  tags: ['downloads'],
})

export async function getCatalogueSeries(): Promise<CatalogueSeries[]> {
  const products = await getCatalogueProducts()
  return groupProductsIntoSeries(products)
}

export async function getCatalogueNav(): Promise<CatalogueNavItem[]> {
  const [categories, seriesList] = await Promise.all([
    getCatalogueCategories(),
    getCatalogueSeries(),
  ])

  return categories
    .map((cat) => ({
      title: cat.title,
      href: `/products/category/${cat.slug}`,
      description: cat.description,
      products: seriesList
        .filter((s) => s.categorySlug === cat.slug)
        .map((s) => ({
          label: s.series,
          href: `/products/${s.slug}`,
          imageUrl: s.heroImageUrl,
        })),
    }))
    // Hide empty families (e.g. "Test category") from the Products mega-menu.
    .filter((cat) => cat.products.length > 0)
}

export async function getProductBySlug(slug: string): Promise<CatalogueProduct | null> {
  const products = await getCatalogueProducts()
  const cached = products.find((p) => p.slug === slug)
  if (cached) return cached

  // Recovery path for stale/empty unstable_cache entries.
  const fresh = await fetchPublishedProducts()
  return fresh.find((p) => p.slug === slug) ?? null
}

export async function getSeriesBySlug(slug: string): Promise<CatalogueSeries | null> {
  const seriesList = await getCatalogueSeries()
  const bySeriesSlug = seriesList.find((s) => s.slug === slug)
  if (bySeriesSlug) return bySeriesSlug

  // Deep link: model slug → parent series
  const product = await getProductBySlug(slug)
  if (!product) return null
  const byDeepLink = seriesList.find((s) => s.series === seriesNameOf(product))
  if (byDeepLink) return byDeepLink

  // Recovery path: if cache was populated during a transient Payload init
  // failure, unstable_cache can hold an empty catalogue and produce false 404s.
  const freshSeriesList = groupProductsIntoSeries(await fetchPublishedProducts())
  const freshBySeriesSlug = freshSeriesList.find((s) => s.slug === slug)
  if (freshBySeriesSlug) return freshBySeriesSlug
  return (
    freshSeriesList.find((s) => s.series === seriesNameOf(product)) ??
    null
  )
}

export async function getProductsByCategory(categorySlug: string): Promise<CatalogueProduct[]> {
  const products = await getCatalogueProducts()
  return products.filter((p) => p.categorySlug === categorySlug)
}

export async function getSeriesByCategory(categorySlug: string): Promise<CatalogueSeries[]> {
  const seriesList = await getCatalogueSeries()
  return seriesList.filter((s) => s.categorySlug === categorySlug)
}

export async function getCategoryMeta(slug: string): Promise<CatalogueCategory | null> {
  const categories = await getCatalogueCategories()
  return (
    categories.find((c) => c.slug === slug) ??
    staticCategories.find((c) => c.slug === slug) ??
    null
  )
}

export async function getAllProductSlugs(): Promise<string[]> {
  const [seriesList, products] = await Promise.all([
    getCatalogueSeries(),
    getCatalogueProducts(),
  ])
  // Prefer series URLs; keep model slugs so old links still resolve.
  return [...new Set([...seriesList.map((s) => s.slug), ...products.map((p) => p.slug)])]
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const categories = await getCatalogueCategories()
  return categories.map((c) => c.slug)
}

export { slugifySeries, seriesNameOf }
