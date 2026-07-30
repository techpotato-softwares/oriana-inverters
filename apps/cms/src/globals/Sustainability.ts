import type { GlobalConfig } from 'payload'

import { revalidateCollection } from '../utilities/revalidateCollection'
import { ctaFields, pageHeroFields, seoGroupField } from '../fields/pageHero'

export const Sustainability: GlobalConfig = {
  slug: 'sustainability',
  label: 'Sustainability Page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({
          paths: ['/sustainability'],
          tags: ['global_sustainability'],
          context,
        })
        return doc
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [{ name: 'hero', type: 'group', fields: pageHeroFields }],
        },
        {
          label: 'Highlights',
          fields: [
            {
              name: 'highlights',
              type: 'array',
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Approach',
          fields: [
            {
              name: 'approach',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'imageUrl', type: 'text' },
                { name: 'primaryCta', type: 'group', fields: ctaFields },
                { name: 'secondaryCta', type: 'group', fields: ctaFields },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seoGroupField] },
      ],
    },
  ],
}
