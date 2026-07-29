import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { seoFields } from '../fields/seo'
import { defaultLexical } from '@/fields/defaultLexical'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'featured', 'updatedAt'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req: { payload, context } }) => {
        if (context.disableRevalidate) return doc

        const { revalidatePath, revalidateTag } = await import('next/cache')

        if (doc._status === 'published') {
          payload.logger.info(`Revalidating product: /products/${doc.slug}`)
          revalidatePath(`/products/${doc.slug}`)
          revalidatePath('/products')
          revalidateTag('products')
        }

        if (previousDoc?._status === 'published' && doc._status !== 'published') {
          revalidatePath(`/products/${previousDoc.slug}`)
        }

        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req: { context } }) => {
        if (context.disableRevalidate) return doc
        const { revalidatePath, revalidateTag } = await import('next/cache')
        revalidatePath(`/products/${doc.slug}`)
        revalidatePath('/products')
        revalidateTag('products')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'segment',
      type: 'select',
      options: [
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial & Industrial', value: 'commercial' },
        { label: 'Utility-Scale', value: 'utility' },
        { label: 'Energy Storage', value: 'storage' },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
    },
    {
      name: 'fullDescription',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'powerRange',
      type: 'text',
      admin: { description: 'e.g. 3.8 – 11.4 kW' },
    },
    {
      name: 'efficiency',
      type: 'text',
      admin: { description: 'e.g. 98.7%' },
    },
    {
      name: 'phases',
      type: 'text',
      admin: { description: 'e.g. Single Phase' },
    },
    {
      name: 'warranty',
      type: 'text',
      admin: { description: 'e.g. 10 Years' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'keySpecs',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'unit', type: 'text' },
      ],
    },
    {
      name: 'datasheetPdf',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'manualPdf',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    seoFields,
  ],
  versions: {
    drafts: true,
  },
}
