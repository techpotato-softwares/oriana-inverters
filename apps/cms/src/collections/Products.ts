import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '../access/authenticated'
import { publishedOnly } from '../access/publishedOnly'
import { seoFields } from '../fields/seo'
import { defaultLexical } from '@/fields/defaultLexical'

function slugifyModel(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Product family',
    plural: 'Product families',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'powerRange', 'featured', '_status', 'updatedAt'],
    group: 'Catalogue',
    description:
      'One row = one datasheet family (series), e.g. ORI-(1…4)K-OG04P1-…. Capacity models live under Capacity variants — not as separate products.',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOnly,
    update: authenticated,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data) return data
        if (!data.modelSeries?.trim() && data.name?.trim()) {
          data.modelSeries = data.name.trim()
        }
        if (Array.isArray(data.capacityVariants)) {
          data.capacityVariants = data.capacityVariants.map(
            (variant: {
              modelNo?: string | null
              slug?: string | null
              powerRange?: string | null
              featured?: boolean | null
              id?: string | null
            }) => ({
              ...variant,
              slug:
                variant.slug?.trim() ||
                (variant.modelNo ? slugifyModel(variant.modelNo) : variant.slug),
            }),
          )
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, req: { payload, context } }) => {
        if (context.disableRevalidate) return doc

        const { revalidatePath, revalidateTag } = await import('next/cache')
        const { slugifySeries } = await import('@/utilities/series')

        const seriesPaths = (product: typeof doc | typeof previousDoc) => {
          if (!product) return [] as string[]
          const seriesName =
            product.modelSeries ||
            product.name ||
            product.keySpecs?.find(
              (s: { label?: string | null; value?: string | null }) =>
                s.label?.toLowerCase() === 'model series',
            )?.value
          const seriesSlug = seriesName ? slugifySeries(String(seriesName)) : null
          const variantSlugs =
            product.capacityVariants?.flatMap(
              (variant: { slug?: string | null } | null) =>
                variant?.slug ? [`/products/${variant.slug}`] : [],
            ) ?? []
          return [
            `/products/${product.slug}`,
            ...(seriesSlug ? [`/products/${seriesSlug}`] : []),
            ...variantSlugs,
          ]
        }

        if (doc._status === 'published') {
          payload.logger.info(`Revalidating product family: /products/${doc.slug}`)
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
                description:
                  'Datasheet family / productName, e.g. "ORI-(1/1.5/2/…/4)K-OG04P1-EU-CM1" or "ORIANA-BESS Home-(5-16)kWh".',
              },
            },
            slugField({ fieldToUse: 'name' }),
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              admin: {
                description: 'Category bucket (On Grid, Hybrid, Utility, BESS).',
              },
            },
            {
              name: 'modelSeries',
              type: 'text',
              admin: {
                description:
                  'Usually the same as Name. Auto-filled from Name on save if left empty. Used for public grouping.',
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
                description: 'Show this family in the Featured Models table on /products.',
              },
            },
          ],
        },
        {
          label: 'Capacity variants',
          fields: [
            {
              name: 'capacityVariants',
              type: 'array',
              labels: { singular: 'Capacity', plural: 'Capacity variants' },
              admin: {
                description:
                  'Individual kW / kWh models in this family. These appear in the capacity picker on the product page — they are not separate catalogue rows.',
              },
              fields: [
                {
                  name: 'modelNo',
                  type: 'text',
                  required: true,
                  admin: { description: 'Exact model number, e.g. ORI-4K-OG04P1-EU-CM1.' },
                },
                {
                  name: 'powerRange',
                  type: 'text',
                  required: true,
                  admin: { description: 'e.g. 4 kW or 5 kWh', width: '50%' },
                },
                {
                  name: 'slug',
                  type: 'text',
                  admin: {
                    description:
                      'URL slug for deep links. Auto-derived from model number on save if empty.',
                  },
                },
                {
                  name: 'featured',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    description: 'Prefer this capacity when the family is featured.',
                  },
                },
              ],
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
                  admin: {
                    description: 'Family capacity range, e.g. 1 kW to 4 kW',
                    width: '50%',
                  },
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
                description:
                  'Shared family specs (weight, dimensions, MPPT, etc.). Capacity-specific Model / Capacity rows are added from variants automatically.',
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
          label: 'Product Page',
          fields: [
            {
              name: 'productPage',
              type: 'group',
              admin: {
                description:
                  'Hero tiles and advantages for the public product detail page. Leave blank to use the built-in fallback for this model series.',
              },
              fields: [
                {
                  name: 'heroType',
                  type: 'text',
                  admin: {
                    description: 'Subtitle under the product name, e.g. "1-Phase Hybrid Inverter".',
                  },
                },
                {
                  name: 'featureLayout',
                  type: 'select',
                  defaultValue: 'quadrant',
                  options: [
                    { label: 'Quadrant cards', value: 'quadrant' },
                    { label: 'Icon list', value: 'list' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'maxPvInputVoltage',
                      type: 'text',
                      admin: { description: 'Hero tile 1 value', width: '25%' },
                    },
                    {
                      name: 'ratedAcOutputPower',
                      type: 'text',
                      admin: { description: 'Hero tile 2 value', width: '25%' },
                    },
                    {
                      name: 'ratedAcVoltage',
                      type: 'text',
                      admin: { description: 'Hero tile 3 value', width: '25%' },
                    },
                    {
                      name: 'maxEfficiency',
                      type: 'text',
                      admin: { description: 'Hero tile 4 value', width: '25%' },
                    },
                  ],
                },
                {
                  name: 'tileLabels',
                  type: 'group',
                  admin: {
                    description: 'Optional label overrides (BESS uses Battery Type, Capacity, etc.).',
                  },
                  fields: [
                    { name: 'maxPvInputVoltage', type: 'text' },
                    { name: 'ratedAcOutputPower', type: 'text' },
                    { name: 'ratedAcVoltage', type: 'text' },
                    { name: 'maxEfficiency', type: 'text' },
                  ],
                },
                {
                  name: 'featureGroups',
                  type: 'array',
                  labels: { singular: 'Feature group', plural: 'Feature groups' },
                  admin: {
                    description: 'Quadrant advantage cards (title + bullet list).',
                    condition: (_, siblingData) => siblingData?.featureLayout !== 'list',
                  },
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    {
                      name: 'items',
                      type: 'array',
                      labels: { singular: 'Bullet', plural: 'Bullets' },
                      fields: [{ name: 'text', type: 'textarea', required: true }],
                    },
                  ],
                },
                {
                  name: 'featureList',
                  type: 'array',
                  labels: { singular: 'Feature', plural: 'Feature list' },
                  admin: {
                    description: 'Icon list advantages (used when layout is Icon list).',
                    condition: (_, siblingData) => siblingData?.featureLayout === 'list',
                  },
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      required: true,
                      defaultValue: 'chart',
                      options: [
                        { label: 'Chart', value: 'chart' },
                        { label: 'Export', value: 'export' },
                        { label: 'Monitor', value: 'monitor' },
                        { label: 'Wave', value: 'wave' },
                        { label: 'PID', value: 'pid' },
                        { label: 'SPD', value: 'spd' },
                        { label: 'LV', value: 'lv' },
                      ],
                    },
                    { name: 'text', type: 'textarea', required: true },
                  ],
                },
              ],
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
