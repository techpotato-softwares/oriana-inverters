import type { GlobalConfig } from 'payload'

import { revalidateCollection } from '../utilities/revalidateCollection'
import { ctaFields, pageHeroFields, seoGroupField } from '../fields/pageHero'

export const Support: GlobalConfig = {
  slug: 'support',
  label: 'Support Page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({ paths: ['/support'], tags: ['global_support'], context })
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
          label: 'Channels',
          fields: [
            {
              name: 'channels',
              type: 'array',
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'phone | mail | headphones | map' } },
                { name: 'title', type: 'text', required: true },
                { name: 'detail', type: 'text', required: true },
                { name: 'note', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Resources',
          fields: [
            { name: 'resourcesTitle', type: 'text' },
            {
              name: 'resourceLinks',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Ticket CTA',
          fields: [
            {
              name: 'ticketCta',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'cta', type: 'group', fields: ctaFields },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seoGroupField] },
      ],
    },
  ],
}
