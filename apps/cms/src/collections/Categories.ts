import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { defaultLexical } from '@/fields/defaultLexical'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'sortOrder', 'updatedAt'],
    group: 'Catalogue',
    description:
      'Product families (e.g. Residential Grid-Tied). Create these first, then assign products to them.',
  },
  hooks: {
    afterChange: [
      async ({ doc, req: { payload, context } }) => {
        if (context.disableRevalidate) return doc
        const { revalidatePath, revalidateTag } = await import('next/cache')
        payload.logger.info(`Revalidating category: /products/category/${doc.slug}`)
        revalidatePath(`/products/category/${doc.slug}`)
        revalidatePath('/products')
        revalidateTag('categories')
        revalidateTag('products')
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req: { context } }) => {
        if (context.disableRevalidate) return doc
        const { revalidatePath, revalidateTag } = await import('next/cache')
        revalidatePath(`/products/category/${doc.slug}`)
        revalidatePath('/products')
        revalidateTag('categories')
        revalidateTag('products')
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Category / product-family name shown in nav and on /products.',
      },
    },
    slugField({
      fieldToUse: 'title',
      position: undefined,
    }),
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      admin: {
        description: 'Lower numbers appear first in the Products menu and catalogue grid.',
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short description for category cards and mega-menu.',
      },
    },
    {
      name: 'categoryIntroBody',
      type: 'richText',
      editor: defaultLexical,
      admin: {
        description: 'Optional longer intro copy for the category landing page (SEO).',
      },
    },
  ],
}
