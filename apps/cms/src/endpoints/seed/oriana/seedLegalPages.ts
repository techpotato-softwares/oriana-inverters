import type { Payload } from 'payload'

import { legalPagesBySlug } from '@/endpoints/seed/oriana/legalPagesContent'

/** Upsert Privacy Policy, Terms of Use, and Disclaimer into Admin → Pages. */
export async function seedLegalPages(payload: Payload): Promise<void> {
  for (const [slug, page] of Object.entries(legalPagesBySlug)) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      overrideAccess: true,
    })

    const data = {
      title: page.title,
      slug,
      _status: 'published' as const,
      hero: { type: 'lowImpact' as const },
      layout: [
        {
          blockType: 'contentPage' as const,
          sections: page.sections.map((section) => ({
            heading: section.heading,
            body: section.body,
          })),
        },
      ],
      meta: {
        title: page.title,
        description: page.description,
      },
    }

    if (existing.docs[0]) {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
      payload.logger.info(`— Updated legal page: /${slug}`)
    } else {
      await payload.create({
        collection: 'pages',
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
      payload.logger.info(`— Created legal page: /${slug}`)
    }
  }
}
