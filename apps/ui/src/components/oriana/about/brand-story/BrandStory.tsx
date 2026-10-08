import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { MediaHero } from '@/components/oriana/MediaHero'
import type { BrandStoryContent } from '@/components/oriana/about/brand-story/brandStoryData'
import { StoryMilestones } from '@/components/oriana/about/brand-story/StoryMilestones'
import {
  EcosystemSection,
  GlobalVisionSection,
  IndiaSection,
  JourneySection,
  OriginSection,
  PurposeSection,
  StoryRecapSection,
  UnitsSection,
  VisionSection,
} from '@/components/oriana/about/brand-story/StorySections'

export function BrandStory({ content }: { content: BrandStoryContent }) {
  const { hero } = content
  return (
    <main>
      <MediaHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        imageSrc={hero.image.src}
        imageAlt={hero.image.alt}
        primary={{ label: 'Read our story', href: '#origin' }}
        secondary={{ label: 'Explore products', href: '/products' }}
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Brand Story' }]} />
      <StoryMilestones milestones={content.milestones} />
      <OriginSection content={content.origin} />
      <VisionSection content={content.vision} />
      <JourneySection content={content.journey} />
      <UnitsSection content={content.units} />
      <IndiaSection content={content.india} />
      <EcosystemSection content={content.ecosystem} />
      <PurposeSection content={content.purpose} />
      <GlobalVisionSection content={content.globalVision} />
      <StoryRecapSection content={content.recap} />
    </main>
  )
}
