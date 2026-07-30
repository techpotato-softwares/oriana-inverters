import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  admin: { group: 'Site' },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Utility Bar',
          fields: [
            { name: 'hotlineLabel', type: 'text', defaultValue: 'Customer Hotline:' },
            { name: 'hotline', type: 'text', defaultValue: '+1 (800) ORIANA-1' },
            { name: 'languageLabel', type: 'text', defaultValue: 'USA · English' },
            { name: 'searchPlaceholder', type: 'text', defaultValue: 'Search' },
            { name: 'loginLabel', type: 'text', defaultValue: 'Login' },
            { name: 'loginHref', type: 'text', defaultValue: '/admin' },
          ],
        },
        {
          label: 'CTAs',
          fields: [
            { name: 'whereToBuyLabel', type: 'text', defaultValue: 'Where to Buy' },
            { name: 'whereToBuyHref', type: 'text', defaultValue: '/where-to-buy' },
            { name: 'quoteLabel', type: 'text', defaultValue: 'Request Quote' },
            { name: 'quoteHref', type: 'text', defaultValue: '/contact' },
          ],
        },
        {
          label: 'Logo',
          fields: [
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'logoAlt', type: 'text', defaultValue: 'Oriana Inverters' },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navMenus',
              type: 'array',
              labels: { singular: 'Nav Menu', plural: 'Nav Menus' },
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/Header/RowLabel#RowLabel',
                },
              },
              fields: [
                { name: 'key', type: 'text', required: true, admin: { description: 'about | home | business | utility | products | support' } },
                { name: 'label', type: 'text', required: true },
                {
                  name: 'columns',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'href', type: 'text' },
                    {
                      name: 'links',
                      type: 'array',
                      fields: [
                        { name: 'label', type: 'text', required: true },
                        { name: 'href', type: 'text', required: true },
                      ],
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
  versions: false,
}
