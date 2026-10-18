import type { Metadata } from 'next'

import { BrandStory } from '@/components/oriana/about/brand-story/BrandStory'
import { brandStory } from '@/components/oriana/about/brand-story/brandStoryData'
import { mediaUrl } from '@/utilities/cmsContent'
import { getLeadership } from '@/utilities/getLeadership'
import { getAbout } from '@/utilities/getMarketing'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout()
  const cms = about?.brandStory
  return {
    title: cms?.meta?.title || 'Our Brand Story',
    description:
      cms?.meta?.description ||
      'From solar experience to energy innovation — how ORIANA grew from a team of engineers in 2015 into an energy-technology brand engineered at Chakan, Pune.',
  }
}

export default async function BrandStoryPage() {
  const [about, leadership] = await Promise.all([getAbout(), getLeadership()])
  const cms = about?.brandStory
  const heroImage = mediaUrl(cms?.hero?.image)
  const originParagraphs = (cms?.originParagraphs ?? [])
    .map((row) => row.text?.trim())
    .filter((text): text is string => Boolean(text))

  const content = {
    ...brandStory,
    hero: {
      ...brandStory.hero,
      eyebrow: cms?.hero?.eyebrow?.trim() || brandStory.hero.eyebrow,
      title: cms?.hero?.title?.trim() || brandStory.hero.title,
      description: cms?.hero?.description?.trim() || brandStory.hero.description,
      image: heroImage
        ? { src: heroImage, alt: brandStory.hero.image.alt }
        : brandStory.hero.image,
    },
    origin:
      originParagraphs.length > 0
        ? { ...brandStory.origin, paragraphs: originParagraphs }
        : brandStory.origin,
  }

  return <BrandStory content={content} founders={leadership?.leaders ?? []} />
}
