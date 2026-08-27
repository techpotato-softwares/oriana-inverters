import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { simpleLinkFields } from '@/fields/simpleLink'
import { revalidateHeader } from '@/Header/hooks/revalidateHeader'

const megaMenuKeys = [{ label: 'Products', value: 'products' }]

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header / Navigation',
  admin: {
    group: 'Settings',
    description: 'Utility bar, CTAs, and mega-menus for the public site header.',
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
          label: 'Utility bar',
          fields: [
            {
              name: 'hotlineLabel',
              type: 'text',
              defaultValue: 'Customer Hotline',
            },
            {
              name: 'localeLabel',
              type: 'text',
              defaultValue: 'USA · English',
            },
            {
              name: 'searchLabel',
              type: 'text',
              defaultValue: 'Search',
            },
            {
              name: 'loginLabel',
              type: 'text',
              defaultValue: 'Login',
            },
            {
              name: 'loginHref',
              type: 'text',
              defaultValue: '/contact',
            },
          ],
        },
        {
          label: 'CTAs',
          fields: [
            {
              name: 'whereToBuy',
              type: 'group',
              fields: simpleLinkFields,
            },
            {
              name: 'requestQuote',
              type: 'group',
              fields: simpleLinkFields,
            },
          ],
        },
        {
          label: 'Mega menus',
          fields: [
            {
              name: 'primaryNav',
              type: 'array',
              labels: { singular: 'Nav item', plural: 'Nav items' },
              admin: {
                description: 'Order of top-level mega menus. Products columns are filled from the catalogue at render time.',
              },
              fields: [
                {
                  name: 'key',
                  type: 'select',
                  required: true,
                  options: megaMenuKeys,
                },
                { name: 'label', type: 'text', required: true },
                {
                  name: 'columns',
                  type: 'array',
                  labels: { singular: 'Column', plural: 'Columns' },
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'href', type: 'text' },
                    {
                      name: 'links',
                      type: 'array',
                      fields: simpleLinkFields,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
  versions: {
    drafts: true,
  },
}
