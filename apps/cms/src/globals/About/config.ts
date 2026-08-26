import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { pageHeroFields } from '@/fields/pageHero'
import { seoFields } from '@/fields/seo'

const revalidateAbout = ({ doc, req: { context } }: { doc: unknown; req: { context: { disableRevalidate?: boolean } } }) => {
  if (context.disableRevalidate) return doc
  void import('next/cache').then(({ revalidatePath, revalidateTag }) => {
    revalidateTag('about')
    revalidatePath('/about')
  })
  return doc
}

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  admin: {
    group: 'Marketing',
    description: 'Company about page content.',
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
              name: 'storyTitle',
              type: 'text',
              defaultValue: 'Our Story',
            },
            {
              name: 'storyParagraphs',
              type: 'array',
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
            {
              name: 'stats',
              type: 'array',
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
            {
              name: 'values',
              type: 'array',
              labels: { singular: 'Value', plural: 'Values' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seoFields] },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAbout],
  },
  versions: { drafts: true },
}
