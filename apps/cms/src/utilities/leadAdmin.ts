import type { CheckboxField, FieldAccess } from 'payload'

import { authenticated } from '@/access/authenticated'

/** Sidebar unlock — submissions stay view-only until an admin turns this on and saves. */
export const allowEditField = (): CheckboxField => ({
  name: 'allowEdit',
  type: 'checkbox',
  label: 'Allow editing',
  defaultValue: false,
  admin: {
    position: 'sidebar',
    description:
      'Submissions open as view-only. Tick this, save, then edit fields. Untick again when finished.',
  },
})

/** Content fields are editable only after Allow editing is on (incoming data or saved doc). */
export const unlockedLeadFieldAccess: FieldAccess = ({ req, doc, data }) => {
  if (!authenticated({ req })) return false
  const next = data && typeof data === 'object' && 'allowEdit' in data ? data.allowEdit : undefined
  if (typeof next === 'boolean') return next
  return Boolean(doc && typeof doc === 'object' && (doc as { allowEdit?: unknown }).allowEdit)
}

const NAME_FIELD_KEYS = ['name', 'fullName', 'full_name', 'fullname', 'applicantName'] as const

/** Pull the submitter’s full name from Form Builder `submissionData` rows. */
export function fullNameFromSubmissionData(submissionData: unknown): string {
  if (!Array.isArray(submissionData)) return ''
  const rows = submissionData.flatMap((row) => {
    if (!row || typeof row !== 'object') return []
    const field = (row as { field?: unknown }).field
    const value = (row as { value?: unknown }).value
    if (typeof field !== 'string' || value == null) return []
    const text = String(value).trim()
    return text ? [{ field: field.toLowerCase(), value: text }] : []
  })
  for (const key of NAME_FIELD_KEYS) {
    const match = rows.find((row) => row.field === key.toLowerCase())
    if (match) return match.value
  }
  return ''
}
