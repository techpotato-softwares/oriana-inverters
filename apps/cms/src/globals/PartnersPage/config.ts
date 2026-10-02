import type { GlobalConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import {
  cardList,
  ctaBand,
  linkList,
  optionalLink,
  pageMeta,
  revalidateGlobal,
  sectionIntro,
  subpageHero,
} from '@/fields/marketing'

export const PartnersPage: GlobalConfig = {
  slug: 'partners-page',
  label: 'Partners Pages',
  admin: {
    group: 'Marketing',
    description:
      'Content for /partners and its subpages. Any field left blank shows the current default copy.',
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
          name: 'hub',
          label: 'Partners hub',
          description: '/partners',
          fields: [
            subpageHero(),
            cardList('tracks', { label: 'Programme cards', icon: true, link: true }),
            linkList('quickLinks', 'Quick links'),
            ctaBand(),
            pageMeta(),
          ],
        },
        {
          name: 'distributors',
          label: 'Distributors',
          description: '/partners/distributors',
          fields: [
            subpageHero(),
            sectionIntro('intro', 'Intro'),
            cardList('coverage', { label: 'Coverage cards' }),
            { name: 'benefitsTitle', type: 'text' },
            cardList('benefits', { label: 'Benefit cards' }),
            linkList('links', 'Text links'),
            ctaBand(),
            pageMeta(),
          ],
        },
        {
          name: 'applyDistributor',
          label: 'Become a distributor',
          description: '/partners/become-a-distributor',
          fields: [
            subpageHero('hero', { image: true }),
            optionalLink('heroPrimary', 'Hero primary button'),
            optionalLink('heroSecondary', 'Hero secondary button'),
            sectionIntro('intro', 'Intro'),
            cardList('points', { label: 'Programme points' }),
            optionalLink('programmeLink', 'Programme link under the points'),
            {
              name: 'form',
              type: 'group',
              label: 'Application form',
              admin: {
                description:
                  'Submissions are saved under Forms & Leads → Distributor applications.',
              },
              fields: [
                { name: 'title', type: 'text' },
                { name: 'body', type: 'textarea' },
                { name: 'successTitle', type: 'text' },
                { name: 'successMessage', type: 'textarea' },
              ],
            },
            pageMeta(),
          ],
        },
        {
          name: 'installers',
          label: 'Installers',
          description: '/partners/installers',
          fields: [
            subpageHero(),
            sectionIntro('intro', 'Intro'),
            cardList('pillars', { label: 'Support cards', icon: true }),
            linkList('quickLinks', 'Quick links'),
            ctaBand(),
            pageMeta(),
          ],
        },
        {
          name: 'applyInstaller',
          label: 'Become an installer',
          description: '/partners/become-an-installer',
          fields: [
            subpageHero(),
            { name: 'stepsTitle', type: 'text' },
            cardList('steps', { label: 'Steps' }),
            { name: 'benefitsTitle', type: 'text' },
            {
              name: 'benefits',
              type: 'array',
              admin: { description: 'Leave empty to keep the default list.' },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            linkList('links', 'Text links'),
            ctaBand(),
            pageMeta(),
          ],
        },
        {
          name: 'partnership',
          label: 'Partnership',
          description: '/partners/partnership',
          fields: [
            subpageHero(),
            sectionIntro('intro', 'Intro'),
            cardList('paths', { label: 'Partner paths', link: true }),
            cardList('enablement', { label: 'Enablement cards' }),
            ctaBand(),
            pageMeta(),
          ],
        },
        {
          name: 'training',
          label: 'Training',
          description: '/partners/training',
          fields: [
            subpageHero(),
            cardList('topics', { label: 'Training topics', link: true }),
            linkList('quickLinks', 'Quick links'),
            ctaBand(),
            pageMeta(),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGlobal('partners-page', ['/partners'])],
  },
  versions: { drafts: true },
}
