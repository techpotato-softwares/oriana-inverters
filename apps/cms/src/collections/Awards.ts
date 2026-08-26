import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { publishedOnly } from '@/access/publishedOnly'

export const Awards: CollectionConfig = {
  slug: 'awards',
  labels: { singular: 'Award', plural: 'Awards' },
  admin: {
    group: 'Marketing',
    useAsTitle: 'title',
    defaultColumns: ['year', 'title', 'org', '_status'],
  },
  versions: { drafts: true },
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOnly,
    update: authenticated,
  },
  fields: [
    { name: 'year', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'org', type: 'text' },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
}
