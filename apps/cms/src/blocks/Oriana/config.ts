import type { Block } from 'payload'

import { iconOrMediaFields } from '@/fields/iconOrMedia'
import { simpleLinkFields } from '@/fields/simpleLink'
import { visibleArray } from '@/fields/visibility'

export const StatsGrid: Block = {
  slug: 'statsGrid',
  interfaceName: 'StatsGridBlock',
  labels: { singular: 'Stats grid', plural: 'Stats grids' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    visibleArray({
      name: 'stats',
      type: 'array',
      required: true,
      fields: [
        ...iconOrMediaFields,
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    }),
  ],
}

export const CardGrid: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  labels: { singular: 'Card grid', plural: 'Card grids' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    visibleArray({
      name: 'cards',
      type: 'array',
      required: true,
      fields: [
        ...iconOrMediaFields,
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        { name: 'href', type: 'text' },
      ],
    }),
  ],
}

export const CtaBand: Block = {
  slug: 'ctaBand',
  interfaceName: 'CtaBandBlock',
  labels: { singular: 'CTA band', plural: 'CTA bands' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    {
      name: 'primaryCta',
      type: 'group',
      fields: simpleLinkFields,
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: simpleLinkFields.map((f) =>
        'required' in f && f.required ? { ...f, required: false } : f,
      ),
    },
  ],
}

export const ContentPageSections: Block = {
  slug: 'contentPage',
  interfaceName: 'ContentPageBlock',
  labels: {
    singular: 'Legal / content sections',
    plural: 'Legal / content sections',
  },
  fields: [
    visibleArray({
      name: 'sections',
      type: 'array',
      labels: { singular: 'Section', plural: 'Sections' },
      required: true,
      admin: {
        description:
          'Used by Privacy Policy (/privacy), Terms of Use (/terms), and Disclaimer (/disclaimer). Edit heading + body per section; blank lines in Body become separate paragraphs on the site.',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          admin: { description: 'Section title (e.g. “Introduction and Acceptance”).' },
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
          admin: {
            rows: 12,
            description: 'Full section text. Use a blank line between paragraphs.',
          },
        },
      ],
    }),
  ],
}

export const IconFeature: Block = {
  slug: 'iconFeature',
  interfaceName: 'IconFeatureBlock',
  labels: { singular: 'Icon feature', plural: 'Icon features' },
  fields: [
    ...iconOrMediaFields,
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
    { name: 'href', type: 'text' },
  ],
}
