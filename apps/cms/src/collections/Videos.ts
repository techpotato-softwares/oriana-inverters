import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { publishedOnly } from '@/access/publishedOnly'

export const Videos: CollectionConfig = {
  slug: 'videos',
  labels: { singular: 'Video', plural: 'Videos' },
  admin: {
    group: 'Support',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'duration', '_status'],
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
    { name: 'category', type: 'text' },
    { name: 'duration', type: 'text' },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    { name: 'embedUrl', type: 'text', admin: { description: 'YouTube/Vimeo embed or watch URL.' } },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        if (context.disableRevalidate) return doc
        void import('next/cache').then(({ revalidatePath, revalidateTag }) => {
          revalidateTag('videos')
          revalidatePath('/resources/videos')
        })
        return doc
      },
    ],
  },
}
