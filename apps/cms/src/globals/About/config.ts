import type { Field, GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import {
  cardList,
  optionalLink,
  pageMeta,
  revalidateGlobal,
  sectionIntro,
  subpageHero,
} from '@/fields/marketing'
import { pageHeroFields } from '@/fields/pageHero'
import { seoFields } from '@/fields/seo'

const emptyStateField: Field = {
  name: 'emptyDescription',
  type: 'textarea',
  label: 'Coming-soon message',
  admin: { description: 'Shown while there is nothing published for this page yet.' },
}

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Pages',
  admin: {
    group: 'Marketing',
    description: 'About us and its subpages. Leave a field blank to keep the built-in copy.',
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
          label: 'About us',
          description: '/about',
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
        {
          name: 'certifications',
          label: 'Certifications',
          description:
            '/about/certifications — the listings come from the Certifications and Awards collections.',
          fields: [
            subpageHero(),
            {
              type: 'row',
              fields: [
                { name: 'certificationsTitle', type: 'text' },
                { name: 'awardsTitle', type: 'text' },
              ],
            },
            emptyStateField,
            pageMeta(),
          ],
        },
        {
          name: 'partnersNetwork',
          label: 'Partners',
          description: '/about/partners — the partner names come from the Partners collection.',
          fields: [
            subpageHero(),
            optionalLink('programmeLink', 'Partner programmes link'),
            emptyStateField,
            optionalLink('emptyCta', 'Coming-soon button'),
            pageMeta(),
          ],
        },
        {
          name: 'foundation',
          label: 'Oriana Foundation',
          description:
            '/about/foundation — the page shows a coming-soon message until at least one programme is added.',
          fields: [
            subpageHero(),
            sectionIntro('intro', 'Intro'),
            cardList('programmes', { label: 'Programmes', image: true, link: true }),
            optionalLink('cta', 'Partner button'),
            emptyStateField,
            pageMeta(),
          ],
        },
        { label: 'SEO', fields: [seoFields] },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('about', ['/about'])],
  },
  versions: { drafts: true },
}
