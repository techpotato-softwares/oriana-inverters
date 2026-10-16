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
  leadership: LeadershipContent | null
}) {
  const { hero, whoWeAre, technology, manufacturing, quality, vision, why } = content
  const chapters = [whoWeAre, technology, manufacturing, quality, vision, why].map(
    ({ id, eyebrow }) => ({ id, label: eyebrow }),
  )
  const team = leadership && leadership.leaders.length > 0 ? leadership : null
  const sections = [
    chapters[0],
    ...(team ? [{ id: team.id, label: team.eyebrow }] : []),
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
        secondary={team ? { label: 'Meet our leadership', href: `#${team.id}` } : undefined}
      />
      <SectionSubNav sections={sections} label="About page sections" pillId="about-subnav-pill" />
      <Breadcrumbs items={[{ label: 'About' }]} />
      <AboutIntroSection content={content.intro} />
      <WhoWeAreSection content={whoWeAre} />
      {team ? <LeadershipSection content={team} /> : null}
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
