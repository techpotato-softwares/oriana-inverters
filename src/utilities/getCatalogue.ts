import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { staticCategories, staticProducts } from '@/data/products'
import { mapCategory, mapDownload, mapProduct } from '@/utilities/mapCatalogue'
import type { CatalogueCategory, CatalogueDownload, CatalogueProduct } from '@/types/catalogue'

async function getPayloadSafe() {
  try {
    return await getPayload({ config: configPromise })
  } catch (error) {
    console.error('[getCatalogue] Payload init failed, using static fallback:', error)
    return null
  }
}

async function fetchPublishedProducts(): Promise<CatalogueProduct[]> {
  const payload = await getPayloadSafe()
  if (!payload) return staticProducts

  try {
    const result = await payload.find({
      collection: 'products',
      depth: 2,
      limit: 200,
      pagination: false,
      where: {
        _status: { equals: 'published' },
      },
      sort: 'name',
    })

    if (!result.docs.length) {
      return staticProducts
    }

    const cmsProducts = result.docs.map(mapProduct)
    const merged = new Map<string, CatalogueProduct>()
    for (const p of staticProducts) merged.set(p.slug, p)
    for (const p of cmsProducts) merged.set(p.slug, p)
    return Array.from(merged.values())
  } catch (error) {
    console.error('[getCatalogue] products query failed, using static fallback:', error)
    return staticProducts
  }
}

async function fetchCategories(): Promise<CatalogueCategory[]> {
  const payload = await getPayloadSafe()
  if (!payload) return staticCategories

  try {
    const result = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 50,
      pagination: false,
      sort: 'title',
    })

    if (!result.docs.length) {
      return staticCategories
    }

    return result.docs.map(mapCategory)
  } catch (error) {
    console.error('[getCatalogue] categories query failed, using static fallback:', error)
    return staticCategories
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

export async function getProductBySlug(slug: string): Promise<CatalogueProduct | null> {
  const products = await getCatalogueProducts()
  return products.find((p) => p.slug === slug) ?? null
}

export async function getProductsByCategory(categorySlug: string): Promise<CatalogueProduct[]> {
  const products = await getCatalogueProducts()
  return products.filter((p) => p.categorySlug === categorySlug)
}

export async function getCategoryMeta(
  slug: string,
): Promise<CatalogueCategory | null> {
  const categories = await getCatalogueCategories()
  return categories.find((c) => c.slug === slug) ?? staticCategories.find((c) => c.slug === slug) ?? null
}

export async function getAllProductSlugs(): Promise<string[]> {
  const products = await getCatalogueProducts()
  return products.map((p) => p.slug)
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const categories = await getCatalogueCategories()
  return categories.map((c) => c.slug)
}
