import type { Field } from 'payload'

import { simpleLinkFields } from './simpleLink'

/** Primary / secondary CTA pair used on section footers. */
export const ctaPairFields: Field[] = [
  {
    name: 'primaryCta',
    type: 'group',
    label: 'Primary CTA',
    fields: simpleLinkFields,
  },
  {
    name: 'secondaryCta',
    type: 'group',
    label: 'Secondary CTA',
    fields: simpleLinkFields.map((f) =>
      'required' in f && f.required ? { ...f, required: false } : f,
    ),
  },
]
