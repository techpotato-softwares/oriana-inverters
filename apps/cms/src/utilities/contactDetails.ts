export type ContactCardData = {
  iconKey: 'phone' | 'wrench' | 'mapPin'
  title: string
  detail: string
}

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
  {
    iconKey: 'mapPin',
    title: 'Headquarters',
    detail: 'Chakan MIDC, Pune, India',
  },
]

/** Cards seeded before launch carried US placeholder details; never show those publicly. */
export function isPlaceholderContactCards(cards: { detail?: string | null }[]): boolean {
  return cards.some((card) => /ORIANA-1|^United States$/i.test(card.detail?.trim() ?? ''))
}
