import type { Block } from 'payload'

import { iconOrMediaFields } from '@/fields/iconOrMedia'
import { simpleLinkFields } from '@/fields/simpleLink'

export const StatsGrid: Block = {
  slug: 'statsGrid',
  interfaceName: 'StatsGridBlock',
  labels: { singular: 'Stats grid', plural: 'Stats grids' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    {
      name: 'stats',
      type: 'array',
      required: true,
      fields: [
        ...iconOrMediaFields,
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}

export const CardGrid: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  labels: { singular: 'Card grid', plural: 'Card grids' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    {
      name: 'cards',
      type: 'array',
      required: true,
      fields: [
        ...iconOrMediaFields,
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        { name: 'href', type: 'text' },
      ],
    },
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
  labels: { singular: 'Content sections', plural: 'Content sections' },
  fields: [
    {
      name: 'sections',
      type: 'array',
      required: true,
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
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
