import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { pageHeroFields } from '@/fields/pageHero'
import { seoFields } from '@/fields/seo'
import { simpleLinkFields } from '@/fields/simpleLink'

export const Sustainability: GlobalConfig = {
  slug: 'sustainability',
  label: 'Sustainability',
  admin: {
    group: 'Marketing',
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
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'highlights',
              type: 'array',
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
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
