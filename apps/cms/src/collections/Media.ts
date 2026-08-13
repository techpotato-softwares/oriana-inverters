import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Assets',
    description: 'Images, videos, and documents used across the site.',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'mediaType',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Document', value: 'document' },
      ],
      defaultValue: 'image',
    },
    {
      name: 'videoResolution',
      type: 'select',
      options: [
        { label: '1080p', value: '1080p' },
        { label: '4K (2160p)', value: '4k' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'video',
      },
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      type: 'collapsible',
      label: 'Homepage hero',
      admin: {
        description:
          'Use this image as a homepage hero slide, with a link to a product or blog post.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'useAsHomeHero',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show on homepage hero',
        },
        {
          name: 'homeHeroLinkType',
          type: 'select',
          options: [
            { label: 'Product', value: 'product' },
            { label: 'Blog post', value: 'post' },
          ],
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.useAsHomeHero),
            description: 'Where the hero image should take visitors.',
          },
        },
        {
          name: 'homeHeroProduct',
          type: 'relationship',
          relationTo: 'products',
          admin: {
            condition: (_, siblingData) =>
              Boolean(siblingData?.useAsHomeHero) && siblingData?.homeHeroLinkType === 'product',
          },
        },
        {
          name: 'homeHeroPost',
          type: 'relationship',
          relationTo: 'posts',
          admin: {
            condition: (_, siblingData) =>
              Boolean(siblingData?.useAsHomeHero) && siblingData?.homeHeroLinkType === 'post',
          },
        },
        {
          name: 'homeHeroHeadline',
          type: 'text',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.useAsHomeHero),
            description: 'Optional overlay title. Defaults to the product or post name.',
          },
        },
        {
          name: 'homeHeroCta',
          type: 'text',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.useAsHomeHero),
            description: 'Optional button label. Defaults to “View product” or “Read article”.',
          },
        },
        {
          name: 'homeHeroSort',
          type: 'number',
          defaultValue: 0,
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.useAsHomeHero),
            description: 'Lower numbers appear first when several hero images are enabled.',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        if (context.disableRevalidate) return doc
        const { revalidatePath, revalidateTag } = await import('next/cache')
        revalidateTag('home-hero')
        revalidatePath('/')
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req: { context } }) => {
        if (context.disableRevalidate) return doc
        const { revalidatePath, revalidateTag } = await import('next/cache')
        revalidateTag('home-hero')
        revalidatePath('/')
        return doc
      },
    ],
  },
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    mimeTypes: ['image/*', 'video/mp4', 'video/webm', 'video/quicktime', 'application/pdf'],
    filesRequiredOnCreate: false,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
      {
        name: '4k',
        width: 3840,
        withoutEnlargement: true,
      },
    ],
  },
}
