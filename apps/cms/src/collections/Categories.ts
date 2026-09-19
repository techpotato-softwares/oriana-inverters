import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { defaultLexical } from '@/fields/defaultLexical'

function slugifySegmentName(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

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
      'Product families (e.g. On Grid Inverters). Category landing hero + intro: open a category → Hero image / Intro paragraphs. Mega-menu segment photos: Segments list. Then assign product families under Catalogue → Product families.',
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (Array.isArray(data.segments)) {
          data.segments = data.segments.map(
            (segment: { name?: string | null; slug?: string | null }) => ({
              ...segment,
              slug:
                segment.slug?.trim() ||
                (segment.name ? slugifySegmentName(segment.name) : segment.slug),
            }),
          )
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req: { payload, context } }) => {
        if (context.disableRevalidate) return doc
        const { revalidatePath, revalidateTag } = await import('next/cache')
        payload.logger.info(`Revalidating category: /products/category/${doc.slug}`)
        revalidatePath('/')
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
        revalidatePath('/')
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional category photo for cards. Segment tiles in the Products mega-menu use the Segments list below.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Full-bleed banner on /products/category/{slug} (On Grid, Hybrid, BESS, …). Leave empty to use the default category banner.',
      },
    },
    {
      name: 'introParagraphs',
      type: 'array',
      labels: {
        singular: 'Paragraph',
        plural: 'Intro paragraphs',
      },
      admin: {
        description:
          'Intro copy under the category title on the category landing page. Leave empty to use the built-in fallback copy.',
      },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'segments',
      type: 'array',
      labels: {
        singular: 'Segment',
        plural: 'Segments',
      },
      admin: {
        description:
          'Photos shown in the Products mega-menu for this category. Name must match the segment label (Single Phase, Three Phase, C&I, Utility Grid-Tied PV Inverter, ORIANA BESS Home, …).',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description:
              'Must match the mega-menu segment label, e.g. Single Phase, Three Phase, C&I.',
          },
        },
        {
          name: 'slug',
          type: 'text',
          admin: {
            description:
              'Optional. Auto-derived from name on save if left empty (single-phase, three-phase, c-and-i).',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Photo for this segment tile in the Products hover menu.',
          },
        },
      ],
    },
    {
      name: 'categoryIntroBody',
      type: 'richText',
      editor: defaultLexical,
      admin: {
        description:
          'Optional rich-text SEO body. Public category pages use Intro paragraphs above; this field is not shown on the site.',
      },
    },
  ],
}
