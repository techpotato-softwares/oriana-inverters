import type { CardItem, Intro, LinkItem, PageMeta } from '../marketing/types'

type SubpageHero = { eyebrow: string; title: string; description: string }

export const aboutCertifications = {
  meta: {
    title: 'Certifications & Awards',
    description: 'Oriana product certifications, grid code compliance, and industry awards.',
  } satisfies PageMeta,
  hero: {
    eyebrow: 'About',
    title: 'Certifications & Awards',
    description:
      "Oriana products meet the world's most stringent safety, grid interconnection, and quality standards.",
  } satisfies SubpageHero,
  certificationsTitle: 'Product Certifications',
  awardsTitle: 'Industry Recognition',
  emptyDescription:
    'Official certification and award listings will appear here once published in the CMS.',
}

export const aboutPartners = {
  meta: {
    title: 'Partners',
    description: 'Oriana strategic partners — distributors, EPCs, and technology alliances.',
  } satisfies PageMeta,
  hero: {
    eyebrow: 'About',
    title: 'Partners',
    description:
      'We work with a global network of distributors, installers, and technology partners to deliver bankable solar solutions.',
  } satisfies SubpageHero,
  programmeLink: { label: 'Explore partner programmes', href: '/partners' } satisfies LinkItem,
  emptyDescription:
    'Named partner listings will appear here once published. Explore distributor programmes meanwhile.',
  emptyCta: { label: 'Become a distributor', href: '/partners/become-a-distributor' } satisfies LinkItem,
}

export const aboutFoundation = {
  meta: {
    title: 'Oriana Foundation',
    description:
      'The Oriana Foundation supports community solar access, STEM education, and environmental stewardship programmes.',
  } satisfies PageMeta,
  hero: {
    eyebrow: 'About Us',
    title: 'Oriana Foundation',
    description:
      'Community solar access, STEM education, and environmental stewardship programmes supported by Oriana.',
  } satisfies SubpageHero,
  intro: {
    eyebrow: 'Programmes',
    title: 'Where the foundation works',
  } satisfies Intro,
  programmes: [] as CardItem[],
  cta: { label: 'Partner with us', href: '/contact?intent=sales#contact-form' } satisfies LinkItem,
  emptyDescription:
    'Foundation programmes and impact stories are being prepared. Contact us if you would like to partner on community energy initiatives.',
}
