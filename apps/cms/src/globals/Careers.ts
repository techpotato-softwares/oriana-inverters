import type { GlobalConfig } from 'payload'

import { revalidateCollection } from '../utilities/revalidateCollection'
import { pageHeroFields, seoGroupField } from '../fields/pageHero'

export const Careers: GlobalConfig = {
  slug: 'careers',
  label: 'Careers Page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({ paths: ['/careers'], tags: ['global_careers'], context })
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
          label: 'Why Oriana',
          fields: [
            {
              name: 'why',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'imageUrl', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Openings',
          fields: [
            { name: 'openingsTitle', type: 'text' },
            { name: 'fallbackCtaLabel', type: 'text' },
            { name: 'fallbackCtaHref', type: 'text' },
          ],
        },
        { label: 'SEO', fields: [seoGroupField] },
      ],
    },
  ],
}
