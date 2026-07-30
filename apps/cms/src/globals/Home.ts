import type { GlobalConfig } from 'payload'

import { revalidateCollection } from '../utilities/revalidateCollection'
import { ctaFields, pageHeroFields, seoGroupField } from '../fields/pageHero'

async function revalidateHome(context?: { disableRevalidate?: boolean }) {
  await revalidateCollection({ paths: ['/'], tags: ['global_home', 'home'], context })
}

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        await revalidateHome(context)
        return doc
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                ...pageHeroFields,
                {
                  name: 'primaryCta',
                  type: 'group',
                  fields: ctaFields,
                },
                {
                  name: 'secondaryCta',
                  type: 'group',
                  fields: ctaFields,
                },
              ],
            },
          ],
        },
        {
          label: 'Strategies',
          fields: [
            {
              name: 'strategies',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  maxRows: 4,
                  fields: [
                    { name: 'id', type: 'text', required: true, admin: { description: 'home | business | utility | storage' } },
                    { name: 'label', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Impact Stats',
          fields: [
            {
              name: 'impact',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'ctaLabel', type: 'text' },
                { name: 'ctaHref', type: 'text' },
                {
                  name: 'stats',
                  type: 'array',
                  fields: [
                    { name: 'icon', type: 'text', admin: { description: 'globe | award | leaf | microscope' } },
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Why Oriana',
          fields: [
            {
              name: 'whyOriana',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'icon', type: 'text', admin: { description: 'microscope | shield | globe | headphones' } },
                    { name: 'title', type: 'text', required: true },
                    { name: 'copy', type: 'textarea', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Global Reach',
          fields: [
            {
              name: 'globalReach',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'ctaLabel', type: 'text' },
                { name: 'ctaHref', type: 'text' },
                {
                  name: 'regions',
                  type: 'array',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'focus', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'News',
          fields: [
            {
              name: 'news',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'viewAllLabel', type: 'text' },
                { name: 'viewAllHref', type: 'text' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'date', type: 'text' },
                    { name: 'href', type: 'text', required: true },
                    { name: 'type', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Case Studies Intro',
          fields: [
            {
              name: 'caseStudiesIntro',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'viewAllLabel', type: 'text' },
                { name: 'viewAllHref', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Support Strip',
          fields: [
            {
              name: 'supportStrip',
              type: 'group',
              fields: [
                {
                  name: 'service',
                  type: 'group',
                  fields: [
                    { name: 'eyebrow', type: 'text' },
                    { name: 'title', type: 'text' },
                    { name: 'hotline', type: 'text' },
                    { name: 'linkLabel', type: 'text' },
                    { name: 'linkHref', type: 'text' },
                  ],
                },
                {
                  name: 'downloads',
                  type: 'group',
                  fields: [
                    { name: 'eyebrow', type: 'text' },
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
                {
                  name: 'partner',
                  type: 'group',
                  fields: [
                    { name: 'eyebrow', type: 'text' },
                    { name: 'description', type: 'textarea' },
                    { name: 'ctaLabel', type: 'text' },
                    { name: 'ctaHref', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seoGroupField],
        },
      ],
    },
  ],
}
