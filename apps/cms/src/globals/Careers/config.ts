import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { pageHeroFields } from '@/fields/pageHero'
import { seoFields } from '@/fields/seo'

export const Careers: GlobalConfig = {
  slug: 'careers',
  label: 'Careers Page',
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
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'whyTitle',
              type: 'text',
              label: 'Life at Oriana title',
              defaultValue: 'Life at Oriana',
            },
            {
              name: 'whyBody',
              type: 'textarea',
              label: 'Life at Oriana body',
            },
            {
              name: 'openingsTitle',
              type: 'text',
              defaultValue: 'Open positions',
            },
            {
              name: 'applyHref',
              type: 'text',
              defaultValue: '/contact?intent=career#contact-form',
              admin: {
                description: 'Where Apply buttons send candidates. Prefer the contact form with intent=career.',
              },
            },
            {
              name: 'applyLabel',
              type: 'text',
              defaultValue: 'Apply',
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
          revalidateTag('careers')
          revalidatePath('/careers')
        })
        return doc
      },
    ],
  },
  versions: { drafts: true },
}
