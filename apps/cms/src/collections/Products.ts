import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { seoFields } from '../fields/seo'
import { defaultLexical } from '@/fields/defaultLexical'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'modelSeries', 'powerRange', 'featured', '_status', 'updatedAt'],
    group: 'Catalogue',
    description: 'Inverter models shown on the public product catalogue. Publish to appear on the website.',
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
        const { slugifySeries } = await import('@/utilities/series')

        const seriesPaths = (product: typeof doc | typeof previousDoc) => {
          if (!product) return [] as string[]
          const seriesName =
            product.modelSeries ||
            product.keySpecs?.find(
              (s: { label?: string | null; value?: string | null }) =>
                s.label?.toLowerCase() === 'model series',
            )?.value
          const seriesSlug = seriesName ? slugifySeries(String(seriesName)) : null
          return [
            `/products/${product.slug}`,
            ...(seriesSlug ? [`/products/${seriesSlug}`] : []),
          ]
        }

        if (doc._status === 'published') {
          payload.logger.info(`Revalidating product: /products/${doc.slug}`)
          for (const path of seriesPaths(doc)) revalidatePath(path)
          revalidatePath('/products')
          if (doc.category && typeof doc.category === 'object' && 'slug' in doc.category) {
            revalidatePath(`/products/category/${(doc.category as { slug: string }).slug}`)
          }
          revalidateTag('products')
          revalidateTag('categories')
        }

        if (previousDoc?._status === 'published' && doc._status !== 'published') {
          for (const path of seriesPaths(previousDoc)) revalidatePath(path)
          revalidatePath('/products')
          revalidateTag('products')
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
        revalidateTag('categories')
        return doc
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Website label (Excel col J), e.g. "5kW OG6-GR1P5K-S(21A)".',
              },
            },
            slugField({ fieldToUse: 'name' }),
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              admin: {
                description: 'Product family / category. Create categories first under Catalogue → Categories.',
              },
            },
            {
              name: 'modelSeries',
              type: 'text',
              admin: {
                description: 'Datasheet model series (e.g. OG6-GR1P(2-3)K01-NV-YD). Used to group models on category pages.',
              },
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
              admin: {
                description: 'Primary market segment for filtering and solutions pages.',
              },
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              admin: {
                description: 'Short summary shown on the product detail page.',
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Show in the Featured Models table on /products.',
              },
            },
          ],
        },
        {
          label: 'Specs',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'powerRange',
                  type: 'text',
                  admin: { description: 'e.g. 5 kW or 3.8 – 11.4 kW', width: '50%' },
                },
                {
                  name: 'efficiency',
                  type: 'text',
                  admin: { description: 'e.g. 98.7%', width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'phases',
                  type: 'text',
                  admin: { description: 'e.g. Single Phase / Three Phase', width: '50%' },
                },
                {
                  name: 'warranty',
                  type: 'text',
                  admin: { description: 'e.g. 10 Years', width: '50%' },
                },
              ],
            },
            {
              name: 'keySpecs',
              type: 'array',
              labels: { singular: 'Spec', plural: 'Key Specs' },
              admin: {
                description: 'Additional rows on the product detail specs table (weight, dimensions, MPPT, etc.).',
              },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
                { name: 'unit', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Media & Docs',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Main product image on the detail page.' },
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
              name: 'datasheetPdf',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Product datasheet PDF.' },
            },
            {
              name: 'manualPdf',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'User / installation manual PDF.' },
            },
          ],
        },
        {
          label: 'Content & SEO',
          fields: [
            {
              name: 'fullDescription',
              type: 'richText',
              editor: defaultLexical,
              admin: {
                description: 'Long-form product content (optional).',
              },
            },
            seoFields,
          ],
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
}
