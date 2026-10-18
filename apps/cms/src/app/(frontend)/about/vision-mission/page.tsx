import type { Metadata } from 'next'

import { VisionMission } from '@/components/oriana/about/vision-mission/VisionMission'
import { visionMission } from '@/components/oriana/about/vision-mission/visionMissionData'
import { mediaUrl } from '@/utilities/cmsContent'
import { getAbout } from '@/utilities/getMarketing'

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout()
  const cms = about?.visionMission
  return {
    title: cms?.meta?.title || visionMission.meta.title,
    description: cms?.meta?.description || visionMission.meta.description,
  }
}

export default async function VisionMissionPage() {
  const about = await getAbout()
  const cms = about?.visionMission
  const heroImage = mediaUrl(cms?.hero?.image)

  const content = {
    ...visionMission,
    meta: {
      title: cms?.meta?.title?.trim() || visionMission.meta.title,
      description: cms?.meta?.description?.trim() || visionMission.meta.description,
    },
    hero: {
      ...visionMission.hero,
      eyebrow: cms?.hero?.eyebrow?.trim() || visionMission.hero.eyebrow,
      title: cms?.hero?.title?.trim() || visionMission.hero.title,
      description: cms?.hero?.description?.trim() || visionMission.hero.description,
      video: heroImage
        ? { ...visionMission.hero.video, poster: heroImage }
        : visionMission.hero.video,
    },
    vision: {
      ...visionMission.vision,
      statement: cms?.visionStatement?.trim() || visionMission.vision.statement,
    },
    mission: {
      ...visionMission.mission,
      statement: cms?.missionStatement?.trim() || visionMission.mission.statement,
    },
  }

  return <VisionMission content={content} />
}
