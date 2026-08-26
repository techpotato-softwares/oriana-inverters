import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { publishedOnly } from '@/access/publishedOnly'

export const SustainabilityReports: CollectionConfig = {
  slug: 'sustainability-reports',
  labels: { singular: 'Sustainability report', plural: 'Sustainability reports' },
  admin: {
    group: 'Marketing',
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', '_status'],
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
    { name: 'year', type: 'text', required: true },
    { name: 'file', type: 'upload', relationTo: 'media' },
    { name: 'externalUrl', type: 'text', admin: { description: 'Optional link if file is hosted elsewhere.' } },
    { name: 'size', type: 'text' },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
}
