import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { pageHeroFields } from '@/fields/pageHero'
import { seoFields } from '@/fields/seo'
import { sectionHiddenField } from '@/fields/visibility'

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
            sectionHiddenField({ name: 'lifeHidden', label: 'Hide “Life at Oriana” intro' }),
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
            sectionHiddenField({ name: 'openingsHidden', label: 'Hide open positions section' }),
            {
              name: 'openingsTitle',
              type: 'text',
              defaultValue: 'Open positions',
            },
            {
              name: 'applyHref',
              type: 'text',
              defaultValue: '/careers#apply',
              admin: {
                description: 'Where Apply buttons send candidates. Prefer #apply on this page.',
              },
            },
            {
              name: 'applyLabel',
              type: 'text',
              defaultValue: 'Apply',
            },
            {
              name: 'workplaceTitle',
              type: 'text',
              label: 'Workplace section title',
              admin: { description: 'Leave blank to keep the built-in title.' },
            },
            {
              name: 'workplaceLead',
              type: 'textarea',
              label: 'Workplace lead line',
            },
            {
              name: 'workplaceClosing',
              type: 'textarea',
              label: 'Workplace closing paragraph',
            },
            {
              name: 'valuesTitle',
              type: 'text',
              label: 'Values scroller title',
            },
            {
              name: 'cultureTitle',
              type: 'text',
              label: 'Culture section title',
            },
            {
              name: 'cultureBody',
              type: 'textarea',
              label: 'Culture body',
            },
            {
              name: 'ctaTitle',
              type: 'text',
              label: 'Bottom CTA title',
            },
            {
              name: 'ctaBody',
              type: 'textarea',
              label: 'Bottom CTA body',
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
