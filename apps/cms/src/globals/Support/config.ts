import type { Field, GlobalConfig, Tab } from 'payload'

import { authenticated } from '@/access/authenticated'
import {
  cardList,
  iconSelect,
  optionalLink,
  pageMeta,
  revalidateGlobal,
  sectionIntro,
  subpageHero,
} from '@/fields/marketing'
import { seoFields } from '@/fields/seo'

const audienceTab = (name: string, label: string, path: string): Tab => ({
  name,
  label,
  description: path,
  fields: [
    subpageHero(),
    cardList('cards', { label: 'Resource cards', link: true }),
    { name: 'faqTitle', type: 'text' },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      admin: { description: 'Leave empty to keep the default questions.' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    optionalLink('faqLink', 'All FAQs button'),
    pageMeta(),
  ],
})

const statFields: Field[] = [
  {
    type: 'row',
    fields: [
      { name: 'value', type: 'text', required: true, admin: { width: '30%' } },
      { name: 'label', type: 'text', required: true, admin: { width: '70%' } },
    ],
  },
]

export const Support: GlobalConfig = {
  slug: 'support',
  label: 'Support Pages',
  admin: {
    group: 'Support',
    description:
      'Content for /support and its subpages. Any field left blank shows the current default copy.',
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
          name: 'hub',
          label: 'Support hub',
          description: '/support — hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              admin: { description: 'Leave blank to keep the default copy.' },
              fields: [
                { name: 'eyebrow', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'title', type: 'text', admin: { width: '50%' } },
                    {
                      name: 'highlight',
                      type: 'text',
                      admin: { width: '50%', description: 'Second headline line, shown in sky blue.' },
                    },
                  ],
                },
                { name: 'description', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
                optionalLink('primary', 'Primary button'),
                optionalLink('secondary', 'Secondary button'),
                { name: 'quickLinksLabel', type: 'text' },
                {
                  name: 'quickLinks',
                  type: 'array',
                  admin: { description: 'Leave empty to keep the default quick links.' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'label', type: 'text', required: true },
                        { name: 'href', type: 'text', required: true },
                        iconSelect(),
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'strengths',
          label: 'Strengths',
          description: '/support — mosaic of capabilities',
          fields: [sectionIntro('intro'), cardList('items', { label: 'Capabilities', image: true })],
        },
        {
          name: 'approach',
          label: 'Approach',
          description: '/support — four-step service sequence',
          fields: [
            sectionIntro('intro'),
            optionalLink('cta', 'Button'),
            cardList('steps', { label: 'Steps', image: true }),
          ],
        },
        {
          name: 'presence',
          label: 'Global presence',
          description: '/support — network stats and map',
          fields: [
            sectionIntro('intro'),
            {
              name: 'stats',
              type: 'array',
              admin: { description: 'Leave empty to keep the default stats.' },
              fields: statFields,
            },
            optionalLink('cta', 'Button'),
            { name: 'coverageLabel', type: 'text' },
            { name: 'coverageBody', type: 'textarea' },
            {
              name: 'locations',
              type: 'array',
              admin: {
                description:
                  'Map pins. Position is a percentage from the top and left of the map panel, e.g. 22% / 38%.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'top', type: 'text', required: true },
                    { name: 'left', type: 'text', required: true },
                  ],
                },
              ],
            },
            cardList('pillars', { label: 'Service pillars', icon: true }),
          ],
        },
        {
          name: 'stories',
          label: 'Service stories',
          description: '/support — horizontal story rail',
          fields: [sectionIntro('intro'), cardList('items', { label: 'Stories', image: true, tag: true })],
        },
        {
          name: 'audiences',
          label: 'Support for you',
          description: '/support — audience pathways',
          fields: [
            sectionIntro('intro'),
            cardList('items', { label: 'Audiences', image: true, link: true, highlights: true }),
          ],
        },
        {
          name: 'resources',
          label: 'Resources',
          description: '/support — resource centre',
          fields: [
            sectionIntro('intro'),
            {
              name: 'feature',
              type: 'group',
              label: 'Feature panel',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'body', type: 'textarea' },
                { name: 'image', type: 'upload', relationTo: 'media' },
                optionalLink('cta', 'Button'),
              ],
            },
            cardList('items', { label: 'Resource links', icon: true, link: true }),
          ],
        },
        {
          name: 'cases',
          label: 'Cases & stories',
          description: '/support — case study categories',
          fields: [
            sectionIntro('intro'),
            optionalLink('cta', 'Button'),
            cardList('items', { label: 'Categories', image: true, link: true }),
          ],
        },
        audienceTab('homeowners', 'Homeowners', '/support/homeowners'),
        audienceTab('installers', 'Installers', '/support/installers'),
        audienceTab('business', 'Business owners', '/support/business'),
        {
          name: 'warranty',
          label: 'Warranty',
          description:
            '/support/warranty — the coverage table comes from Support → Warranty plans.',
          fields: [
            subpageHero(),
            { name: 'matrixTitle', type: 'text' },
            cardList('steps', { label: 'Registration and claim steps' }),
            optionalLink('primary', 'Primary button'),
            optionalLink('secondary', 'Secondary button'),
            {
              name: 'policyFile',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional PDF. When set, the secondary button links to it.' },
            },
            pageMeta(),
          ],
        },
        {
          name: 'security',
          label: 'Security',
          description: '/support/security',
          fields: [
            subpageHero(),
            {
              name: 'sections',
              type: 'array',
              admin: {
                description:
                  'Leave empty to keep the default sections. Separate paragraphs with a blank line.',
              },
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
            },
            { name: 'ctaPrompt', type: 'text' },
            optionalLink('cta', 'Button'),
            pageMeta(),
          ],
        },
        { label: 'SEO', fields: [seoFields] },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('support', ['/support'])],
  },
  versions: { drafts: true },
}
