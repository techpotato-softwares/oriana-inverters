import type { Block } from 'payload'

import { visibleBlock } from '@/fields/visibility'

export const MediaBlock: Block = visibleBlock({
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
})
