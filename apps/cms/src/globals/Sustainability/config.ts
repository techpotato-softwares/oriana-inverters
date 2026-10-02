import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { pageHeroFields } from '@/fields/pageHero'
import { seoFields } from '@/fields/seo'
import { simpleLinkFields } from '@/fields/simpleLink'

const pillarIconOptions = [
  { label: 'Shield (longevity)', value: 'shield-check' },
  { label: 'Chip (efficiency)', value: 'cpu' },
  { label: 'Factory (manufacturing)', value: 'factory' },
  { label: 'Boxes (packaging)', value: 'boxes' },
  { label: 'People (community)', value: 'users' },
  { label: 'Map pin (local)', value: 'map-pin' },
  { label: 'Recycle (circularity)', value: 'recycle' },
  { label: 'Refresh (lifecycle)', value: 'refresh-cw' },
  { label: 'Leaf', value: 'leaf' },
  { label: 'Sun', value: 'sun' },
]

export const Sustainability: GlobalConfig = {
  slug: 'sustainability',
  label: 'Sustainability',
  admin: {
    group: 'Marketing',
    description:
      'Sustainability overview page: hero video, impact numbers, pillars, carbon estimator, commitments, and CTA. Empty fields fall back to default copy and stock media.',
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hub',
          fields: [
            pageHeroFields,
            {
              name: 'heroVideo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Background video for the hero (MP4). If empty, a stock solar video is used.',
              },
              filterOptions: {
                mimeType: { contains: 'video' },
              },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Hero poster image, shown while the video loads.',
              },
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            {
              name: 'highlights',
              type: 'array',
              labels: { singular: 'Impact number', plural: 'Impact numbers' },
              admin: {
                description: 'Big numbers shown directly below the hero (3 recommended).',
              },
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
                { name: 'description', type: 'text' },
              ],
            },
            {
              name: 'approachTitle',
              type: 'text',
            },
            {
              name: 'approachBody',
              type: 'textarea',
            },
            {
              name: 'links',
              type: 'array',
              fields: simpleLinkFields,
            },
          ],
        },
        {
          label: 'Pillars',
          fields: [
            {
              name: 'pillarsIntro',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'pillars',
              type: 'array',
              labels: { singular: 'Pillar', plural: 'Pillars' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'headline', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                {
                  name: 'icon',
                  type: 'select',
                  options: pillarIconOptions,
                  defaultValue: 'leaf',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Estimator',
          fields: [
            {
              name: 'calculator',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'kwhPerKw',
                  type: 'number',
                  admin: { description: 'Annual kWh generated per kW installed. Default 1450.' },
                },
                {
                  name: 'co2TonnesPerKw',
                  type: 'number',
                  admin: { description: 'Tonnes of CO2 displaced per kW per year. Default 1.2.' },
                },
                {
                  name: 'treesPerKw',
                  type: 'number',
                  admin: { description: 'Equivalent trees planted per kW. Default 15.' },
                },
                { name: 'disclaimer', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Commitments',
          fields: [
            {
              name: 'commitmentsIntro',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'commitments',
              type: 'array',
              labels: { singular: 'Commitment', plural: 'Commitments' },
              fields: [
                { name: 'phase', type: 'text', required: true },
                { name: 'timeframe', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'CTA',
          fields: [
            {
              name: 'cta',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'body', type: 'textarea' },
                {
                  name: 'primary',
                  type: 'group',
                  fields: [
                    { name: 'label', type: 'text' },
                    { name: 'href', type: 'text' },
                  ],
                },
                {
                  name: 'secondary',
                  type: 'group',
                  fields: [
                    { name: 'label', type: 'text' },
                    { name: 'href', type: 'text' },
                  ],
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                },
                {
                  name: 'contactEmail',
                  type: 'email',
                  admin: { description: 'ESG contact email shown under the banner.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Strategy',
          fields: [
            {
              name: 'strategyHero',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'strategySections',
              type: 'array',
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seoFields] },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        if (context.disableRevalidate) return doc
        void import('next/cache').then(({ revalidatePath, revalidateTag }) => {
          revalidateTag('sustainability')
          revalidatePath('/sustainability')
          revalidatePath('/sustainability/strategy')
        })
        return doc
      },
    ],
  },
  versions: { drafts: true },
}
