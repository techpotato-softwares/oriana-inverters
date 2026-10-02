import { CommitmentsTimeline } from '@/components/oriana/sustainability/CommitmentsTimeline'
import { ImpactBand } from '@/components/oriana/sustainability/ImpactBand'
import { ImpactCalculator } from '@/components/oriana/sustainability/ImpactCalculator'
import { PillarsShowcase } from '@/components/oriana/sustainability/PillarsShowcase'
import {
  SustainabilityHonors,
  type SustainabilityHonor,
  SustainabilityNews,
  type SustainabilityNewsItem,
  SustainabilityReports,
} from '@/components/oriana/sustainability/SustainabilityDocs'
import { SustainabilityCta } from '@/components/oriana/sustainability/SustainabilityCta'
import { SustainabilityHero } from '@/components/oriana/sustainability/SustainabilityHero'
import type {
  CalculatorConfig,
  ReportCard,
  SectionIntro,
  SustainabilityCommitment,
  SustainabilityCtaContent,
  SustainabilityHighlight,
  SustainabilityPillar,
} from '@/components/oriana/sustainability/sustainabilityData'

export type { SustainabilityHonor, SustainabilityNewsItem }

export type SustainabilityOverviewProps = {
  hero: {
    eyebrow?: string
    title: string
    description?: string
    videoSrc: string
    posterSrc: string
  }
  highlights: SustainabilityHighlight[]
  pillarsIntro: SectionIntro
  pillars: SustainabilityPillar[]
  calculator: CalculatorConfig
  commitmentsIntro: SectionIntro
  commitments: SustainabilityCommitment[]
  reports?: ReportCard[]
  policies?: ReportCard[]
  honors?: SustainabilityHonor[]
  news?: SustainabilityNewsItem[]
  cta: SustainabilityCtaContent
}

export function SustainabilityOverview({
  hero,
  highlights,
  pillarsIntro,
  pillars,
  calculator,
  commitmentsIntro,
  commitments,
  reports = [],
  policies = [],
  honors = [],
  news = [],
  cta,
}: SustainabilityOverviewProps) {
  return (
    <main>
      <SustainabilityHero {...hero} />
      <ImpactBand items={highlights} />
      <PillarsShowcase intro={pillarsIntro} pillars={pillars} />
      <ImpactCalculator config={calculator} />
      <CommitmentsTimeline intro={commitmentsIntro} commitments={commitments} />
      <SustainabilityReports reports={reports} policies={policies} />
      <SustainabilityHonors honors={honors} />
      <SustainabilityNews news={news} />
      <SustainabilityCta content={cta} />
    </main>
  )
}
