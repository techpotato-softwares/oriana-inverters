import type { Metadata } from 'next'

import { Achievements } from '@/components/oriana/about/achievements/Achievements'
import { achievements } from '@/components/oriana/about/achievements/achievementsData'

export const metadata: Metadata = {
  title: achievements.meta.title,
  description: achievements.meta.description,
}

export default function AchievementsPage() {
  return <Achievements content={achievements} />
}
