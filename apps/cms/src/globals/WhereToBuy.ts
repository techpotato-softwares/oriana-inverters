import type { GlobalConfig } from 'payload'

import { revalidateCollection } from '../utilities/revalidateCollection'
import { pageHeroFields, seoGroupField } from '../fields/pageHero'

/** Slimmer Where to Buy — page-specific heroes live in PageIntros */
export const WhereToBuy: GlobalConfig = {
  slug: 'where-to-buy',
  label: 'Where to Buy Page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({
          paths: ['/where-to-buy'],
          tags: ['global_where-to-buy'],
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
          label: 'Become Distributor',
          fields: [
            {
              name: 'becomeDistributor',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'cta',
                  type: 'group',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seoGroupField] },
      ],
    },
  ],
}
