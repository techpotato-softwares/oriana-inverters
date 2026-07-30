import type { Field } from 'payload'

/** Common page hero fields used across marketing page globals */
export const pageHeroFields: Field[] = [
  { name: 'eyebrow', type: 'text' },
  { name: 'title', type: 'text', required: true },
  { name: 'description', type: 'textarea' },
]

export const ctaFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  { name: 'href', type: 'text', required: true },
]

export const linkItemFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  { name: 'href', type: 'text', required: true },
]

export const seoGroupField: Field = {
  name: 'seo',
  type: 'group',
  fields: [
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
  ],
}
