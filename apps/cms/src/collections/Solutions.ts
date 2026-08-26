import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '@/access/authenticated'
import { publishedOnly } from '@/access/publishedOnly'
import { ctaPairFields } from '@/fields/ctaLink'
import { seoFields } from '@/fields/seo'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  labels: { singular: 'Solution', plural: 'Solutions' },
  admin: {
    group: 'Marketing',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
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
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'benefits',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'segmentKeys',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Utility', value: 'utility' },
        { label: 'Storage', value: 'storage' },
      ],
      admin: { description: 'Used to recommend catalogue products.' },
    },
    ...ctaPairFields,
    seoFields,
  ],
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        if (context.disableRevalidate) return doc
        void import('next/cache').then(({ revalidatePath, revalidateTag }) => {
          revalidateTag('solutions')
          if (doc?.slug) revalidatePath(`/solutions/${doc.slug}`)
        })
        return doc
      },
    ],
  },
}
