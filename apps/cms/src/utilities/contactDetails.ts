import { isHidden } from '@/utilities/visibility'

export type ContactCardData = {
  iconKey: 'phone' | 'wrench' | 'mapPin'
  title: string
  detail: string
}

export const defaultLocationCards: ContactCardData[] = [
  {
    iconKey: 'mapPin',
    title: 'Headquarter',
    detail: 'Pune, India',
  },
  {
    iconKey: 'mapPin',
    title: 'Manufacturing Unit',
    detail:
      'Plot no 154 P, Behind GE India, Sudumbare, Chakan Phase 2, Tal: Maval, Dist: Pune, Pin: 412109',
  },
]

export const defaultContactCards: ContactCardData[] = [
  {
    iconKey: 'phone',
    title: 'Sales',
    detail: '+91 91452 28222\n+91 95031 19666\nsales@orianainverters.com',
  },
  {
    iconKey: 'wrench',
    title: 'Service',
    detail: '+91 92263 09091\n+91 77220 90206\nservice@orianainverters.com',
  },
  ...defaultLocationCards,
]

function isLocationCard(card: { title?: string | null; iconKey?: string | null }) {
  const title = card.title?.trim().toLowerCase() ?? ''
  return (
    card.iconKey === 'mapPin' ||
    title.includes('headquarter') ||
    title.includes('manufacturing') ||
    title.includes('address') ||
    title.includes('location')
  )
}

/** Keep Sales/Service from CMS when valid; always use current Headquarter / Manufacturing copy. */
export function resolveContactCards(
  cmsCards: { iconKey?: string | null; title: string; detail: string; hidden?: boolean | null }[],
): ContactCardData[] {
  if (!cmsCards.length || isPlaceholderContactCards(cmsCards)) {
    return defaultContactCards
  }

  const nonLocation = cmsCards
    .filter((card) => !isHidden(card) && !isLocationCard(card))
    .map((card) => ({
      iconKey: (card.iconKey as ContactCardData['iconKey']) || 'phone',
      title: card.title,
      detail: card.detail,
    }))

  return [...nonLocation, ...defaultLocationCards]
}

/** Cards seeded before launch carried US placeholder details; never show those publicly. */
export function isPlaceholderContactCards(cards: { detail?: string | null }[]): boolean {
  return cards.some((card) => /ORIANA-1|^United States$/i.test(card.detail?.trim() ?? ''))
}
