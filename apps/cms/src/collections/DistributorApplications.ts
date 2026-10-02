import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { sendDistributorApplicationEmail } from '@/utilities/sendDistributorApplicationEmail'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export const DistributorApplications: CollectionConfig = {
  slug: 'distributor-applications',
  labels: { singular: 'Distributor application', plural: 'Distributor applications' },
  admin: {
    group: 'Forms & Leads',
    useAsTitle: 'company',
    defaultColumns: ['company', 'name', 'email', 'cityState', 'emailStatus', 'createdAt'],
    description: 'Applications submitted from Become a Distributor.',
  },
  access: {
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'company', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'cityState', type: 'text', required: true, label: 'City / State' },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'emailStatus',
      type: 'select',
      defaultValue: 'not-configured',
      options: [
        { label: 'Email sent', value: 'sent' },
        { label: 'Email failed', value: 'failed' },
        { label: 'Email not configured', value: 'not-configured' },
      ],
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Whether the notification to info@orianainverters.com was sent.',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation !== 'create' || !data) return data

        const name = text(data.name)
        const company = text(data.company)
        const email = text(data.email)
        const phone = text(data.phone)
        const cityState = text(data.cityState)
        const message = text(data.message)

        if (!name || !company || !email || !phone || !cityState || !message) {
          throw new APIError('Please complete every field.', 400, null, true)
        }
        if (!EMAIL_PATTERN.test(email)) {
          throw new APIError('Enter a valid email address.', 400, null, true)
        }

        const emailStatus = await sendDistributorApplicationEmail({
          name,
          company,
          email,
          phone,
          cityState,
          message,
        })

        return {
          ...data,
          name,
          company,
          email,
          phone,
          cityState,
          message,
          emailStatus,
        }
      },
    ],
  },
}
