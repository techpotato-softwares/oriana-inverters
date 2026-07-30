import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { seoFields } from '../fields/seo'
import { revalidateCollection } from '../utilities/revalidateCollection'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
          paths: [`/solutions/${doc.slug}`],
          tags: ['solutions'],
          context,
        })
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({
          paths: [`/solutions/${doc.slug}`],
          tags: ['solutions'],
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
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Utility', value: 'utility' },
        { label: 'Storage', value: 'storage' },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'benefits',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'products',
      type: 'array',
      labels: { singular: 'Recommended Product', plural: 'Recommended Products' },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text', admin: { description: 'Fallback public path if no upload' } },
    seoFields,
  ],
}
