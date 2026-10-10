import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
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
import type { Leader } from '@/components/oriana/about/leadership/leadershipData'
import { AboutHero } from '@/components/oriana/about/shared/AboutHero'

export function BrandStory({ content, founders }: { content: BrandStoryContent; founders: Leader[] }) {
  const { hero } = content
  return (
    <main>
      <AboutHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        media={{ kind: 'image', src: hero.image.src, alt: hero.image.alt }}
        primary={{ label: 'Read our story', href: '#origin' }}
        secondary={{ label: 'Explore products', href: '/products' }}
      />
      <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Brand Story' }]} />
      <StoryMilestones milestones={content.milestones} />
      <OriginSection content={content.origin} founders={founders} />
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
