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
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Assets',
    description: 'Images, videos, and documents. Organize with folders (Hero, Products, Icons, …).',
    defaultColumns: ['filename', 'alt', 'mediaType', 'updatedAt'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Required for accessibility and SEO.' },
    },
    {
      name: 'mediaType',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Document', value: 'document' },
        { label: 'Icon', value: 'icon' },
      ],
      defaultValue: 'image',
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'array',
      labels: { singular: 'Tag', plural: 'Tags' },
      admin: {
        description: 'Optional labels for filtering (e.g. hero, product, partner).',
      },
      fields: [{ name: 'tag', type: 'text', required: true }],
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
  ],
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        if (context.disableRevalidate) return doc
        const { revalidatePath, revalidateTag } = await import('next/cache')
        revalidateTag('home')
        revalidateTag('home-hero')
        revalidatePath('/')
        return doc
      },
    ],
    afterDelete: [
      async ({ doc, req: { context } }) => {
        if (context.disableRevalidate) return doc
        const { revalidatePath, revalidateTag } = await import('next/cache')
        revalidateTag('home')
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
