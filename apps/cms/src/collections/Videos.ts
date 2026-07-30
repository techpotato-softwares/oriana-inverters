import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateCollection } from '../utilities/revalidateCollection'

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'duration', 'updatedAt'],
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
          paths: ['/resources/videos'],
          tags: ['videos'],
          context,
        })
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({
          paths: ['/resources/videos'],
          tags: ['videos'],
          context,
        })
        return doc
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'category', type: 'text', required: true },
    { name: 'duration', type: 'text', admin: { description: 'e.g. 8:42' } },
    { name: 'videoUrl', type: 'text', admin: { description: 'External video URL (YouTube, Vimeo, etc.)' } },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
