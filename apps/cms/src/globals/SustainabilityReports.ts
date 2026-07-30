import type { GlobalConfig } from 'payload'

import { revalidateCollection } from '../utilities/revalidateCollection'
import { pageHeroFields, seoGroupField } from '../fields/pageHero'

export const SustainabilityReports: GlobalConfig = {
  slug: 'sustainability-reports',
  label: 'Sustainability Reports',
  admin: { group: 'Pages' },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({
          paths: ['/sustainability/reports'],
          tags: ['global_sustainability-reports'],
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
          label: 'Reports',
          fields: [
            {
              name: 'reports',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'year', type: 'text' },
                { name: 'size', type: 'text' },
                { name: 'href', type: 'text', defaultValue: '/resources/downloads' },
                { name: 'file', type: 'upload', relationTo: 'media' },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seoGroupField] },
      ],
    },
  ],
}
