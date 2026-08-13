import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import { slugifySeries } from '@/utilities/series'
import type { HomeHeroSlide } from '@/types/homeHero'

function relationId(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value !== '') {
    const n = Number(value)
    if (Number.isFinite(n)) return n
  }
  if (value && typeof value === 'object' && 'id' in value) {
    return relationId((value as { id: unknown }).id)
  }
  return null
}

async function fetchHomeHeroSlides(): Promise<HomeHeroSlide[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const media = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 20,
      pagination: false,
      sort: 'homeHeroSort',
      where: {
        and: [
          { useAsHomeHero: { equals: true } },
          { mimeType: { contains: 'image' } },
        ],
      },
    })

    const productIds = new Set<number>()
    const postIds = new Set<number>()
    for (const doc of media.docs) {
      const productId = relationId(doc.homeHeroProduct)
      const postId = relationId(doc.homeHeroPost)
      if (doc.homeHeroLinkType === 'product' && productId !== null) productIds.add(productId)
      if (doc.homeHeroLinkType === 'post' && postId !== null) postIds.add(postId)
    }

    const [products, posts] = await Promise.all([
      productIds.size
        ? payload.find({
            collection: 'products',
            depth: 0,
            limit: productIds.size,
            pagination: false,
            where: { id: { in: [...productIds] } },
          })
        : Promise.resolve({ docs: [] as { id: number; slug: string; name: string; modelSeries?: string | null }[] }),
      postIds.size
        ? payload.find({
            collection: 'posts',
            depth: 0,
            limit: postIds.size,
            pagination: false,
            where: {
              and: [{ id: { in: [...postIds] } }, { _status: { equals: 'published' } }],
            },
          })
        : Promise.resolve({ docs: [] as { id: number; slug: string; title: string }[] }),
    ])

    const productsById = new Map(products.docs.map((doc) => [doc.id, doc]))
    const postsById = new Map(posts.docs.map((doc) => [doc.id, doc]))

    return media.docs.flatMap((doc) => {
      if (!doc.url) return []

      if (doc.homeHeroLinkType === 'product') {
        const product = productsById.get(relationId(doc.homeHeroProduct) ?? -1)
        if (!product?.slug) return []
        const seriesSlug = product.modelSeries ? slugifySeries(product.modelSeries) : product.slug
        const href =
          seriesSlug && seriesSlug !== product.slug
            ? `/products/${seriesSlug}?model=${encodeURIComponent(product.slug)}`
            : `/products/${product.slug}`
        return [
          {
            id: doc.id,
            imageUrl: doc.url,
            imageAlt: doc.alt || product.name,
            href,
            headline: doc.homeHeroHeadline?.trim() || product.name,
            ctaLabel: doc.homeHeroCta?.trim() || 'View product',
            linkType: 'product' as const,
          },
        ]
      }

      if (doc.homeHeroLinkType === 'post') {
        const post = postsById.get(relationId(doc.homeHeroPost) ?? -1)
        if (!post?.slug) return []
        return [
          {
            id: doc.id,
            imageUrl: doc.url,
            imageAlt: doc.alt || post.title,
            href: `/posts/${post.slug}`,
            headline: doc.homeHeroHeadline?.trim() || post.title,
            ctaLabel: doc.homeHeroCta?.trim() || 'Read article',
            linkType: 'post' as const,
          },
        ]
      }

      return []
    })
  } catch (error) {
    console.error('[getHomeHero] failed:', error)
    return []
  }
}

export const getHomeHeroSlides = unstable_cache(fetchHomeHeroSlides, ['home-hero-slides'], {
  tags: ['home-hero'],
})
