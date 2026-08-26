import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { publishedOnly } from '@/access/publishedOnly'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: { singular: 'Partner', plural: 'Partners' },
  admin: {
    group: 'Marketing',
    useAsTitle: 'name',
    defaultColumns: ['name', 'group', '_status'],
  },
  versions: { drafts: true },
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOnly,
    update: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'group', type: 'text', required: true, admin: { description: 'e.g. Technology Partners' } },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'url', type: 'text' },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
}
