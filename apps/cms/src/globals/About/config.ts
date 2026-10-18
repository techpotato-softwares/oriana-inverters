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
import { hiddenField, visibleArray } from '@/fields/visibility'

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
    description:
      'About us and its subpages. Leave a field blank to keep the built-in copy. To fill all tabs from site defaults: npm run seed:marketing-pages -- --pages=about --force',
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
          description: '/about — leave blank to keep the built-in page copy',
          fields: [
            pageHeroFields,
            {
              name: 'heroVideo',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero video',
              admin: {
                description:
                  'Optional MP4 for the full-bleed hero. Poster uses the hero image when set.',
              },
            },
            {
              name: 'heroPoster',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero video poster',
              admin: { description: 'Fallback poster if hero image is empty.' },
            },
            {
              name: 'storyTitle',
              type: 'text',
              label: 'Who we are — title',
              defaultValue: 'Built on Engineering. Driven by Energy.',
            },
            {
              name: 'storyParagraphs',
              type: 'array',
              label: 'Who we are — paragraphs',
              admin: {
                description:
                  'Replaces the Who we are section body. First paragraph also feeds the intro band.',
              },
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Highlight stats (optional)',
              admin: { description: 'Reserved for future use on the About hub.' },
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
            {
              name: 'values',
              type: 'array',
              label: 'Why ORIANA reasons',
              labels: { singular: 'Reason', plural: 'Reasons' },
              admin: {
                description: 'Replaces the Why ORIANA cards when at least one reason is saved.',
              },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          name: 'brandStory',
          label: 'Brand story',
          description: '/about/brand-story',
          fields: [
            subpageHero('hero', { image: true }),
            {
              name: 'originParagraphs',
              type: 'array',
              label: 'Origin paragraphs',
              admin: { description: 'Leave empty to keep the built-in origin story.' },
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
            pageMeta(),
          ],
        },
        {
          name: 'visionMission',
          label: 'Vision & Mission',
          description: '/about/vision-mission',
          fields: [
            subpageHero('hero', { image: true }),
            {
              name: 'visionStatement',
              type: 'textarea',
              label: 'Vision statement',
            },
            {
              name: 'missionStatement',
              type: 'textarea',
              label: 'Mission statement',
            },
            pageMeta(),
          ],
        },
        {
          name: 'achievements',
          label: 'Achievements',
          description: '/about/achievements',
          fields: [
            subpageHero('hero', { image: true }),
            {
              name: 'stats',
              type: 'array',
              label: 'Headline stats',
              admin: {
                description:
                  'Replaces the “By the numbers” cards when saved. Image stays on the built-in defaults.',
              },
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
            pageMeta(),
          ],
        },
        {
          name: 'leadership',
          label: 'Leadership',
          description:
            'Directors shown on /about (Leadership section) and /about/brand-story (Founded by). Leave the list empty to show the built-in directors.',
          fields: [
            hiddenField({
              description:
                'Hide the Leadership section on /about and the “Founded by” strip on /about/brand-story.',
            }),
            sectionIntro('intro', 'Section heading'),
            visibleArray({
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
            }),
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
    afterChange: [
      revalidateGlobal('about', [
        '/about',
        '/about/brand-story',
        '/about/vision-mission',
        '/about/achievements',
        '/about/certifications',
        '/about/partners',
        '/about/foundation',
      ]),
    ],
  },
  versions: { drafts: true },
}
