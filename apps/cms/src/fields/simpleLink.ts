import type { Field } from 'payload'

/** Plain label + href link (internal path or absolute URL). */
export const simpleLinkFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  {
    name: 'href',
    type: 'text',
    required: true,
    admin: { description: 'Internal path (/about) or full URL (https://…).' },
  },
]

export const simpleLinkGroup = (overrides?: {
  name?: string
  label?: string
  required?: boolean
}): Field => ({
  name: overrides?.name ?? 'link',
  type: 'group',
  label: overrides?.label,
  fields: simpleLinkFields,
  ...(overrides?.required ? { required: true } : {}),
})
