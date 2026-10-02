import type { Field } from 'payload'

/** Icon keys rendered by `MarketingIcon` in apps/ui. Keep both lists in sync. */
export const marketingIconOptions = [
  { label: 'Store', value: 'store' },
  { label: 'Handshake', value: 'handshake' },
  { label: 'Headset', value: 'headset' },
  { label: 'Headphones', value: 'headphones' },
  { label: 'Book', value: 'book-open' },
  { label: 'Globe', value: 'globe' },
  { label: 'Megaphone', value: 'megaphone' },
  { label: 'Monitor', value: 'monitor-cog' },
  { label: 'Wrench', value: 'wrench' },
  { label: 'Life buoy', value: 'life-buoy' },
  { label: 'Shield', value: 'shield-check' },
  { label: 'Badge', value: 'badge-check' },
  { label: 'Document', value: 'file-text' },
  { label: 'Help', value: 'circle-help' },
  { label: 'Users', value: 'users' },
  { label: 'Award', value: 'award' },
  { label: 'Zap', value: 'zap' },
  { label: 'Leaf', value: 'leaf' },
] as const

export const iconSelect = (name = 'icon'): Field => ({
  name,
  type: 'select',
  options: [...marketingIconOptions],
})

/** Eyebrow + heading + supporting line for a page section. */
export const sectionIntro = (name: string, label?: string): Field => ({
  name,
  type: 'group',
  label,
  admin: { description: 'Leave blank to keep the default copy.' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
  ],
})

/** Optional label + href. Both must be filled for the link to override the default. */
export const optionalLink = (name: string, label?: string): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', admin: { width: '50%' } },
        {
          name: 'href',
          type: 'text',
          admin: { width: '50%', description: 'Internal path (/contact) or full URL.' },
        },
      ],
    },
  ],
})

export const linkList = (name: string, label?: string): Field => ({
  name,
  type: 'array',
  label,
  admin: { description: 'Leave empty to keep the default links.' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'href', type: 'text', required: true, admin: { width: '50%' } },
      ],
    },
  ],
})

/** Dark call-to-action band: heading, body, two buttons. */
export const ctaBand = (name = 'cta', label = 'Call to action'): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    { name: 'title', type: 'text' },
    { name: 'body', type: 'textarea' },
    optionalLink('primary', 'Primary button'),
    optionalLink('secondary', 'Secondary button'),
  ],
})

type CardOptions = {
  label?: string
  icon?: boolean
  image?: boolean
  link?: boolean
  tag?: boolean
  highlights?: boolean
}

/** Repeating card: title + body, plus optional icon, image, link, tag, and bullet list. */
export const cardList = (name: string, options: CardOptions = {}): Field => ({
  name,
  type: 'array',
  label: options.label,
  admin: { description: 'Leave empty to keep the default cards.' },
  fields: [
    ...(options.tag ? [{ name: 'tag', type: 'text' } as Field] : []),
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    ...(options.icon ? [iconSelect()] : []),
    ...(options.image
      ? [{ name: 'image', type: 'upload', relationTo: 'media' } as Field]
      : []),
    ...(options.link
      ? [
          {
            type: 'row',
            fields: [
              { name: 'href', type: 'text', admin: { width: '50%' } },
              { name: 'linkLabel', type: 'text', admin: { width: '50%' } },
            ],
          } as Field,
        ]
      : []),
    ...(options.highlights
      ? [
          {
            name: 'highlights',
            type: 'array',
            fields: [{ name: 'text', type: 'text', required: true }],
          } as Field,
        ]
      : []),
  ],
})

/** Hero copy for a subpage: eyebrow, title, description, and a background image when the layout shows one. */
export const subpageHero = (name = 'hero', { image = false }: { image?: boolean } = {}): Field => ({
  name,
  type: 'group',
  label: 'Hero',
  admin: { description: 'Leave blank to keep the default copy.' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    ...(image ? [{ name: 'image', type: 'upload', relationTo: 'media' } as Field] : []),
  ],
})

/** Per-subpage search metadata. */
export const pageMeta = (name = 'meta'): Field => ({
  name,
  type: 'group',
  label: 'Search metadata',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
  ],
})

/** Revalidate a route segment (and its subpages) plus a cache tag after a global save. */
export const revalidateGlobal =
  (tag: string, paths: string[]) =>
  ({ doc, req: { context } }: { doc: unknown; req: { context: { disableRevalidate?: boolean } } }) => {
    if (context.disableRevalidate) return doc
    void import('next/cache').then(({ revalidatePath, revalidateTag }) => {
      revalidateTag(tag)
      for (const path of paths) revalidatePath(path, 'layout')
    })
    return doc
  }
