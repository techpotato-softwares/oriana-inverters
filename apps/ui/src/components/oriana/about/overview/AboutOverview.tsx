import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { MediaHero } from '@/components/oriana/MediaHero'
import { SectionSubNav } from '@/components/oriana/SectionSubNav'
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

export function AboutOverview({ content }: { content: AboutOverviewContent }) {
  const { hero, whoWeAre, technology, manufacturing, quality, vision, why } = content
  const sections = [whoWeAre, technology, manufacturing, quality, vision, why].map(
    ({ id, number, eyebrow }) => ({ id, number, label: eyebrow }),
  )

  return (
    <main>
      <MediaHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        imageSrc={hero.image.src}
        imageAlt={hero.image.alt}
        primary={{ label: 'Who we are', href: `#${whoWeAre.id}` }}
        secondary={{ label: 'Explore products', href: '/products' }}
      />
      <SectionSubNav sections={sections} label="About page sections" pillId="about-subnav-pill" />
      <Breadcrumbs items={[{ label: 'About' }]} />
      <AboutIntroSection content={content.intro} />
      <WhoWeAreSection content={whoWeAre} />
      <TechnologySection content={technology} />
      <ManufacturingSection content={manufacturing} />
      <QualitySection content={quality} />
      <AboutVisionSection content={vision} />
      <WhyOrianaSection content={why} />
      <CommitmentSection content={content.commitment} />
    </main>
  )
}
