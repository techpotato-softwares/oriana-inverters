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

/** Products come only from Payload Admin (published). No hardcoded product fallback. */
async function fetchPublishedProducts(): Promise<CatalogueProduct[]> {
  const payload = await getPayloadSafe()
  if (!payload) return []

  try {
    const result = await payload.find({
      collection: 'products',
      depth: 2,
      limit: 500,
      pagination: false,
      where: {
        _status: { equals: 'published' },
      },
      sort: 'name',
    })

    return result.docs.map(mapProduct)
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
      depth: 2,
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

  return categories.map((cat) => ({
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
}

export async function getProductBySlug(slug: string): Promise<CatalogueProduct | null> {
  const products = await getCatalogueProducts()
  return products.find((p) => p.slug === slug) ?? null
}

export async function getSeriesBySlug(slug: string): Promise<CatalogueSeries | null> {
  const seriesList = await getCatalogueSeries()
  const bySeriesSlug = seriesList.find((s) => s.slug === slug)
  if (bySeriesSlug) return bySeriesSlug

  // Deep link: model slug → parent series
  const product = await getProductBySlug(slug)
  if (!product) return null
  return seriesList.find((s) => s.series === seriesNameOf(product)) ?? null
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
