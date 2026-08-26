import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { publishedOnly } from '@/access/publishedOnly'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  labels: { singular: 'Certification', plural: 'Certifications' },
  admin: {
    group: 'Marketing',
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', '_status'],
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
    { name: 'scope', type: 'text' },
    { name: 'region', type: 'text' },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
  ],
}
