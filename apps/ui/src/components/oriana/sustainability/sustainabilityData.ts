export type ReportCard = {
  title: string
  year: string
  href: string
  tag?: string
}

export type SustainabilityHighlight = {
  value: string
  label: string
  description?: string
}

export type PillarIcon =
  | 'shield-check'
  | 'cpu'
  | 'factory'
  | 'boxes'
  | 'users'
  | 'map-pin'
  | 'recycle'
  | 'refresh-cw'
  | 'leaf'
  | 'sun'

export type SustainabilityPillar = {
  title: string
  headline: string
  body: string
  icon: PillarIcon
  image: string
}

export type CalculatorConfig = {
  title: string
  description: string
  kwhPerKw: number
  co2TonnesPerKw: number
  treesPerKw: number
  disclaimer: string
}

export type SustainabilityCommitment = {
  phase: string
  timeframe: string
  title: string
  body?: string
}

export type SectionIntro = {
  eyebrow?: string
  title: string
  description?: string
}

export type CtaLink = { label: string; href: string }

export type SustainabilityCtaContent = {
  title: string
  body?: string
  primary: CtaLink
  secondary?: CtaLink
  image: string
  contactEmail?: string
}

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`

export const defaultHero = {
  eyebrow: 'Our Commitment',
  title: 'Powering India’s Clean Energy Transition from the Ground Up.',
  description:
    'We engineer every unit for product longevity, responsible manufacturing, and circular lifecycles.',
  videoSrc: '/assets/sustainability/hero.mp4',
  posterSrc: '/assets/sustainability/hero-poster.jpg',
}

export const defaultHighlights: SustainabilityHighlight[] = [
  {
    value: '97%+',
    label: 'Peak efficiency',
    description: 'Minimising conversion losses across the grid.',
  },
  {
    value: '100%',
    label: 'Recyclable packaging goal',
    description: 'Phasing out single-use expanded plastics.',
  },
  {
    value: 'Make in India',
    label: 'Localised sourcing',
    description: 'Fewer long-haul carbon miles in every unit.',
  },
]

export const defaultPillarsIntro: SectionIntro = {
  eyebrow: 'Core pillars',
  title: 'Sustainability built in, from day one',
  description: 'Four principles shape how we design, build, and support every Oriana product.',
}

export const defaultPillars: SustainabilityPillar[] = [
  {
    title: 'Design for Longevity',
    headline: 'Built to outlast, not to be replaced',
    body: 'The greenest hardware is the one that stays out of landfills for decades. Our systems feature high-grade thermal engineering, industrial-grade silicon, and repairable component architecture that maximises uptime and energy yield across India’s harsh climate conditions.',
    icon: 'shield-check',
    image: unsplash('1518770660439-4636190af475'),
  },
  {
    title: 'Responsible Manufacturing',
    headline: 'Cleaner practices on the shop floor',
    body: 'Clean energy hardware should not be born from dirty manufacturing. We enforce lead-free soldering, RoHS-compliant electronics, water-conscious assembly, and corrugated honeycomb cushioning in place of single-use Styrofoam.',
    icon: 'factory',
    image: unsplash('1581092918056-0c4c3acd3789'),
  },
  {
    title: 'Local Communities',
    headline: 'Made in India, building resilience',
    body: 'Sourcing components locally strengthens domestic manufacturing and cuts international freight emissions. We invest in local engineering talent, transparent workplace safety standards, and regional technician upskilling.',
    icon: 'users',
    image: unsplash('1624397640148-949b1732bb0a'),
  },
  {
    title: 'Circularity & E-Waste',
    headline: 'Lifecycle responsibility beyond the sale',
    body: 'Aligned with India’s E-Waste (Management) Rules, our enclosures and modular components are designed for straightforward disassembly, material recovery of aluminium, copper, and PCB silicon, and verified recycling partnerships.',
    icon: 'recycle',
    image: unsplash('1532996122724-e3c354a0b15b'),
  },
]

export const defaultCalculator: CalculatorConfig = {
  title: 'Sustainability in numbers',
  description: 'Move the slider to see what a solar installation can displace every year.',
  kwhPerKw: 1450,
  co2TonnesPerKw: 1.2,
  treesPerKw: 15,
  disclaimer:
    'Estimates calculated using Central Electricity Authority (CEA) average grid emission factors. Actual results vary with location, orientation, and system design.',
}

export const defaultCommitmentsIntro: SectionIntro = {
  eyebrow: 'Roadmap',
  title: 'Our day-one commitments',
  description: 'A practical baseline we are delivering on now, and building towards next.',
}

export const defaultCommitments: SustainabilityCommitment[] = [
  {
    phase: 'Phase 1',
    timeframe: 'Current',
    title: 'Plastic-minimised dispatch and RoHS lines',
    body: '100% plastic-minimised dispatch boxes and RoHS-compliant manufacturing lines.',
  },
  {
    phase: 'Phase 2',
    timeframe: 'Next 12 months',
    title: 'Solar-powered shop floor',
    body: 'Moving testing and assembly power consumption to self-hosted rooftop solar.',
  },
  {
    phase: 'Phase 3',
    timeframe: 'Long-term',
    title: 'Closed-loop takeback',
    body: 'A certified takeback and refurbishment programme for field units across India.',
  },
]

export const defaultCta: SustainabilityCtaContent = {
  title: 'Join us in accelerating India’s solar decade.',
  body: 'Partner with Oriana to deploy efficient, long-lived inverters built responsibly in India.',
  primary: { label: 'Partner With Us', href: '/contact' },
  secondary: { label: 'Download Product Spec Sheets', href: '/products' },
  image: unsplash('1497440001374-f26997328c1b', 2000),
  contactEmail: 'esg@orianainverters.com',
}
