import type { Field } from 'payload'

/** Shared page hero group used by marketing globals and some collections. */
export const pageHeroFields: Field = {
  name: 'hero',
  type: 'group',
  label: 'Page hero',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'Small label above the title.' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
