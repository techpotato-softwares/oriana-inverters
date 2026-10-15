import type { ArrayField, CheckboxField, Field } from 'payload'

const HIDDEN_ROW_LABEL = '@/components/admin/VisibilityRowLabel#VisibilityRowLabel'

type HiddenFieldOptions = {
  /** Place the checkbox in the document sidebar (collections) instead of inline. */
  sidebar?: boolean
  description?: string
}

/**
 * `hidden` defaults to false so existing rows (stored as null) stay visible.
 * Hiding keeps the data; the public site just skips it.
 */
export const hiddenField = ({ sidebar = false, description }: HiddenFieldOptions = {}): CheckboxField => ({
  name: 'hidden',
  type: 'checkbox',
  label: 'Hide on website',
  defaultValue: false,
  admin: {
    ...(sidebar ? { position: 'sidebar' as const } : {}),
    description: description ?? 'Keep this content but hide it from visitors. Untick to show it again.',
  },
})

/** Prepend a `hidden` checkbox to an array's rows and label hidden rows in the admin. */
export function visibleArray<T extends Field>(field: T): T {
  if (field.type !== 'array') return field
  const array = field as ArrayField
  if (array.fields.some((child) => 'name' in child && child.name === 'hidden')) return field
  return {
    ...array,
    fields: [hiddenField({ description: 'Hide this item from visitors without deleting it.' }), ...array.fields],
    admin: {
      ...array.admin,
      components: {
        ...array.admin?.components,
        RowLabel: array.admin?.components?.RowLabel ?? HIDDEN_ROW_LABEL,
      },
    },
  } as T
}

/** Section toggle placed at the top of a section group or tab. */
export const sectionHiddenField = (): CheckboxField =>
  hiddenField({ description: 'Hide this whole section from visitors without deleting its content.' })
