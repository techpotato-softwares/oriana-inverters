/** Built-in leadership copy — About Pages › Leadership in the admin replaces it when filled. */

export type Leader = {
  name: string
  role: string
  bio: string
  linkedin: string
  /** Null renders an initials placeholder. */
  image: string | null
}

export type LeadershipContent = {
  id: string
  eyebrow: string
  title: string
  description: string
  leaders: Leader[]
}

export const LEADERSHIP_SECTION_ID = 'leadership'

export const defaultLeaders: Leader[] = [
  {
    name: 'Gaurav Mahajan',
    role: 'Co-Founder & Director',
    bio: 'Building ORIANA into a globally trusted energy-technology brand from India.',
    linkedin: '',
    image: '/assets/about/leadership/gaurav-mahajan.jpg',
  },
  {
    name: 'Rushikesh Gulve',
    role: 'Co-Founder & Director',
    bio: 'Turning a decade of solar-industry experience into reliable, real-world inverter technology.',
    linkedin: '',
    image: '/assets/about/leadership/rushikesh-gulve.jpg',
  },
  {
    name: 'Rohan Shelar',
    role: 'Co-Founder & Director',
    bio: 'Growing ORIANA’s engineering and manufacturing ecosystem at Chakan, Pune.',
    linkedin: '',
    image: '/assets/about/leadership/rohan-shelar.jpg',
  },
]

export const defaultLeadership: LeadershipContent = {
  id: LEADERSHIP_SECTION_ID,
  eyebrow: 'Leadership',
  title: 'Founded by engineers. Led with conviction.',
  description:
    'ORIANA began in 2015 with a team of engineers who spent over a decade across solar project development and inverter distribution — and believed they could build something better.',
  leaders: defaultLeaders,
}

export function leaderInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}
