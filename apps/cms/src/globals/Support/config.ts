import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { iconOrMediaFields } from '@/fields/iconOrMedia'
import { pageHeroFields } from '@/fields/pageHero'
import { seoFields } from '@/fields/seo'
import { simpleLinkFields } from '@/fields/simpleLink'

export const Support: GlobalConfig = {
  slug: 'support',
  label: 'Support Page',
  admin: {
    group: 'Support',
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
              name: 'channels',
              type: 'array',
              fields: [
                ...iconOrMediaFields,
                { name: 'title', type: 'text', required: true },
                { name: 'detail', type: 'text', required: true },
                { name: 'note', type: 'text' },
              ],
            },
            {
              name: 'selfServiceTitle',
              type: 'text',
              defaultValue: 'Self-service',
            },
            {
              name: 'selfServiceLinks',
              type: 'array',
              fields: simpleLinkFields,
            },
            {
              name: 'ticketCta',
              type: 'group',
              fields: [
                { name: 'title', type: 'text' },
                { name: 'body', type: 'textarea' },
                ...simpleLinkFields,
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
          revalidateTag('support')
          revalidatePath('/support')
        })
        return doc
      },
    ],
  },
  versions: { drafts: true },
}
