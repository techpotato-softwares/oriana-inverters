import type { GlobalConfig } from 'payload'

import { revalidateCollection } from '../utilities/revalidateCollection'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Site' },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async ({ doc, req: { context } }) => {
        await revalidateCollection({
          paths: ['/'],
          tags: ['global_site-settings'],
          context,
        })
        return doc
      },
    ],
  },
  fields: [
    { name: 'brandName', type: 'text', defaultValue: 'Oriana Inverters' },
    { name: 'supportEmail', type: 'email', defaultValue: 'support@orianainverters.com' },
    { name: 'infoEmail', type: 'email', defaultValue: 'info@orianainverters.com' },
    { name: 'securityEmail', type: 'email', defaultValue: 'security@orianainverters.com' },
    { name: 'privacyEmail', type: 'email', defaultValue: 'privacy@orianainverters.com' },
    { name: 'hotline', type: 'text', defaultValue: '+1 (800) ORIANA-1' },
    { name: 'defaultMetaTitle', type: 'text' },
    { name: 'defaultMetaDescription', type: 'textarea' },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
  ],
}
