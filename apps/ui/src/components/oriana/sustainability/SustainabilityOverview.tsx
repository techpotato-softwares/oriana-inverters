import { CommitmentsTimeline } from '@/components/oriana/sustainability/CommitmentsTimeline'
import { ImpactBand } from '@/components/oriana/sustainability/ImpactBand'
import { ImpactCalculator } from '@/components/oriana/sustainability/ImpactCalculator'
import { PillarsShowcase } from '@/components/oriana/sustainability/PillarsShowcase'
import {
  SustainabilityHonors,
  type SustainabilityHonor,
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

export type { SustainabilityHonor }

export type SustainabilityOverviewProps = {
  hero: {
    eyebrow?: string
    title: string
    description?: string
    videoSrc: string
    posterSrc: string
  }
  /** Empty lists and `null` sections are not rendered (hidden in the CMS). */
  highlights: SustainabilityHighlight[]
  pillarsIntro: SectionIntro
  pillars: SustainabilityPillar[]
  calculator: CalculatorConfig | null
  commitmentsIntro: SectionIntro
  commitments: SustainabilityCommitment[]
  reports?: ReportCard[]
  policies?: ReportCard[]
  honors?: SustainabilityHonor[]
  cta: SustainabilityCtaContent | null
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
  cta,
}: SustainabilityOverviewProps) {
  return (
    <main>
      <SustainabilityHero {...hero} />
      {highlights.length > 0 ? <ImpactBand items={highlights} /> : null}
      {pillars.length > 0 ? <PillarsShowcase intro={pillarsIntro} pillars={pillars} /> : null}
      {calculator ? <ImpactCalculator config={calculator} /> : null}
      {commitments.length > 0 ? (
        <CommitmentsTimeline intro={commitmentsIntro} commitments={commitments} />
      ) : null}
      <SustainabilityReports reports={reports} policies={policies} />
      <SustainabilityHonors honors={honors} />
      {cta ? <SustainabilityCta content={cta} /> : null}
    </main>
  )
}
