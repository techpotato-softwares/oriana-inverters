export type ClimateTarget = {
  year: string
  title: string
  scope: string
}

export type StrategyPillar = {
  id: string
  label: string
  image: string
  stats: { value: string; label: string }[]
}

export type ReportCard = {
  title: string
  year: string
  href: string
  tag?: string
}

export const climateTargets: ClimateTarget[] = [
  {
    year: '2030',
    title: 'Achieving carbon neutrality at the operational level',
    scope: 'Scope 1 + 2',
  },
  {
    year: '2040',
    title: 'Achieving carbon neutrality across the supply chain',
    scope: 'Scope 1 + 2 + 3',
  },
  {
    year: '2050',
    title: 'Achieving net zero across the supply chain',
    scope: 'Scope 1 + 2 + 3',
  },
]

export const strategyPillars: StrategyPillar[] = [
  {
    id: 'governance',
    label: 'Governance Excellence',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '12%', label: 'R&D investment of revenue' },
      { value: '35%', label: 'R&D personnel' },
      { value: '200+', label: 'Patent applications' },
      { value: '30%', label: 'Female leadership proportion' },
    ],
  },
  {
    id: 'net-zero',
    label: 'Net-Zero Transition',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '65%', label: 'Renewable electricity usage' },
      { value: '18%', label: 'Energy use per unit vs 2020 baseline' },
      { value: '2.4 GWh', label: 'Electricity saved in 2025' },
      { value: '8 MW', label: 'Rooftop PV installed capacity' },
    ],
  },
  {
    id: 'eco-harmony',
    label: 'Eco-Harmony',
    image:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '100%', label: 'Environmental management coverage' },
      { value: '8', label: 'Products with carbon footprint data' },
      { value: '2', label: 'Eco-design pilot projects' },
      { value: '88%', label: 'Non-hazardous waste recovery rate' },
    ],
  },
  {
    id: 'prosperity',
    label: 'Mutual Prosperity',
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '96%', label: 'Customer satisfaction' },
      { value: '98%', label: 'Supplier code signing rate' },
      { value: '120+', label: 'Suppliers with ESG audits in 2025' },
      { value: '85+', label: 'Suppliers with carbon inventory' },
    ],
  },
  {
    id: 'inclusion',
    label: 'Equity & Inclusion',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '18%', label: 'Female manager proportion' },
      { value: '97%', label: 'Local hiring rate' },
      { value: '400+', label: 'Employees with certification support' },
      { value: '3,500+', label: 'Volunteer service hours' },
    ],
  },
]

export const fallbackReports: ReportCard[] = [
  {
    title: 'Oriana 2025 Sustainability Report',
    year: '2025',
    href: '/resources/downloads',
    tag: 'Enterprise',
  },
  {
    title: 'Oriana 2024 Sustainability Report',
    year: '2024',
    href: '/resources/downloads',
    tag: 'Enterprise',
  },
  {
    title: 'Oriana 2023 Sustainability Report',
    year: '2023',
    href: '/resources/downloads',
    tag: 'Enterprise',
  },
]

export const fallbackPolicies: ReportCard[] = [
  {
    title: 'Environmental Management Policy',
    year: '2025',
    href: '/resources/downloads',
    tag: 'Policy',
  },
  {
    title: 'Biodiversity Conservation Policy',
    year: '2024',
    href: '/resources/downloads',
    tag: 'Policy',
  },
  {
    title: 'Equity, Inclusion, and Diversity Policy',
    year: '2024',
    href: '/resources/downloads',
    tag: 'Policy',
  },
]

export const fallbackHonors = [
  {
    title: 'ISO 14001 Environmental Management',
    image:
      'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'RoHS & REACH Compliance',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5a15815?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Clean Energy Innovation Award',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Supplier ESG Excellence',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  },
]
