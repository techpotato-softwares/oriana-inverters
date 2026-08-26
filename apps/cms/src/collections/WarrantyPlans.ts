import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { publishedOnly } from '@/access/publishedOnly'

export const WarrantyPlans: CollectionConfig = {
  slug: 'warranty-plans',
  labels: { singular: 'Warranty plan', plural: 'Warranty plans' },
  admin: {
    group: 'Support',
    useAsTitle: 'productLine',
    defaultColumns: ['productLine', 'standard', 'extended', '_status'],
  },
  versions: { drafts: true },
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOnly,
    update: authenticated,
  },
  fields: [
    { name: 'productLine', type: 'text', required: true },
    { name: 'standard', type: 'text', required: true },
    { name: 'extended', type: 'text' },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
}
