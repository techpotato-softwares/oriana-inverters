/**
 * CMS-shaped Sustainability global — hub + strategy (+ SEO).
 * Reports PDFs live in the Sustainability Reports collection (not this global).
 */

export type SustainabilitySeedImages = {
  heroPoster?: number | string | null
  pillar?: Array<number | string | null>
  cta?: number | string | null
}

function withImage<T extends Record<string, unknown>>(
  row: T,
  image: number | string | null | undefined,
): T {
  if (image == null) return row
  return { ...row, image }
}

export function buildSustainabilityGlobalData(images: SustainabilitySeedImages = {}) {
  return {
    hero: {
      eyebrow: 'Our Commitment',
      title: 'Powering India’s Clean Energy Transition from the Ground Up.',
      description:
        'We engineer every unit for product longevity, responsible manufacturing, and circular lifecycles.',
      ...(images.heroPoster != null ? { image: images.heroPoster } : {}),
    },
    ...(images.heroPoster != null ? { image: images.heroPoster } : {}),
    highlightsHidden: false,
    highlights: [
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
    ],
    approachTitle: 'Our Approach',
    approachBody:
      'Every Oriana inverter helps displace fossil generation over a 25+ year operational life.',
    links: [
      { label: 'Our Strategy', href: '/sustainability/strategy' },
      { label: 'Reports & Policies →', href: '/sustainability/reports' },
    ],
    pillarsHidden: false,
    pillarsIntro: {
      eyebrow: 'Core pillars',
      title: 'Sustainability built in, from day one',
      description: 'Four principles shape how we design, build, and support every Oriana product.',
    },
    pillars: [
      withImage(
        {
          title: 'Design for Longevity',
          headline: 'Built to outlast, not to be replaced',
          body: 'The greenest hardware is the one that stays out of landfills for decades. Our systems feature high-grade thermal engineering, industrial-grade silicon, and repairable component architecture that maximises uptime and energy yield across India’s harsh climate conditions.',
          icon: 'shield-check',
        },
        images.pillar?.[0],
      ),
      withImage(
        {
          title: 'Responsible Manufacturing',
          headline: 'Cleaner practices on the shop floor',
          body: 'Clean energy hardware should not be born from dirty manufacturing. We enforce lead-free soldering, RoHS-compliant electronics, water-conscious assembly, and corrugated honeycomb cushioning in place of single-use Styrofoam.',
          icon: 'factory',
        },
        images.pillar?.[1],
      ),
      withImage(
        {
          title: 'Local Communities',
          headline: 'Made in India, building resilience',
          body: 'Sourcing components locally strengthens domestic manufacturing and cuts international freight emissions. We invest in local engineering talent, transparent workplace safety standards, and regional technician upskilling.',
          icon: 'users',
        },
        images.pillar?.[2],
      ),
      withImage(
        {
          title: 'Circularity & E-Waste',
          headline: 'Lifecycle responsibility beyond the sale',
          body: 'Aligned with India’s E-Waste (Management) Rules, our enclosures and modular components are designed for straightforward disassembly, material recovery of aluminium, copper, and PCB silicon, and verified recycling partnerships.',
          icon: 'recycle',
        },
        images.pillar?.[3],
      ),
    ],
    calculator: {
      hidden: false,
      title: 'Sustainability in numbers',
      description: 'Move the slider to see what a solar installation can displace every year.',
      kwhPerKw: 1450,
      co2TonnesPerKw: 1.2,
      treesPerKw: 15,
      disclaimer:
        'Estimates calculated using Central Electricity Authority (CEA) average grid emission factors. Actual results vary with location, orientation, and system design.',
    },
    commitmentsHidden: false,
    commitmentsIntro: {
      eyebrow: 'Roadmap',
      title: 'Our day-one commitments',
      description: 'A practical baseline we are delivering on now, and building towards next.',
    },
    commitments: [
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
    ],
    cta: {
      hidden: false,
      title: 'Join us in accelerating India’s solar decade.',
      body: 'Partner with Oriana to deploy efficient, long-lived inverters built responsibly in India.',
      primary: { label: 'Partner With Us', href: '/contact' },
      secondary: { label: 'Download Product Spec Sheets', href: '/products' },
      contactEmail: 'esg@orianainverters.com',
      ...(images.cta != null ? { image: images.cta } : {}),
    },
    strategyHero: {
      eyebrow: 'Sustainability',
      title: 'Sustainability Strategy',
      description:
        'Five focus areas guide how we design, manufacture, and support Oriana inverters — from net-zero operations to circular lifecycles.',
    },
    // Headings must NOT match PLACEHOLDER_STRATEGY_HEADINGS or the public page filters them out.
    strategySections: [
      {
        heading: 'Our climate ambition',
        body: 'Oriana builds inverters so solar plants run longer with fewer losses. Every percentage point of efficiency and every extra year of serviceable life reduces the carbon intensity of the energy we help deliver.\n\nWe are aligning operations with a staged path: lower Scope 1 and 2 intensity at our plants, grow on-site and contracted renewable electricity, and work with key suppliers on Scope 3 visibility.',
      },
      {
        heading: 'Product lifecycle',
        body: 'Design for longevity is our first sustainability lever — industrial-grade thermal paths, repairable boards, and extended warranty options that keep hardware in the field instead of in landfill.\n\nWe publish datasheets and service manuals so partners can maintain units correctly, and we plan certified takeback and refurbishment as volumes mature across India.',
      },
      {
        heading: 'Supply chain & manufacturing',
        body: 'Make-in-India localisation shortens freight miles and builds domestic capability. Strategic components are qualified against RoHS and our Supplier Code of Conduct.\n\nShop-floor programmes target plastic-minimised dispatch, corrugated cushioning in place of expanded foam, and progressive electrification of testing loads with rooftop solar.',
      },
      {
        heading: 'People & communities',
        body: 'Safe workplaces, technician training, and community programmes through the Oriana Foundation sit alongside product work — because a just energy transition needs skilled people as much as hardware.',
      },
      {
        heading: 'Governance excellence',
        body: 'Board-level oversight of environmental and social commitments, supplier codes of conduct, and transparent reporting as we scale manufacturing in India.',
      },
    ],
    seo: {
      metaTitle: 'Sustainability',
      metaDescription:
        'How Oriana builds sustainability into every inverter: product longevity, responsible manufacturing in India, and circular lifecycles.',
    },
    _status: 'published' as const,
  }
}
