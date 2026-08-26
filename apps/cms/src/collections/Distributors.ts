import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '@/access/authenticated'
import { publishedOnly } from '@/access/publishedOnly'

export const Distributors: CollectionConfig = {
  slug: 'distributors',
  labels: { singular: 'Distributor', plural: 'Distributors' },
  admin: {
    group: 'Marketing',
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'city', 'region', '_status'],
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
    slugField(),
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Distributor', value: 'Distributor' },
        { label: 'Certified Installer', value: 'Certified Installer' },
        { label: 'Service Center', value: 'Service Center' },
      ],
    },
    { name: 'city', type: 'text', required: true },
    { name: 'state', type: 'text' },
    { name: 'country', type: 'text', required: true },
    { name: 'region', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
  ],
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        if (context.disableRevalidate) return doc
        void import('next/cache').then(({ revalidatePath, revalidateTag }) => {
          revalidateTag('distributors')
          revalidatePath('/where-to-buy')
        })
        return doc
      },
    ],
  },
}
