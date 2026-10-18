import type { Field, GlobalConfig } from 'payload'

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
import { sectionHiddenField, visibleArray } from '@/fields/visibility'

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
      'Public site: /support, /support/warranty, /support/security. Each tab below maps to a section on the page — edit copy/media here. If tabs look empty, run: npm run seed:marketing-pages --workspace=@oriana/cms (or seed:support). Warranty table rows: Support → Warranty plans.',
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
          label: '1. Hero',
          description: '/support — top full-bleed hero + quick links',
          fields: [
            {
              name: 'hero',
              type: 'group',
              label: 'Hero',
              admin: {
                description:
                  'First thing visitors see. Seed fills these; change any field and publish.',
              },
              fields: [
                {
                  name: 'eyebrow',
                  type: 'text',
                  defaultValue: 'Service & Support',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      defaultValue: 'Professional support.',
                      admin: { width: '50%' },
                    },
                    {
                      name: 'highlight',
                      type: 'text',
                      defaultValue: 'Reliable performance.',
                      admin: {
                        width: '50%',
                        description: 'Second headline line, shown in sky blue.',
                      },
                    },
                  ],
                },
                {
                  name: 'description',
                  type: 'textarea',
                  defaultValue:
                    'Dependable service across the product lifecycle — technical expertise, responsive support, systematic troubleshooting, and field-level assistance that keeps customers, installers, and EPC partners running with minimal downtime.',
                },
                { name: 'image', type: 'upload', relationTo: 'media' },
                optionalLink('primary', 'Primary button'),
                optionalLink('secondary', 'Secondary button'),
                {
                  name: 'quickLinksLabel',
                  type: 'text',
                  defaultValue: 'Frequently needed',
                },
                visibleArray({
                  name: 'quickLinks',
                  type: 'array',
                  admin: { description: 'Three shortcut chips under the hero.' },
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
                }),
              ],
            },
          ],
        },
        {
          name: 'strengths',
          label: '2. Strengths',
          description: '/support — “Our strength” capability mosaic',
          fields: [
            sectionHiddenField(),
            sectionIntro('intro'),
            cardList('items', { label: 'Capabilities', image: true }),
          ],
        },
        {
          name: 'approach',
          label: '3. Approach',
          description: '/support — Identify → Diagnose → Resolve → Support',
          fields: [
            sectionHiddenField(),
            sectionIntro('intro'),
            optionalLink('cta', 'Button'),
            cardList('steps', { label: 'Steps', image: true }),
          ],
        },
        {
          name: 'presence',
          label: '4. Global presence',
          description: '/support — stats, India map pins, service pillars',
          fields: [
            sectionHiddenField(),
            sectionIntro('intro'),
            visibleArray({
              name: 'stats',
              type: 'array',
              label: 'Stats',
              fields: statFields,
            }),
            optionalLink('cta', 'Button'),
            { name: 'coverageLabel', type: 'text' },
            { name: 'coverageBody', type: 'textarea' },
            visibleArray({
              name: 'locations',
              type: 'array',
              label: 'Map pins',
              admin: {
                description:
                  'Position is % from top/left of the India outline (e.g. Delhi 29.2% / 30.2%).',
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
            }),
            cardList('pillars', { label: 'Service pillars', icon: true }),
          ],
        },
        {
          name: 'stories',
          label: '5. Service stories',
          description: '/support — horizontal story cards',
          fields: [
            sectionHiddenField(),
            sectionIntro('intro'),
            cardList('items', { label: 'Stories', image: true, tag: true }),
          ],
        },
        {
          name: 'resources',
          label: '6. Resources',
          description: '/support — resource centre feature + links',
          fields: [
            sectionHiddenField(),
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
          label: '7. Cases & stories',
          description: '/support — case study category cards at the bottom',
          fields: [
            sectionHiddenField(),
            sectionIntro('intro'),
            optionalLink('cta', 'Button'),
            cardList('items', { label: 'Categories', image: true, link: true }),
          ],
        },
        {
          name: 'warranty',
          label: '8. Warranty page',
          description:
            '/support/warranty — hero + steps. Coverage table: Support → Warranty plans.',
          fields: [
            subpageHero('hero', { image: true }),
            { name: 'matrixTitle', type: 'text', defaultValue: 'Coverage by Product Line' },
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
          label: '9. Security page',
          description: '/support/security — incident response copy',
          fields: [
            subpageHero('hero', { image: true }),
            visibleArray({
              name: 'sections',
              type: 'array',
              label: 'Sections',
              admin: { description: 'Separate paragraphs inside Body with a blank line.' },
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
              ],
            }),
            { name: 'ctaPrompt', type: 'text' },
            optionalLink('cta', 'Button'),
            pageMeta(),
          ],
        },
        { label: '10. SEO', fields: [seoFields] },
      ],
    },
  ],
  hooks: {
    afterChange: [
      revalidateGlobal('support', ['/support', '/support/warranty', '/support/security']),
    ],
  },
  versions: { drafts: true },
}
