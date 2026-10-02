import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { sendCareerApplicationEmail } from '@/utilities/sendCareerApplicationEmail'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_RESUME_BYTES = 4 * 1024 * 1024
const ALLOWED_EXTENSIONS = new Set(['pdf', 'doc', 'docx'])

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

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
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'location', type: 'text', label: 'City' },
    { name: 'role', type: 'text', label: 'Role of interest' },
    { name: 'message', type: 'textarea', label: 'Cover note' },
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

        const name = text(data.name)
        const email = text(data.email)
        const phone = text(data.phone)
        const location = text(data.location)
        const role = text(data.role)
        const message = text(data.message)
        const file = req.file as UploadedResume | undefined
        const extension = file?.name?.split('.').pop()?.toLowerCase() || ''

        if (!name || !email || !phone) {
          throw new APIError('Name, email, and phone are required.', 400, null, true)
        }
        if (!EMAIL_PATTERN.test(email)) {
          throw new APIError('Enter a valid email address.', 400, null, true)
        }
        if (!file?.data || !file.name) {
          throw new APIError('Upload a resume (PDF, DOC, or DOCX).', 400, null, true)
        }
        if (!ALLOWED_EXTENSIONS.has(extension)) {
          throw new APIError('Resume must be a PDF, DOC, or DOCX file.', 400, null, true)
        }
        if ((file.size || file.data.length) > MAX_RESUME_BYTES) {
          throw new APIError('Resume must be 4 MB or smaller.', 400, null, true)
        }

        const emailStatus = await sendCareerApplicationEmail({
          name,
          email,
          phone,
          location,
          role,
          message,
          attachment: {
            filename: file.name,
            content: file.data,
            contentType: file.mimetype || 'application/octet-stream',
          },
        })

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
