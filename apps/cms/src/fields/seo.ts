import type { Field } from 'payload'

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  fields: [
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    {
      name: 'keywords',
      type: 'textarea',
      admin: {
        description:
          'Comma-separated keywords for this page (also used in meta keywords). Prefer natural phrases over stuffing.',
      },
    },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    { name: 'canonicalUrl', type: 'text' },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Ask search engines not to index this page (robots: noindex).',
      },
    },
  ],
}
