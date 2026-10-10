import type { Metadata } from 'next'

import { VisionMission } from '@/components/oriana/about/vision-mission/VisionMission'
import { visionMission } from '@/components/oriana/about/vision-mission/visionMissionData'

export const metadata: Metadata = {
  title: visionMission.meta.title,
  description: visionMission.meta.description,
}

export default function VisionMissionPage() {
  return <VisionMission content={visionMission} />
}
