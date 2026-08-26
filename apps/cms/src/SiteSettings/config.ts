import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

const navLinkFields = [
  { name: 'label', type: 'text' as const, required: true },
  {
    name: 'href',
    type: 'text' as const,
    required: true,
    admin: { description: 'Internal path (/about) or full URL (https://…).' },
  },
]

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
    description: 'Brand, SEO, analytics, footer, and social links used across the public site.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              defaultValue: 'Oriana Inverters',
              admin: { description: 'Used in the footer copyright and default SEO titles.' },
            },
            {
              name: 'logoLight',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Logo for dark backgrounds (header on navy, etc.).' },
            },
            {
              name: 'logoDark',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Logo for light backgrounds.' },
            },
            {
              name: 'hotline',
              type: 'text',
              defaultValue: '+1 (800) ORIANA-1',
              admin: { description: 'Shown in the header utility bar.' },
            },
            {
              name: 'copyrightText',
              type: 'text',
              admin: {
                description:
                  'Optional override. Leave blank to use “© {year} {site name}. All rights reserved.”',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              defaultValue: 'Oriana Inverters | Advanced Solar Inverter Solutions',
              admin: { description: 'Default document title for pages without their own title.' },
            },
            {
              name: 'seoTitleTemplate',
              type: 'text',
              defaultValue: '%s | Oriana Inverters',
              admin: { description: 'Use %s for the page title, e.g. “%s | Oriana Inverters”.' },
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              defaultValue:
                'High-efficiency string, hybrid, and utility-scale solar inverters for residential, commercial, and utility applications.',
            },
            {
              name: 'twitterHandle',
              type: 'text',
              defaultValue: '@OrianaInverters',
              admin: { description: 'Twitter/X handle including @.' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Default social share image when a page has no OG image.' },
            },
          ],
        },
        {
          label: 'Analytics',
          fields: [
            {
              name: 'googleAnalyticsId',
              type: 'text',
              admin: {
                description: 'GA4 measurement ID, e.g. G-XXXXXXXXXX. Leave blank to disable.',
              },
            },
            {
              name: 'googleTagManagerId',
              type: 'text',
              admin: {
                description: 'GTM container ID, e.g. GTM-XXXXXXX. Leave blank to disable.',
              },
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerColumns',
              type: 'array',
              labels: { singular: 'Column', plural: 'Columns' },
              admin: {
                description: 'Leave empty to keep the current built-in footer columns.',
              },
              fields: [
                { name: 'title', type: 'text', required: true },
                {
                  name: 'links',
                  type: 'array',
                  labels: { singular: 'Link', plural: 'Links' },
                  fields: navLinkFields,
                },
              ],
            },
            {
              name: 'legalLinks',
              type: 'array',
              labels: { singular: 'Legal link', plural: 'Legal links' },
              admin: {
                description: 'Privacy, terms, sitemap, etc. Empty keeps the current legal row.',
              },
              fields: navLinkFields,
            },
            {
              name: 'socialLinks',
              type: 'array',
              labels: { singular: 'Social link', plural: 'Social links' },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Instagram', value: 'instagram' },
                  ],
                },
                { name: 'href', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
  versions: false,
}
