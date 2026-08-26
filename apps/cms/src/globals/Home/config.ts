import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { ctaPairFields } from '@/fields/ctaLink'
import { iconOrMediaFields } from '@/fields/iconOrMedia'
import { seoFields } from '@/fields/seo'
import { simpleLinkFields } from '@/fields/simpleLink'
import { revalidateHome } from './hooks/revalidateHome'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  admin: {
    group: 'Marketing',
    description: 'Homepage hero, strategies, stats, and section copy.',
    livePreview: {
      url: ({ req }) => {
        const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SERVER_URL || ''
        return `${origin}/`
      },
    },
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
          label: 'Hero',
          fields: [
            {
              name: 'heroMode',
              type: 'select',
              defaultValue: 'fallback',
              options: [
                { label: 'Fallback (brand hero)', value: 'fallback' },
                { label: 'Slides (media carousel)', value: 'slides' },
              ],
            },
            {
              name: 'fallbackHero',
              type: 'group',
              label: 'Fallback hero',
              admin: {
                condition: (_, siblingData) => siblingData?.heroMode !== 'slides',
              },
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Oriana' },
                {
                  name: 'headline',
                  type: 'text',
                  defaultValue: 'Clean power that crosses borders',
                },
                {
                  name: 'subheadline',
                  type: 'textarea',
                  defaultValue:
                    'High-efficiency inverters and storage platforms for homes, industry, and utility grids — engineered for partners who ship projects worldwide.',
                },
                ...ctaPairFields,
              ],
            },
            {
              name: 'heroSlides',
              type: 'array',
              labels: { singular: 'Slide', plural: 'Slides' },
              admin: {
                condition: (_, siblingData) => siblingData?.heroMode === 'slides',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'linkType',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Product', value: 'product' },
                    { label: 'Blog post', value: 'post' },
                    { label: 'Custom URL', value: 'custom' },
                  ],
                },
                {
                  name: 'product',
                  type: 'relationship',
                  relationTo: 'products',
                  admin: {
                    condition: (_, siblingData) => siblingData?.linkType === 'product',
                  },
                },
                {
                  name: 'post',
                  type: 'relationship',
                  relationTo: 'posts',
                  admin: {
                    condition: (_, siblingData) => siblingData?.linkType === 'post',
                  },
                },
                {
                  name: 'href',
                  type: 'text',
                  admin: {
                    condition: (_, siblingData) => siblingData?.linkType === 'custom',
                  },
                },
                { name: 'headline', type: 'text' },
                { name: 'ctaLabel', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Strategies',
          fields: [
            {
              name: 'strategiesSection',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Go-to-market strategies' },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'One platform. Four ways to win.',
                },
                {
                  name: 'intro',
                  type: 'textarea',
                  defaultValue:
                    "Meet Ori's crew — each strategy tailored for the partners and projects shaping the global energy transition.",
                },
                {
                  name: 'items',
                  type: 'array',
                  labels: { singular: 'Strategy', plural: 'Strategies' },
                  fields: [
                    { name: 'idKey', type: 'text', required: true, label: 'Key (home/business/utility/storage)' },
                    { name: 'label', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    { name: 'href', type: 'text', required: true },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      admin: { description: 'Optional card image; UI may use mascot by idKey.' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Impact stats',
          fields: [
            {
              name: 'impactSection',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Global footprint' },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Built for international partners',
                },
                {
                  name: 'link',
                  type: 'group',
                  fields: simpleLinkFields,
                },
                {
                  name: 'stats',
                  type: 'array',
                  fields: [
                    ...iconOrMediaFields,
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Why Oriana',
          fields: [
            {
              name: 'whySection',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Why Oriana' },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Excellence that travels with every shipment',
                },
                {
                  name: 'body',
                  type: 'textarea',
                  defaultValue:
                    'From first sample to fleet deployment, we help international clients specify, certify, and scale clean power conversion with confidence.',
                },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    ...iconOrMediaFields,
                    { name: 'title', type: 'text', required: true },
                    { name: 'copy', type: 'textarea', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Global reach',
          fields: [
            {
              name: 'reachSection',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'International clients' },
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Ready wherever your next project lands',
                },
                {
                  name: 'body',
                  type: 'textarea',
                  defaultValue:
                    'Regional documentation, certification pathways, and partner enablement — so cross-border deals move from RFQ to commissioning without friction.',
                },
                {
                  name: 'regions',
                  type: 'array',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'focus', type: 'text', required: true },
                  ],
                },
                {
                  name: 'cta',
                  type: 'group',
                  fields: simpleLinkFields,
                },
              ],
            },
          ],
        },
        {
          label: 'Case studies strip',
          fields: [
            {
              name: 'caseStudiesSection',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'Customer success' },
                { name: 'title', type: 'text', defaultValue: 'Case studies' },
                {
                  name: 'link',
                  type: 'group',
                  fields: simpleLinkFields,
                },
                {
                  name: 'limit',
                  type: 'number',
                  defaultValue: 3,
                  admin: { description: 'How many published case studies to show.' },
                },
              ],
            },
          ],
        },
        {
          label: 'News',
          fields: [
            {
              name: 'newsSection',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text', defaultValue: 'News & media' },
                { name: 'title', type: 'text', defaultValue: 'Latest from Oriana' },
                {
                  name: 'mode',
                  type: 'select',
                  defaultValue: 'live',
                  options: [
                    { label: 'Live posts', value: 'live' },
                    { label: 'Manual items', value: 'manual' },
                  ],
                },
                {
                  name: 'manualItems',
                  type: 'array',
                  admin: {
                    condition: (_, siblingData) => siblingData?.mode === 'manual',
                  },
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'date', type: 'text' },
                    { name: 'href', type: 'text', required: true },
                    { name: 'type', type: 'text', defaultValue: 'News' },
                  ],
                },
                {
                  name: 'postsLimit',
                  type: 'number',
                  defaultValue: 3,
                  admin: {
                    condition: (_, siblingData) => siblingData?.mode !== 'manual',
                  },
                },
                {
                  name: 'link',
                  type: 'group',
                  fields: simpleLinkFields,
                },
              ],
            },
          ],
        },
        {
          label: 'Support strip',
          fields: [
            {
              name: 'supportStrip',
              type: 'group',
              fields: [
                { name: 'hotlineLabel', type: 'text', defaultValue: 'Customer Hotline' },
                { name: 'hotlineNote', type: 'text' },
                {
                  name: 'downloads',
                  type: 'array',
                  fields: simpleLinkFields,
                },
                {
                  name: 'partnerCta',
                  type: 'group',
                  fields: [
                    { name: 'title', type: 'text' },
                    { name: 'body', type: 'textarea' },
                    ...simpleLinkFields,
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seoFields],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
  versions: {
    drafts: {
      autosave: { interval: 400 },
    },
  },
}
