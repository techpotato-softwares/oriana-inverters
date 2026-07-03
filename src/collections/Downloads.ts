import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Downloads: CollectionConfig = {
  slug: 'downloads',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'documentType', 'updatedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [
      async ({ doc, req: { payload, context } }) => {
        if (context.disableRevalidate) return doc
        const { revalidatePath } = await import('next/cache')
        payload.logger.info('Revalidating downloads page')
        revalidatePath('/resources/downloads')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'documentType',
      type: 'select',
      required: true,
      options: [
        { label: 'Datasheet', value: 'datasheet' },
        { label: 'Manual', value: 'manual' },
        { label: 'Certificate', value: 'certificate' },
        { label: 'Warranty', value: 'warranty' },
        { label: 'Brochure', value: 'brochure' },
        { label: 'Software', value: 'software' },
      ],
    },
    {
      name: 'relatedProduct',
      type: 'relationship',
      relationTo: 'products',
    },
    {
      name: 'locale',
      type: 'text',
      defaultValue: 'en',
    },
  ],
}
