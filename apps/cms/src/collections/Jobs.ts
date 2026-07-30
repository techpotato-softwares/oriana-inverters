import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateCollection } from '../utilities/revalidateCollection'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: { singular: 'Job Opening', plural: 'Job Openings' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'department', 'updatedAt'],
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
          paths: ['/careers'],
          tags: ['jobs'],
          context,
        })
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({
          paths: ['/careers'],
          tags: ['jobs'],
          context,
        })
        return doc
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'location', type: 'text', required: true },
    { name: 'department', type: 'text', required: true },
    {
      name: 'type',
      type: 'text',
      required: true,
      defaultValue: 'Full-time',
    },
    { name: 'applyUrl', type: 'text', defaultValue: '/contact' },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
