import type { GlobalConfig } from 'payload'

import { revalidateCollection } from '../utilities/revalidateCollection'
import { ctaFields, pageHeroFields, seoGroupField } from '../fields/pageHero'

export const Warranty: GlobalConfig = {
  slug: 'warranty',
  label: 'Warranty Page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({
          paths: ['/support/warranty'],
          tags: ['global_warranty'],
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
          label: 'Tiers',
          fields: [
            { name: 'tiersTitle', type: 'text' },
            {
              name: 'tiers',
              type: 'array',
              fields: [
                { name: 'product', type: 'text', required: true },
                { name: 'standard', type: 'text', required: true },
                { name: 'extended', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Sections',
          fields: [
            {
              name: 'register',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'claim',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
            { name: 'primaryCta', type: 'group', fields: ctaFields },
            { name: 'secondaryCta', type: 'group', fields: ctaFields },
          ],
        },
        { label: 'SEO', fields: [seoGroupField] },
      ],
    },
  ],
}
