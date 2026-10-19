import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import {
  legalPagesBySlug,
  type LegalPageContent,
} from '@/endpoints/seed/oriana/legalPagesContent'
import { visibleItems } from '@/utilities/visibility'
import type { ContentPageBlock, Page } from '@/payload-types'

export type LegalPageSlug = keyof typeof legalPagesBySlug

export type LegalPageView = {
  title: string
  description: string
  sections: { heading?: string; paragraphs: string[] }[]
  /** True when Next draft mode is on (admin live preview). */
  isDraft: boolean
}

async function getPageBySlug(slug: string, draft: boolean): Promise<Page | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      draft,
      overrideAccess: draft,
      where: draft
        ? { slug: { equals: slug } }
        : {
            and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
          },
      limit: 1,
      depth: 2,
      pagination: false,
    })
    return (result.docs[0] as Page | undefined) ?? null
  } catch {
    return null
  }
}

/** Blank lines separate paragraphs; single newlines (addresses) stay inside one paragraph. */
function paragraphsFromBody(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}

function sectionsFromPage(page: Page) {
  const block = page.layout?.find(
    (b): b is ContentPageBlock => b.blockType === 'contentPage',
  )
  if (!block?.sections?.length) return null

  const sections = visibleItems(block.sections)
  if (!sections.length) return null

  return sections.map((s) => ({
    heading: s.heading || undefined,
    paragraphs: paragraphsFromBody(s.body),
  }))
}

function sectionsFromFallback(content: LegalPageContent) {
  return content.sections.map((s) => ({
    heading: s.heading,
    paragraphs: paragraphsFromBody(s.body),
  }))
}

/** Load Privacy / Terms / Disclaimer from Admin → Pages, with Word-doc seed fallback. */
export async function getLegalPage(slug: LegalPageSlug): Promise<LegalPageView> {
  const fallback = legalPagesBySlug[slug]
  const { isEnabled: draft } = await draftMode()
  const page = await getPageBySlug(slug, draft)
  const fromCms = page ? sectionsFromPage(page) : null

  return {
    title: page?.title || fallback.title,
    description: page?.meta?.description || fallback.description,
    sections: fromCms ?? sectionsFromFallback(fallback),
    isDraft: draft,
  }
}
