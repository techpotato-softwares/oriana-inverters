import type { Metadata } from 'next'

import { BrandStory } from '@/components/oriana/about/brand-story/BrandStory'
import { brandStory } from '@/components/oriana/about/brand-story/brandStoryData'

export const metadata: Metadata = {
  title: 'Our Brand Story',
  description:
    'From solar experience to energy innovation — how ORIANA grew from a team of engineers in 2015 into an energy-technology brand engineered at Chakan, Pune.',
}

export default function BrandStoryPage() {
  return <BrandStory content={brandStory} />
}
