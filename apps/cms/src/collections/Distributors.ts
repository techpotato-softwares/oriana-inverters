import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateCollection } from '../utilities/revalidateCollection'

export const Distributors: CollectionConfig = {
  slug: 'distributors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'city', 'country', 'updatedAt'],
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
          paths: ['/where-to-buy'],
          tags: ['distributors'],
          context,
        })
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({
          paths: ['/where-to-buy'],
          tags: ['distributors'],
          context,
        })
        return doc
      },
    ],
  },
  fields: [
    { name: 'externalId', type: 'text', unique: true, index: true, admin: { description: 'Stable id for seeding' } },
    { name: 'name', type: 'text', required: true },
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
}
