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
          name: 'leadership',
          label: 'Leadership',
          description:
            'Directors shown on /about (Leadership section) and /about/brand-story (Founded by). Leave the list empty to show the built-in directors.',
          fields: [
            sectionIntro('intro', 'Section heading'),
            {
              name: 'members',
              type: 'array',
              label: 'Directors',
              labels: { singular: 'Director', plural: 'Directors' },
              admin: {
                description:
                  'Shown in this order. Once a director is added here, this list replaces the built-in one.',
                initCollapsed: false,
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
                    {
                      name: 'title',
                      type: 'text',
                      defaultValue: 'Co-Founder & Director',
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  name: 'bio',
                  type: 'textarea',
                  label: 'One-line description',
                  maxLength: 160,
                  admin: { description: 'One sentence, up to 160 characters.' },
                },
                {
                  name: 'linkedinUrl',
                  type: 'text',
                  label: 'LinkedIn URL',
                  admin: {
                    description: 'Full profile link, e.g. https://www.linkedin.com/in/name. Leave blank to hide the icon.',
                  },
                  validate: (value: string | null | undefined) => {
                    if (!value) return true
                    try {
                      const url = new URL(value)
                      if (url.protocol !== 'https:' || !url.hostname.endsWith('linkedin.com')) {
                        return 'Use a https://www.linkedin.com/… link.'
                      }
                      return true
                    } catch {
                      return 'Enter a full URL starting with https://'
                    }
                  },
                },
                {
                  name: 'photo',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Portrait, about 4:5, on a plain white or light background. Without a photo the built-in portrait (matched by name) or the initials are shown.',
                  },
                },
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
    afterChange: [revalidateGlobal('about', ['/about', '/about/brand-story'])],
  },
  versions: { drafts: true },
}
