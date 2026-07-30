import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { seoFields } from '../fields/seo'
import { revalidateCollection } from '../utilities/revalidateCollection'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case Study', plural: 'Case Studies' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'segment', 'year', 'updatedAt'],
    group: 'Content',
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
        await revalidateCollection({
          paths: ['/case-studies', `/case-studies/${doc.slug}`, '/'],
          tags: ['case-studies'],
          context,
        })
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({
          paths: ['/case-studies', `/case-studies/${doc.slug}`, '/'],
          tags: ['case-studies'],
          context,
        })
        return doc
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'segment', type: 'text', required: true },
    { name: 'capacity', type: 'text' },
    { name: 'products', type: 'text', admin: { description: 'Display label for products used' } },
    {
      name: 'productSlugs',
      type: 'array',
      fields: [{ name: 'slug', type: 'text', required: true }],
    },
    { name: 'location', type: 'text' },
    { name: 'year', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text', admin: { description: 'Fallback public path if no upload' } },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'challenge', type: 'textarea' },
    { name: 'solution', type: 'textarea' },
    {
      name: 'results',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    seoFields,
  ],
}
