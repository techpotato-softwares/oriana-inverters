import type { CollectionConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import {
  assertFormRateLimit,
  assertHoneypotEmpty,
  clientKeyFromHeaders,
  FIELD_LIMITS,
  sanitizeEmail,
  sanitizeMessage,
  sanitizePersonName,
  sanitizePhone,
  sanitizeShortText,
} from '@/utilities/formSecurity'
import { allowEditField, unlockedLeadFieldAccess } from '@/utilities/leadAdmin'
import { sendDistributorApplicationEmail } from '@/utilities/sendDistributorApplicationEmail'

export const DistributorApplications: CollectionConfig = {
  slug: 'distributor-applications',
  labels: { singular: 'Distributor application', plural: 'Distributor applications' },
  admin: {
    group: 'Forms & Leads',
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'email', 'cityState', 'emailStatus', 'createdAt'],
    description: 'Applications submitted from Become a Distributor.',
  },
  access: {
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'companyWebsite',
      type: 'text',
      admin: { hidden: true },
      access: { update: () => false },
    },
    allowEditField(),
    {
      name: 'name',
      type: 'text',
      label: 'Full name',
      required: true,
      maxLength: FIELD_LIMITS.name,
      access: { update: unlockedLeadFieldAccess },
    },
    {
      name: 'company',
      type: 'text',
      required: true,
      maxLength: FIELD_LIMITS.company,
      access: { update: unlockedLeadFieldAccess },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      access: { update: unlockedLeadFieldAccess },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      maxLength: FIELD_LIMITS.phone,
      access: { update: unlockedLeadFieldAccess },
    },
    {
      name: 'cityState',
      type: 'text',
      required: true,
      label: 'City / State',
      maxLength: FIELD_LIMITS.city,
      access: { update: unlockedLeadFieldAccess },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      maxLength: FIELD_LIMITS.message,
      access: { update: unlockedLeadFieldAccess },
    },
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
      async ({ data, operation, req }) => {
        if (operation !== 'create' || !data) return data

        assertHoneypotEmpty(data as Record<string, unknown>)
        assertFormRateLimit({
          key: `distributor-applications:${clientKeyFromHeaders(req.headers)}`,
          limit: 5,
        })

        const name = sanitizePersonName(data.name)
        const company = sanitizeShortText(data.company, {
          maxLength: FIELD_LIMITS.company,
          required: true,
          label: 'Company',
        })
        const email = sanitizeEmail(data.email)
        const phone = sanitizePhone(data.phone)
        const cityState = sanitizeShortText(data.cityState, {
          maxLength: FIELD_LIMITS.city,
          required: true,
          label: 'City / State',
        })
        const message = sanitizeMessage(data.message, true)

        const emailStatus = await sendDistributorApplicationEmail({
          name,
          company,
          email,
          phone,
          cityState,
          message,
        })

        delete (data as Record<string, unknown>).companyWebsite

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
