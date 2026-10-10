import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { SectionSubNav } from '@/components/oriana/SectionSubNav'
import { LeadershipSection } from '@/components/oriana/about/leadership/LeadershipSection'
import type { LeadershipContent } from '@/components/oriana/about/leadership/leadershipData'
import {
  AboutIntroSection,
  AboutVisionSection,
  CommitmentSection,
  ManufacturingSection,
  QualitySection,
  TechnologySection,
  WhoWeAreSection,
  WhyOrianaSection,
} from '@/components/oriana/about/overview/AboutSections'
import type { AboutOverviewContent } from '@/components/oriana/about/overview/aboutOverviewData'
import { AboutExplore } from '@/components/oriana/about/shared/AboutExplore'
import { AboutHero } from '@/components/oriana/about/shared/AboutHero'

export function AboutOverview({
  content,
  leadership,
}: {
  content: AboutOverviewContent
  leadership: LeadershipContent
}) {
  const { hero, whoWeAre, technology, manufacturing, quality, vision, why } = content
  const chapters = [whoWeAre, technology, manufacturing, quality, vision, why].map(
    ({ id, number, eyebrow }) => ({ id, number, label: eyebrow }),
  )
  const sections = [
    chapters[0],
    { id: leadership.id, label: leadership.eyebrow },
    ...chapters.slice(1),
  ]

  return (
    <main>
      <AboutHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        media={{ kind: 'video', src: hero.video.src, poster: hero.video.poster }}
        primary={{ label: 'Who we are', href: `#${whoWeAre.id}` }}
        secondary={{ label: 'Meet our leadership', href: `#${leadership.id}` }}
      />
      <SectionSubNav sections={sections} label="About page sections" pillId="about-subnav-pill" />
      <Breadcrumbs items={[{ label: 'About' }]} />
      <AboutIntroSection content={content.intro} />
      <WhoWeAreSection content={whoWeAre} />
      <LeadershipSection content={leadership} />
      <TechnologySection content={technology} />
      <ManufacturingSection content={manufacturing} />
      <QualitySection content={quality} />
      <AboutVisionSection content={vision} />
      <WhyOrianaSection content={why} />
      <AboutExplore title={content.explore.title} links={content.explore.links} />
      <CommitmentSection content={content.commitment} />
    </main>
  )
}
