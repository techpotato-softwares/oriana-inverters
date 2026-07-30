import type { GlobalConfig } from 'payload'

import { revalidateCollection } from '../utilities/revalidateCollection'
import { ctaFields, pageHeroFields, seoGroupField } from '../fields/pageHero'

export const PageIntros: GlobalConfig = {
  slug: 'page-intros',
  label: 'Page Intros',
  admin: { group: 'Pages' },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({
          paths: [
            '/resources/faqs',
            '/resources/videos',
            '/about/certifications',
            '/about/partners',
            '/case-studies',
            '/products',
          ],
          tags: ['global_page-intros'],
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
          label: 'FAQs',
          fields: [
            {
              name: 'faqs',
              type: 'group',
              fields: [
                ...pageHeroFields,
                { name: 'ctaPrompt', type: 'text' },
                { name: 'ctaLabel', type: 'text' },
                { name: 'ctaHref', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Videos',
          fields: [
            {
              name: 'videos',
              type: 'group',
              fields: [...pageHeroFields, { name: 'footerNote', type: 'textarea' }],
            },
          ],
        },
        {
          label: 'Certifications',
          fields: [
            {
              name: 'certifications',
              type: 'group',
              fields: [
                ...pageHeroFields,
                { name: 'certsHeading', type: 'text' },
                { name: 'awardsHeading', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Partners',
          fields: [
            {
              name: 'partners',
              type: 'group',
              fields: [
                ...pageHeroFields,
                {
                  name: 'cta',
                  type: 'group',
                  fields: [
                    { name: 'title', type: 'text' },
                    { name: 'description', type: 'textarea' },
                    { name: 'primaryCta', type: 'group', fields: ctaFields },
                    { name: 'secondaryCta', type: 'group', fields: ctaFields },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Case Studies',
          fields: [
            {
              name: 'caseStudies',
              type: 'group',
              fields: pageHeroFields,
            },
          ],
        },
        {
          label: 'Products',
          fields: [
            {
              name: 'products',
              type: 'group',
              fields: pageHeroFields,
            },
          ],
        },
        { label: 'SEO defaults', fields: [seoGroupField] },
      ],
    },
  ],
}
