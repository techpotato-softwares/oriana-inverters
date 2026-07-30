import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { revalidateCollection } from '../utilities/revalidateCollection'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  labels: { singular: 'Certification / Award', plural: 'Certifications & Awards' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'kind', 'year', 'updatedAt'],
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
          paths: ['/about/certifications'],
          tags: ['certifications'],
          context,
        })
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({
          paths: ['/about/certifications'],
          tags: ['certifications'],
          context,
        })
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Certification', value: 'certification' },
        { label: 'Award', value: 'award' },
      ],
    },
    { name: 'name', type: 'text', required: true },
    { name: 'scope', type: 'text', admin: { condition: (_, siblingData) => siblingData?.kind === 'certification' } },
    { name: 'region', type: 'text', admin: { condition: (_, siblingData) => siblingData?.kind === 'certification' } },
    { name: 'year', type: 'text', admin: { condition: (_, siblingData) => siblingData?.kind === 'award' } },
    { name: 'organization', type: 'text', admin: { condition: (_, siblingData) => siblingData?.kind === 'award' } },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
