import type { GlobalConfig } from 'payload'

import { revalidateCollection } from '../utilities/revalidateCollection'
import { pageHeroFields, seoGroupField } from '../fields/pageHero'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({ paths: ['/about'], tags: ['global_about'], context })
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
          label: 'Story',
          fields: [
            {
              name: 'story',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                {
                  name: 'paragraphs',
                  type: 'array',
                  fields: [{ name: 'text', type: 'textarea', required: true }],
                },
              ],
            },
          ],
        },
        {
          label: 'Stats',
          fields: [
            {
              name: 'stats',
              type: 'array',
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Values',
          fields: [
            {
              name: 'values',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seoGroupField] },
      ],
    },
  ],
}
