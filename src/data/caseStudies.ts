export type CaseStudy = {
  slug: string
  title: string
  segment: string
  capacity: string
  products: string
  productSlugs: string[]
  location: string
  image: string
  summary: string
  challenge: string
  solution: string
  results: string[]
  stats: { label: string; value: string }[]
  year: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'california-commercial-12mw',
    title: '12 MW Commercial Rooftop — California',
    segment: 'Commercial & Industrial',
    capacity: '12 MW',
    products: 'ORI-S5(75-125)K-US',
    productSlugs: ['ori-s5-75-125k-us'],
    location: 'Ontario, California, USA',
    image: '/assets/products/three-phase.svg',
    summary:
      'A multi-building logistics campus deployed 12 MW across 8 rooftops using Oriana three-phase string inverters with fleet monitoring.',
    challenge:
      'The logistics operator needed to offset peak demand charges across eight separate warehouse rooftops with varying orientations, limited electrical room space, and strict fire code setbacks.',
    solution:
      'Oriana ORI-S5 three-phase string inverters were deployed in a distributed architecture with multi-MPPT tracking per roof section. A centralized monitoring gateway aggregates fleet performance and alerts the O&M provider in real time.',
    results: [
      '12 MW AC capacity across 8 buildings commissioned in 14 weeks',
      'Estimated 38% reduction in annual electricity costs',
      'Fleet availability above 99.2% in first year of operation',
      'AFCI and rapid shutdown compliance across all interconnection points',
    ],
    stats: [
      { label: 'Installed Capacity', value: '12 MW' },
      { label: 'Inverter Units', value: '96' },
      { label: 'Buildings', value: '8' },
      { label: 'Commissioned', value: '2024' },
    ],
    year: '2024',
  },
  {
    slug: 'texas-utility-250mw',
    title: '250 MW Utility Solar Farm — Texas',
    segment: 'Utility-Scale',
    capacity: '250 MW',
    products: 'ORI-GU250K-EHV-US',
    productSlugs: ['ori-gu250k-ehv-us'],
    location: 'West Texas, USA',
    image: '/assets/products/utility-scale.svg',
    summary:
      'IPP project delivering grid-forming capability and 99.6% peak efficiency across 1,000+ inverter units in a desert climate.',
    challenge:
      'The independent power producer required a bankable utility-scale platform capable of operating on a weak rural grid, with minimal downtime during the 110°F summer peak and modular serviceability for remote site maintenance.',
    solution:
      'Oriana ORI-GU250K central inverters were installed in outdoor-rated IP65 skids with grid-forming firmware. Redundant communication paths and hot-swap power modules reduce mean time to repair.',
    results: [
      '250 MW AC nameplate with 99.6% peak inverter efficiency',
      'Grid-forming capability validated for weak-grid interconnection',
      'Modular service design reduced average repair time to under 4 hours',
      'Performance ratio above 82% in year-one production report',
    ],
    stats: [
      { label: 'Installed Capacity', value: '250 MW' },
      { label: 'Inverter Skids', value: '1,000+' },
      { label: 'Peak Efficiency', value: '99.6%' },
      { label: 'Commissioned', value: '2023' },
    ],
    year: '2023',
  },
  {
    slug: 'florida-residential-community',
    title: 'Residential Community — Florida',
    segment: 'Residential',
    capacity: '4.2 MW aggregate',
    products: 'ORI-S6-EH1P Hybrid',
    productSlugs: ['ori-s6-eh1p-hybrid'],
    location: 'Tampa Bay, Florida, USA',
    image: '/assets/products/hybrid-storage.svg',
    summary:
      '200-home community with hybrid storage, hurricane backup, and time-of-use optimization via Oriana monitoring platform.',
    challenge:
      'A master-planned community developer wanted every home equipped with solar plus battery backup for hurricane resilience, while keeping installation costs predictable and homeowner UX simple.',
    solution:
      'ORI-S6-EH1P hybrid inverters with 10 kWh battery packs were standardized across 200 homes. The Oriana Monitoring app provides per-home production, backup status, and time-of-use scheduling.',
    results: [
      '4.2 MW aggregate rooftop capacity across 200 homes',
      'UPS-level switching under 10 ms during grid outages',
      'Average self-consumption rate of 72% across the community',
      'Installer training programme reduced per-home commissioning to 3.5 hours',
    ],
    stats: [
      { label: 'Homes', value: '200' },
      { label: 'Avg. System Size', value: '8.4 kW' },
      { label: 'Battery Backup', value: '10 kWh / home' },
      { label: 'Commissioned', value: '2025' },
    ],
    year: '2025',
  },
  {
    slug: 'germany-industrial-microgrid',
    title: 'Industrial Microgrid — Germany',
    segment: 'Energy Storage',
    capacity: '2.5 MW / 5 MWh',
    products: 'ORI-S6-EH3P Hybrid',
    productSlugs: ['ori-s6-eh3p-hybrid'],
    location: 'Stuttgart, Germany',
    image: '/assets/products/hybrid-storage.svg',
    summary:
      'Factory microgrid combining PV, battery storage, and peak shaving to reduce grid demand charges by 35%.',
    challenge:
      'An automotive parts manufacturer faced rising demand charges from short-duration production peaks. The site needed PV, storage, and load management integrated without disrupting 24/7 production lines.',
    solution:
      'A 2.5 MW rooftop PV array pairs with ORI-S6-EH3P hybrid inverters and a 5 MWh lithium battery system. The Oriana EMS coordinates peak shaving, self-consumption, and optional grid services revenue.',
    results: [
      '35% reduction in annual demand charges in first operating year',
      'PV self-consumption rate increased from 45% to 78%',
      'Black-start capability validated for critical production lines',
      'ISO 50001 energy management alignment for ESG reporting',
    ],
    stats: [
      { label: 'PV Capacity', value: '2.5 MW' },
      { label: 'Storage', value: '5 MWh' },
      { label: 'Demand Charge Savings', value: '35%' },
      { label: 'Commissioned', value: '2024' },
    ],
    year: '2024',
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((cs) => cs.slug)
}
