import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Catalogue',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short description for category cards and mega-menu.',
      },
    },
    {
      name: 'categoryIntroBody',
      type: 'richText',
      editor: defaultLexical,
      admin: {
        description: 'Keyword-rich intro copy for category landing pages (SEO).',
      },
    },
  ],
}
