import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '@/access/authenticated'
import { publishedOnly } from '@/access/publishedOnly'
import { seoFields } from '@/fields/seo'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case study', plural: 'Case studies' },
  admin: {
    group: 'Marketing',
    useAsTitle: 'title',
    defaultColumns: ['title', 'segment', 'year', '_status', 'updatedAt'],
  },
  versions: { drafts: true },
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOnly,
    update: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'segment', type: 'text', required: true },
    { name: 'capacity', type: 'text' },
    { name: 'products', type: 'text', admin: { description: 'Display string of product names.' } },
    {
      name: 'relatedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    { name: 'location', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
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
    { name: 'year', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    seoFields,
  ],
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        if (context.disableRevalidate) return doc
        void import('next/cache').then(({ revalidatePath, revalidateTag }) => {
          revalidateTag('case-studies')
          revalidatePath('/case-studies')
          if (doc?.slug) revalidatePath(`/case-studies/${doc.slug}`)
        })
        return doc
      },
    ],
  },
}
