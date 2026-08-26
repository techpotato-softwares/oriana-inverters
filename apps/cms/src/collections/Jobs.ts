import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { publishedOnly } from '@/access/publishedOnly'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: { singular: 'Job opening', plural: 'Job openings' },
  admin: {
    group: 'Marketing',
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'department', 'type', '_status'],
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
    { name: 'location', type: 'text', required: true },
    { name: 'department', type: 'text' },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Full-time', value: 'Full-time' },
        { label: 'Part-time', value: 'Part-time' },
        { label: 'Contract', value: 'Contract' },
        { label: 'Internship', value: 'Internship' },
      ],
      defaultValue: 'Full-time',
    },
    { name: 'description', type: 'textarea' },
    { name: 'applyUrl', type: 'text' },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        if (context.disableRevalidate) return doc
        void import('next/cache').then(({ revalidatePath, revalidateTag }) => {
          revalidateTag('jobs')
          revalidatePath('/careers')
        })
        return doc
      },
    ],
  },
}
