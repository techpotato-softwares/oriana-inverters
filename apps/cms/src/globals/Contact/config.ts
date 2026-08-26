import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { iconOrMediaFields } from '@/fields/iconOrMedia'
import { pageHeroFields } from '@/fields/pageHero'
import { seoFields } from '@/fields/seo'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Page',
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
          label: 'Content',
          fields: [
            pageHeroFields,
            {
              name: 'cards',
              type: 'array',
              fields: [
                ...iconOrMediaFields,
                { name: 'title', type: 'text', required: true },
                { name: 'detail', type: 'textarea', required: true },
              ],
            },
            {
              name: 'form',
              type: 'relationship',
              relationTo: 'forms',
              admin: {
                description: 'Payload Form Builder form used on the contact page.',
              },
            },
            {
              name: 'successMessage',
              type: 'text',
              defaultValue: 'Thanks — we will get back to you shortly.',
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
          revalidateTag('contact')
          revalidatePath('/contact')
        })
        return doc
      },
    ],
  },
  versions: { drafts: true },
}
