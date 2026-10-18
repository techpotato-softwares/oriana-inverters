import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { parseKeywords } from './seoKeywords'
import { getServerSideURL } from './getURL'

const SITE_NAME = 'Oriana Inverters'
const DEFAULT_TITLE = 'Oriana Inverters | Advanced Solar Inverter Solutions'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    return ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return `${serverUrl}/opengraph-image`
}

type SeoLike = {
  metaTitle?: string | null
  metaDescription?: string | null
  keywords?: string | null
  canonicalUrl?: string | null
  noIndex?: boolean | null
  ogImage?: Media | Config['db']['defaultIDType'] | null
}

/** Shared page SEO → Next Metadata (title, description, keywords, robots, canonical). */
export function metadataFromSeo(
  seo: SeoLike | null | undefined,
  fallbacks: { title?: string; description?: string; keywords?: string[]; path?: string } = {},
): Metadata {
  const title = seo?.metaTitle?.trim() || fallbacks.title
  const description = seo?.metaDescription?.trim() || fallbacks.description
  const keywords = parseKeywords(seo?.keywords, fallbacks.keywords)
  const noIndex = Boolean(seo?.noIndex)
  const canonical = seo?.canonicalUrl?.trim() || fallbacks.path

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    keywords,
    authors: [{ name: 'Oriana Inverters' }, { name: 'TechPotato Software LLP', url: 'https://techpotato.in' }],
    creator: 'TechPotato Software LLP',
    publisher: 'Oriana Inverters',
    robots: noIndex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    ...(canonical
      ? {
          alternates: {
            canonical: canonical.startsWith('http')
              ? canonical
              : `${getServerSideURL()}${canonical.startsWith('/') ? canonical : `/${canonical}`}`,
          },
        }
      : {}),
  }
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title ? `${doc.meta.title} | ${SITE_NAME}` : DEFAULT_TITLE
  const path = Array.isArray(doc?.slug) ? `/${doc.slug.join('/')}` : '/'
  const keywords = parseKeywords(
    (doc?.meta as { keywords?: string | null } | undefined)?.keywords,
  )
  const noIndex = Boolean((doc?.meta as { noIndex?: boolean | null } | undefined)?.noIndex)

  return {
    description: doc?.meta?.description,
    keywords,
    authors: [{ name: 'Oriana Inverters' }, { name: 'TechPotato Software LLP', url: 'https://techpotato.in' }],
    creator: 'TechPotato Software LLP',
    publisher: SITE_NAME,
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    alternates: { canonical: `${getServerSideURL()}${path === '/' ? '' : path}` },
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: path,
    }),
    title,
  }
}
