import {
  defaultLeaders,
  defaultLeadership,
  type Leader,
  type LeadershipContent,
} from '@/components/oriana/about/leadership/leadershipData'
import type { About, Media } from '@/payload-types'
import { getAbout } from '@/utilities/getMarketing'

type CmsLeadership = NonNullable<About['leadership']>
type CmsMember = NonNullable<CmsLeadership['members']>[number]

const normaliseName = (name: string) => name.trim().toLowerCase().replace(/\s+/g, ' ')

const builtInByName = new Map(defaultLeaders.map((leader) => [normaliseName(leader.name), leader]))

function photoUrl(photo: CmsMember['photo']): string | null {
  return photo && typeof photo === 'object' && (photo as Media).url ? (photo as Media).url! : null
}

function toLeader(member: CmsMember): Leader {
  const builtIn = builtInByName.get(normaliseName(member.name))
  return {
    name: member.name.trim(),
    role: member.title?.trim() || builtIn?.role || '',
    bio: member.bio?.trim() || builtIn?.bio || '',
    linkedin: member.linkedinUrl?.trim() || '',
    image: photoUrl(member.photo) || builtIn?.image || null,
  }
}

export function resolveLeadership(cms: About['leadership'] | null | undefined): LeadershipContent {
  const members = (cms?.members ?? []).filter((member) => member?.name?.trim())
  return {
    id: defaultLeadership.id,
    eyebrow: cms?.intro?.eyebrow?.trim() || defaultLeadership.eyebrow,
    title: cms?.intro?.title?.trim() || defaultLeadership.title,
    description: cms?.intro?.description?.trim() || defaultLeadership.description,
    leaders: members.length > 0 ? members.map(toLeader) : defaultLeadership.leaders,
  }
}

export async function getLeadership(): Promise<LeadershipContent> {
  const about = await getAbout()
  return resolveLeadership(about?.leadership)
}
