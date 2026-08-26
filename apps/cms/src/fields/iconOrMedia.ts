import type { Field } from 'payload'

/** Lucide icon keys used across Oriana marketing UI (fallback when no upload). */
export const lucideIconOptions = [
  { label: 'Award', value: 'award' },
  { label: 'Globe', value: 'globe' },
  { label: 'Headphones', value: 'headphones' },
  { label: 'Leaf', value: 'leaf' },
  { label: 'Microscope', value: 'microscope' },
  { label: 'Shield', value: 'shield' },
  { label: 'Phone', value: 'phone' },
  { label: 'Mail', value: 'mail' },
  { label: 'Map pin', value: 'mapPin' },
  { label: 'Download', value: 'download' },
  { label: 'Wrench', value: 'wrench' },
  { label: 'Users', value: 'users' },
  { label: 'Building', value: 'building' },
  { label: 'Zap', value: 'zap' },
  { label: 'Check circle', value: 'checkCircle' },
] as const

export type LucideIconKey = (typeof lucideIconOptions)[number]['value']

/** Prefer uploaded media; optional Lucide key for simple UI icons. */
export const iconOrMediaFields: Field[] = [
  {
    name: 'icon',
    type: 'upload',
    relationTo: 'media',
    admin: { description: 'Preferred: upload an SVG/PNG icon.' },
  },
  {
    name: 'iconKey',
    type: 'select',
    options: [...lucideIconOptions],
    admin: {
      description: 'Fallback Lucide icon when no upload is set.',
    },
  },
]
