import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { iconOrMediaFields } from '@/fields/iconOrMedia'
import { seoFields } from '@/fields/seo'
import { revalidateHome } from './hooks/revalidateHome'

const linkFields = (label: string, href: string) => [
  { name: 'label' as const, type: 'text' as const, defaultValue: label },
  {
    name: 'href' as const,
    type: 'text' as const,
    defaultValue: href,
    admin: { description: 'Internal path (/about) or full URL (https://…).' },
  },
]

const imageUpload = (description: string) =>
  ({
    name: 'image',
    type: 'upload' as const,
    relationTo: 'media' as const,
    admin: {
      description,
    },
    filterOptions: {
      mimeType: { contains: 'image' },
    },
  }) satisfies NonNullable<GlobalConfig['fields']>[number]

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  admin: {
    group: 'Marketing',
    description:
      'Homepage video hero, intro, scenario images, vision/mission, impact, products, and related section copy.',
    livePreview: {
      url: ({ req }) => {
        const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SERVER_URL || ''
        return `${origin}/`
      },
    },
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
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                {
                  name: 'video',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'MP4 (or other browser-supported) hero video. If empty, the page uses /assets/home/hero.mp4.',
                  },
                  filterOptions: {
                    mimeType: { contains: 'video' },
                  },
                },
                {
                  name: 'poster',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Poster image shown while the video loads. If empty, the page uses /assets/home/hero-poster.jpg.',
                  },
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                },
                {
                  name: 'captions',
                  type: 'array',
                  labels: { singular: 'Caption', plural: 'Captions' },
                  admin: {
                    description: 'Rotating captions in the bottom-right of the hero.',
                  },
                  fields: [{ name: 'text', type: 'text', required: true }],
                  defaultValue: [
                    { text: 'Clean power that crosses borders' },
                    { text: 'To power that transforms businesses' },
                    { text: 'Energy platforms partners trust' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Introduction',
          fields: [
            {
              name: 'introduction',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Introduction' },
                {
                  name: 'paragraphs',
                  type: 'array',
                  labels: { singular: 'Paragraph', plural: 'Paragraphs' },
                  fields: [{ name: 'text', type: 'textarea', required: true }],
                  defaultValue: [
                    {
                      text: 'At Oriana, we are building the next generation of solar inverter technology with a focus on efficiency, reliability, intelligent performance, and long-term value.',
                    },
                    {
                      text: "Backed by industry experience and a strong understanding of India's solar ecosystem, Oriana Inverters are designed to meet the evolving requirements of residential, commercial, industrial, and utility-scale solar applications.",
                    },
                  ],
                },
                {
                  name: 'tagline',
                  type: 'text',
                  defaultValue: 'Built in India. Designed for the Future.',
                },
              ],
            },
          ],
        },
        {
          label: 'Scenarios',
          fields: [
            {
              name: 'peekImages',
              type: 'array',
              labels: { singular: 'Scenario', plural: 'Scenarios' },
              admin: {
                description: 'Stacked full-viewport scenario images (For Home, Business, Utility, Storage).',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'idKey',
                  type: 'text',
                  required: true,
                  label: 'Key',
                  admin: { description: 'Stable id used by the UI (home, business, utility, storage).' },
                },
                { name: 'title', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
                imageUpload('If empty, the page uses the built-in Unsplash fallback for this card.'),
                { name: 'alt', type: 'text' },
              ],
              defaultValue: [
                { idKey: 'home', title: 'For Home', href: '/solutions/residential' },
                { idKey: 'business', title: 'For Business', href: '/solutions/commercial' },
                { idKey: 'utility', title: 'For Utility', href: '/solutions/utility' },
                { idKey: 'storage', title: 'For Storage', href: '/solutions/storage' },
              ],
            },
          ],
        },
        {
          label: 'Vision & Mission',
          fields: [
            {
              name: 'visionMission',
              type: 'array',
              labels: { singular: 'Card', plural: 'Cards' },
              admin: { initCollapsed: true },
              fields: [
                {
                  name: 'idKey',
                  type: 'text',
                  required: true,
                  label: 'Key',
                  admin: { description: 'Stable id (vision, mission).' },
                },
                { name: 'label', type: 'text', required: true },
                { name: 'body', type: 'textarea' },
                imageUpload('If empty, the page uses the built-in Unsplash fallback for this card.'),
                { name: 'alt', type: 'text' },
                { name: 'href', type: 'text' },
                { name: 'ctaLabel', type: 'text', defaultValue: 'Explore more' },
              ],
              defaultValue: [
                {
                  idKey: 'vision',
                  label: 'Our Vision',
                  body: 'To become a globally trusted solar inverter brand, powering a smarter, cleaner, and more sustainable energy future.',
                  href: '/about',
                  ctaLabel: 'Explore more',
                },
                {
                  idKey: 'mission',
                  label: 'Our Mission',
                  body: 'To deliver innovative, reliable, and high-performance solar inverters through advanced technology, precision manufacturing, and exceptional customer service.',
                  href: '/about',
                  ctaLabel: 'Explore more',
                },
              ],
            },
          ],
        },
        {
          label: 'Impact stats',
          fields: [
            {
              name: 'impactSection',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Our Impact' },
                {
                  name: 'body',
                  type: 'textarea',
                  defaultValue:
                    "As a trusted solar inverter brand, we are committed to powering India's clean energy transition through advanced technology, nationwide reach, and exceptional customer support.",
                },
                {
                  name: 'link',
                  type: 'group',
                  fields: linkFields('Discover who we are', '/about'),
                },
                {
                  name: 'stats',
                  type: 'array',
                  labels: { singular: 'Stat', plural: 'Stats' },
                  fields: [
                    ...iconOrMediaFields,
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', required: true },
                  ],
                  defaultValue: [
                    { iconKey: 'award', value: '10+ Years', label: 'Solar industry project experience' },
                    { iconKey: 'map', value: 'PAN India', label: 'Market presence' },
                    { iconKey: 'zap', value: 'GW+', label: 'Inverter distribution & experience' },
                    { iconKey: 'building', value: '500+', label: 'Channel & service partners' },
                    { iconKey: 'leaf', value: '99.6%', label: 'Peak conversion efficiency' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Product categories',
          fields: [
            {
              name: 'productCategories',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Product Categories' },
                {
                  name: 'items',
                  type: 'array',
                  labels: { singular: 'Category', plural: 'Categories' },
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      name: 'idKey',
                      type: 'text',
                      required: true,
                      label: 'Key',
                      admin: { description: 'Stable id (on-grid, hybrid, utility, bess).' },
                    },
                    { name: 'label', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                    imageUpload('If empty, the page uses the built-in Unsplash fallback for this tab.'),
                    { name: 'alt', type: 'text' },
                  ],
                  defaultValue: [
                    {
                      idKey: 'on-grid',
                      label: 'On Grid Inverters',
                      href: '/products/category/on-grid-inverters',
                      alt: 'Residential rooftop solar installation',
                    },
                    {
                      idKey: 'hybrid',
                      label: 'Hybrid Inverters',
                      href: '/products/category/hybrid-inverters',
                      alt: 'Hybrid inverter and battery energy storage',
                    },
                    {
                      idKey: 'utility',
                      label: 'Utility Scale Inverters',
                      href: '/products/category/utility-scale-inverters',
                      alt: 'Utility-scale solar farm',
                    },
                    {
                      idKey: 'bess',
                      label: 'BESS',
                      href: '/products/category/bess',
                      alt: 'Battery energy storage system',
                    },
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
              name: 'whySection',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Why Choose Oriana Inverters?',
                },
                {
                  name: 'body',
                  type: 'textarea',
                  defaultValue:
                    'Oriana Inverters brings together advanced power electronics, intelligent technology, and precision engineering to deliver reliable solar power solutions for homes, businesses, and large-scale applications.',
                },
                {
                  name: 'cards',
                  type: 'array',
                  labels: { singular: 'Card', plural: 'Cards' },
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      name: 'idKey',
                      type: 'text',
                      required: true,
                      label: 'Key',
                    },
                    { name: 'title', type: 'text', required: true },
                    { name: 'href', type: 'text' },
                    imageUpload('If empty, the page uses the built-in Unsplash fallback for this card.'),
                    { name: 'alt', type: 'text' },
                  ],
                  defaultValue: [
                    {
                      idKey: 'expertise',
                      title: 'Solar Industry Expertise',
                      href: '/about',
                      alt: 'Solar industry expertise',
                    },
                    {
                      idKey: 'ai-tech',
                      title: 'AI Technology Driven',
                      href: '/about',
                      alt: 'AI technology driven solutions',
                    },
                    {
                      idKey: 'quality',
                      title: 'Quality Focused',
                      href: '/about/certifications',
                      alt: 'Quality focused manufacturing',
                    },
                    {
                      idKey: 'application',
                      title: 'Application Focused',
                      href: '/products',
                      alt: 'Application focused solar solutions',
                    },
                    {
                      idKey: 'service',
                      title: 'Professional Service',
                      href: '/support',
                      alt: 'Professional customer service',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Green mission',
          fields: [
            {
              name: 'greenMission',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  defaultValue: 'Green Mission. Greener World',
                },
                imageUpload(
                  'Background image. If empty, the page uses the built-in Unsplash fallback.',
                ),
                {
                  name: 'alt',
                  type: 'text',
                  defaultValue: 'Lush green landscape representing sustainability',
                },
                { name: 'href', type: 'text', defaultValue: '/sustainability' },
                { name: 'ctaLabel', type: 'text', defaultValue: 'Explore more' },
              ],
            },
          ],
        },
        {
          label: 'News',
          fields: [
            {
              name: 'newsSection',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'Trending News & Events' },
                {
                  name: 'mode',
                  type: 'select',
                  defaultValue: 'live',
                  options: [
                    { label: 'Live posts', value: 'live' },
                    { label: 'Manual items', value: 'manual' },
                  ],
                },
                {
                  name: 'manualItems',
                  type: 'array',
                  admin: {
                    condition: (_, siblingData) => siblingData?.mode === 'manual',
                    initCollapsed: true,
                  },
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'date', type: 'text' },
                    { name: 'href', type: 'text', required: true },
                    { name: 'type', type: 'text', defaultValue: 'News' },
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      filterOptions: {
                        mimeType: { contains: 'image' },
                      },
                    },
                  ],
                },
                {
                  name: 'postsLimit',
                  type: 'number',
                  defaultValue: 5,
                  admin: {
                    condition: (_, siblingData) => siblingData?.mode !== 'manual',
                  },
                },
                {
                  name: 'link',
                  type: 'group',
                  fields: linkFields('Explore more', '/posts'),
                },
              ],
            },
          ],
        },
        {
          label: 'Follow Oriana',
          fields: [
            {
              name: 'followSection',
              type: 'group',
              admin: {
                description:
                  'Social URLs come from Site Settings → Footer → Social links. Only the heading is edited here.',
              },
              fields: [{ name: 'title', type: 'text', defaultValue: 'Follow Oriana' }],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seoFields],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHome],
  },
  versions: {
    drafts: {
      autosave: { interval: 400 },
    },
  },
}
