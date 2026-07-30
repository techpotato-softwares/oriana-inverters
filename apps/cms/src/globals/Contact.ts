import type { GlobalConfig } from 'payload'

import { revalidateCollection } from '../utilities/revalidateCollection'
import { pageHeroFields, seoGroupField } from '../fields/pageHero'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({ paths: ['/contact'], tags: ['global_contact'], context })
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
          label: 'Contact Info',
          fields: [
            { name: 'sidebarTitle', type: 'text' },
            {
              name: 'contactItems',
              type: 'array',
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'mail | phone | map' } },
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Form',
          fields: [
            {
              name: 'form',
              type: 'group',
              fields: [
                { name: 'nameLabel', type: 'text' },
                { name: 'emailLabel', type: 'text' },
                { name: 'companyLabel', type: 'text' },
                { name: 'messageLabel', type: 'text' },
                { name: 'submitLabel', type: 'text' },
                { name: 'successTitle', type: 'text' },
                { name: 'successMessage', type: 'textarea' },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seoGroupField] },
      ],
    },
  ],
}
