import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

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
  sanitizeUploadFilename,
} from '@/utilities/formSecurity'
import { allowEditField, unlockedLeadFieldAccess } from '@/utilities/leadAdmin'
import { sendCareerApplicationEmail } from '@/utilities/sendCareerApplicationEmail'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const MAX_RESUME_BYTES = 4 * 1024 * 1024
const ALLOWED_EXTENSIONS = new Set(['pdf', 'doc', 'docx'])

type UploadedResume = {
  name?: string
  mimetype?: string
  size?: number
  data?: Buffer
}

export const CareerApplications: CollectionConfig = {
  slug: 'career-applications',
  labels: { singular: 'Career application', plural: 'Career applications' },
  admin: {
    group: 'Forms & Leads',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'emailStatus', 'createdAt'],
    description: 'Applications and resumes submitted from the Careers page. Download the resume from the document.',
  },
  access: {
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  upload: {
    staticDir: path.resolve(dirname, '../../uploads/career-applications'),
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/octet-stream',
    ],
    filesRequiredOnCreate: true,
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
      name: 'location',
      type: 'text',
      label: 'City',
      maxLength: FIELD_LIMITS.city,
      access: { update: unlockedLeadFieldAccess },
    },
    {
      name: 'role',
      type: 'text',
      label: 'Role of interest',
      maxLength: FIELD_LIMITS.role,
      access: { update: unlockedLeadFieldAccess },
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Cover note',
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
        description: 'Whether the notification to HR was sent.',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation !== 'create' || !data) return data

        assertHoneypotEmpty(data as Record<string, unknown>)
        assertFormRateLimit({
          key: `career-applications:${clientKeyFromHeaders(req.headers)}`,
          limit: 5,
        })

        const name = sanitizePersonName(data.name)
        const email = sanitizeEmail(data.email)
        const phone = sanitizePhone(data.phone)
        const location = sanitizeShortText(data.location, {
          maxLength: FIELD_LIMITS.city,
          label: 'City',
        })
        const role = sanitizeShortText(data.role, {
          maxLength: FIELD_LIMITS.role,
          label: 'Role',
        })
        const message = sanitizeMessage(data.message)
        const file = req.file as UploadedResume | undefined

        if (!file?.data || !file.name) {
          throw new APIError('Upload a resume (PDF, DOC, or DOCX).', 400, null, true)
        }
        const safeFilename = sanitizeUploadFilename(file.name, ALLOWED_EXTENSIONS)
        if ((file.size || file.data.length) > MAX_RESUME_BYTES) {
          throw new APIError('Resume must be 4 MB or smaller.', 400, null, true)
        }

        // Mutate upload metadata so storage never keeps a hostile original name.
        file.name = safeFilename

        const emailStatus = await sendCareerApplicationEmail({
          name,
          email,
          phone,
          location,
          role,
          message,
          attachment: {
            filename: safeFilename,
            content: file.data,
            contentType: file.mimetype || 'application/octet-stream',
          },
        })

        delete (data as Record<string, unknown>).companyWebsite

        return {
          ...data,
          name,
          email,
          phone,
          location,
          role,
          message,
          emailStatus,
        }
      },
    ],
  },
}
