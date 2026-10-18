import type { Metadata } from 'next'

import { Achievements } from '@/components/oriana/about/achievements/Achievements'
import {
  achievements,
  type AchievementStat,
} from '@/components/oriana/about/achievements/achievementsData'
import { mediaUrl } from '@/utilities/cmsContent'
import { getAbout } from '@/utilities/getMarketing'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout()
  const cms = about?.achievements
  return {
    title: cms?.meta?.title || achievements.meta.title,
    description: cms?.meta?.description || achievements.meta.description,
  }
}

export default async function AchievementsPage() {
  const about = await getAbout()
  const cms = about?.achievements
  const heroImage = mediaUrl(cms?.hero?.image)

  const cmsStats: AchievementStat[] = []
  for (const [index, row] of (cms?.stats ?? []).entries()) {
    const base = achievements.numbers.stats[index]
    if (!row.value?.trim() || !row.label?.trim()) continue
    cmsStats.push({
      key: (base?.key || 'supply') as AchievementStat['key'],
      value: row.value.trim(),
      label: row.label.trim(),
      description: row.description?.trim() || base?.description || '',
      ...(base?.image ? { image: base.image } : {}),
    })
  }

  const content = {
    ...achievements,
    meta: {
      title: cms?.meta?.title?.trim() || achievements.meta.title,
      description: cms?.meta?.description?.trim() || achievements.meta.description,
    },
    hero: {
      ...achievements.hero,
      eyebrow: cms?.hero?.eyebrow?.trim() || achievements.hero.eyebrow,
      title: cms?.hero?.title?.trim() || achievements.hero.title,
      description: cms?.hero?.description?.trim() || achievements.hero.description,
      video: heroImage
        ? { ...achievements.hero.video, poster: heroImage }
        : achievements.hero.video,
    },
    numbers: {
      ...achievements.numbers,
      stats: cmsStats.length > 0 ? cmsStats : achievements.numbers.stats,
    },
  }

  return <Achievements content={content as typeof achievements} />
}
