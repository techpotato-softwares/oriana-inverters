import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { seoFields } from '../fields/seo'
import { revalidateCollection } from '../utilities/revalidateCollection'

export const ContentPages: CollectionConfig = {
  slug: 'content-pages',
  labels: { singular: 'Content Page', plural: 'Content Pages' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Pages',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        const pathMap: Record<string, string> = {
          privacy: '/privacy',
          terms: '/terms',
          disclaimer: '/disclaimer',
          security: '/support/security',
          strategy: '/sustainability/strategy',
        }
        const path = pathMap[doc.slug] || `/${doc.slug}`
        await revalidateCollection({
          paths: [path],
          tags: ['content-pages'],
          context,
        })
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({
          tags: ['content-pages'],
          context,
        })
        return doc
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'privacy | terms | disclaimer | security | strategy',
      },
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'breadcrumb',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      required: true,
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'paragraphs',
          type: 'array',
          required: true,
          fields: [{ name: 'text', type: 'textarea', required: true }],
        },
      ],
    },
    seoFields,
  ],
}
