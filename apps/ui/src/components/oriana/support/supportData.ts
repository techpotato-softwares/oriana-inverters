import type { CardItem, Intro, LinkItem, PageMeta } from '../marketing/types'

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`

export type SupportHeroContent = {
  eyebrow: string
  title: string
  highlight: string
  description: string
  image: string
  primary: LinkItem
  secondary: LinkItem
  quickLinksLabel: string
  quickLinks: CardItem[]
}

export type GlobalPresenceContent = {
  intro: Intro
  stats: { value: string; label: string }[]
  cta: LinkItem
  coverageLabel: string
  coverageBody: string
  locations: { label: string; top: string; left: string }[]
  pillars: CardItem[]
}

export type SupportResourcesContent = {
  intro: Intro
  feature: {
    eyebrow: string
    title: string
    body: string
    image: string
    cta: LinkItem
  }
  items: CardItem[]
}

export const supportMeta: PageMeta = {
  title: 'Support & Service',
  description:
    'Dependable service support throughout the product lifecycle for installers, homeowners, and businesses.',
}

export const defaultSupportHero: SupportHeroContent = {
  eyebrow: 'Service & Support',
  title: 'Professional support.',
  highlight: 'Reliable performance.',
  description:
    'Dependable service across the product lifecycle — technical expertise, responsive support, systematic troubleshooting, and field-level assistance that keeps customers, installers, and EPC partners running with minimal downtime.',
  image: img('1509391366360-2e959784a276', 2400),
  primary: { label: 'Contact support', href: '/contact' },
  secondary: { label: 'Explore our service', href: '#our-strengths' },
  quickLinksLabel: 'Frequently needed',
  quickLinks: [
    { title: 'Technical support', href: '/contact', icon: 'life-buoy' },
    { title: 'Warranty claim', href: '/support/warranty', icon: 'shield-check' },
    { title: 'Product documentation', href: '/resources/downloads', icon: 'file-text' },
  ],
}

export const defaultStrengthsIntro: Intro = {
  eyebrow: 'Our strength',
  title: 'Six capabilities behind every service call',
  description:
    'Commissioning, diagnostics, warranty, and remote monitoring work as one service layer, so each conversation ends with a clear next step and restored uptime.',
}

export const defaultStrengths: CardItem[] = [
  {
    title: 'Installation & Commissioning',
    body: 'Structured pre-commissioning checks and on-site guidance so every system is handed over with confidence.',
    image: img('1509391366360-2e959784a276', 1400),
  },
  {
    title: 'Technical Support',
    body: 'Product specialists on hand to resolve application and configuration questions.',
    image: img('1581091226825-a6a2a5aee158', 1000),
  },
  {
    title: 'Responsive Customer Support',
    body: 'One direct route from the first enquiry to the right service team.',
    image: img('1534536281715-e28d76689b4d', 1000),
  },
  {
    title: 'Troubleshooting & Diagnostics',
    body: 'A systematic fault-finding process that isolates root cause instead of treating symptoms.',
    image: img('1581092160562-40aa08e78837'),
  },
  {
    title: 'Warranty & Service Assistance',
    body: 'Practical help with product registration, service requests, and warranty claims.',
    image: img('1554224155-8d04cb21cd6c'),
  },
  {
    title: 'Remote Support & Monitoring',
    body: 'Remote visibility that surfaces issues before they need a site visit.',
    image: img('1519389950473-47ba0277781c'),
  },
]

export const defaultApproachIntro: Intro = {
  eyebrow: 'Our approach',
  title: 'One sequence, every service case',
  description:
    'Identify, diagnose, resolve, support. A consistent method keeps communication clear from the first observation through to long-term performance.',
}

export const defaultApproachCta: LinkItem = { label: 'Raise a service request', href: '/contact' }

export const defaultApproachSteps: CardItem[] = [
  {
    title: 'Identify',
    body: 'Capture the operating condition, site context, and support requirement so nothing is assumed.',
    image: img('1497435334941-8c899ee9e8e9'),
  },
  {
    title: 'Diagnose',
    body: 'Review monitoring data, event logs, and system design to isolate the most likely root cause.',
    image: img('1581092160607-ee22621dd758'),
  },
  {
    title: 'Resolve',
    body: 'Deliver a clear remote fix or coordinate field assistance to bring the plant back to full output.',
    image: img('1621905252507-b35492cc74b4'),
  },
  {
    title: 'Support',
    body: 'Confirm the outcome, share preventive guidance, and stay engaged across the product lifecycle.',
    image: img('1581092918056-0c4c3acd3789'),
  },
]

export const defaultPresence: GlobalPresenceContent = {
  intro: {
    eyebrow: 'Global presence',
    title: 'A service network built around your site',
    description:
      'Oriana pairs remote response with field-level assistance across India and beyond, so the right expertise reaches every system — residential rooftop to utility plant.',
  },
  stats: [
    { value: '10+', label: 'Years of field experience' },
    { value: '24/7', label: 'Remote monitoring & response' },
    { value: '50+', label: 'Service engineers' },
    { value: '48h', label: 'Typical on-site mobilisation' },
  ],
  cta: { label: 'Find the right support contact', href: '/contact' },
  coverageLabel: 'Coverage',
  coverageBody: 'PAN India service reach supported by regional partners and a central technical desk.',
  locations: [
    { label: 'Delhi NCR', top: '29.2%', left: '30.2%' },
    { label: 'Ahmedabad', top: '48.5%', left: '14.1%' },
    { label: 'Kolkata', top: '50%', left: '68.7%' },
    { label: 'Pune', top: '64%', left: '18.6%' },
    { label: 'Hyderabad', top: '67.9%', left: '34.6%' },
    { label: 'Bengaluru', top: '83.1%', left: '31.5%' },
  ],
  pillars: [
    {
      title: 'Remote response',
      body: 'Diagnostics, firmware guidance, and parameter checks handled from the desk.',
      icon: 'monitor-cog',
    },
    {
      title: 'Field assistance',
      body: 'Trained engineers and partners mobilised to site when hands-on work is needed.',
      icon: 'wrench',
    },
    {
      title: 'Customer care',
      body: 'A single point of contact that keeps owners and installers informed.',
      icon: 'headphones',
    },
  ],
}

export const defaultStoriesIntro: Intro = {
  eyebrow: 'Service stories',
  title: 'The work behind reliable solar performance',
}

export const defaultStories: CardItem[] = [
  {
    image: img('1592833159155-c62df1b65634', 1000),
    tag: 'Commissioning',
    title: 'Final checks before handover',
    body: 'Supporting site teams through commissioning and first-day performance review.',
  },
  {
    image: img('1559302504-64aae6ca6b6d', 1000),
    tag: 'Commercial',
    title: 'Rooftop project coordination',
    body: 'Technical coordination across EPC, electrical, and monitoring teams.',
  },
  {
    image: img('1613665813446-82a78c468a1d', 1000),
    tag: 'Residential',
    title: 'Guidance that reaches the homeowner',
    body: 'Clear explanations for installers and owners, without the jargon.',
  },
  {
    image: img('1581094794329-c8112a89af12', 1000),
    tag: 'Remote service',
    title: 'Diagnosis before dispatch',
    body: 'Operating data reviewed remotely so a site visit is only made when it counts.',
  },
  {
    image: img('1466611653911-95081537e5b7', 1000),
    tag: 'Utility',
    title: 'Large plant performance reviews',
    body: 'Periodic health checks that protect generation across the asset lifetime.',
  },
]

export const defaultResources: SupportResourcesContent = {
  intro: {
    eyebrow: 'Resources',
    title: 'Everything needed to install, run, and maintain',
  },
  feature: {
    eyebrow: 'Resource centre',
    title: 'One library for every Oriana product',
    body: 'Browse documents by product category — on-grid, hybrid, utility, and storage — and download the latest revision in a click.',
    image: img('1497435334941-8c899ee9e8e9', 1600),
    cta: { label: 'Open resource centre', href: '/resources/downloads' },
  },
  items: [
    {
      title: 'Product documentation',
      body: 'Datasheets, user manuals, and quick installation guides, organised category by category.',
      href: '/resources/downloads',
      icon: 'file-text',
    },
    {
      title: 'FAQs',
      body: 'Answers to the questions that come up most often during installation, monitoring, and service.',
      href: '/resources/faqs',
      icon: 'circle-help',
    },
    {
      title: 'Warranty',
      body: 'Warranty terms, product registration, and a clear path for raising and tracking a claim.',
      href: '/support/warranty',
      icon: 'badge-check',
    },
  ],
}

export const defaultCasesIntro: Intro = {
  eyebrow: 'Cases & stories',
  title: 'Projects, by system type',
  description:
    'Explore how Oriana inverters perform in the field as our case library grows across on-grid, hybrid, utility, and storage installations.',
}

export const defaultCasesCta: LinkItem = { label: 'View all case studies', href: '/case-studies' }

export const defaultCases: CardItem[] = [
  {
    title: 'On-grid',
    body: 'Rooftop and ground-mount systems feeding the grid.',
    image: img('1509391366360-2e959784a276', 1000),
    href: '/case-studies',
  },
  {
    title: 'Hybrid',
    body: 'Solar paired with storage for round-the-clock supply.',
    image: img('1548337138-e87d889cc369', 1000),
    href: '/case-studies',
  },
  {
    title: 'Utility',
    body: 'Large-scale plants engineered for long-term yield.',
    image: img('1466611653911-95081537e5b7', 1000),
    href: '/case-studies',
  },
  {
    title: 'BESS',
    body: 'Battery energy storage for resilience and peak control.',
    image: img('1473341304170-971dccb5ac1e', 1000),
    href: '/case-studies',
  },
]

export const defaultWarrantyPage = {
  meta: {
    title: 'Warranty',
    description: 'Oriana inverter warranty terms, registration, and claim process.',
  } satisfies PageMeta,
  hero: {
    eyebrow: 'Support',
    title: 'Warranty',
    description:
      'Industry-leading warranty coverage backed by global service infrastructure and spare parts availability.',
  },
  matrixTitle: 'Coverage by Product Line',
  steps: [
    {
      title: 'Register Your Product',
      body: 'Register within 60 days of installation to activate full warranty coverage. You will need the serial number, installation date, and installer contact information.',
    },
    {
      title: 'Submit a Warranty Claim',
      body: 'Contact our support team with your serial number, fault description, and photos if applicable. RMA processing typically completes within 5 business days for in-warranty units.',
    },
  ] satisfies CardItem[],
  primary: { label: 'Register / Claim Warranty', href: '/contact' } satisfies LinkItem,
  secondary: { label: 'Download Warranty Policy (PDF)', href: '/resources/downloads' } satisfies LinkItem,
}

export const defaultSecurityPage = {
  meta: {
    title: 'Security Incident Response',
    description: 'Report a cybersecurity incident related to Oriana products or services.',
  } satisfies PageMeta,
  hero: {
    eyebrow: 'Support',
    title: 'Security Incident Response',
    description:
      'Oriana takes product and platform security seriously. Use this page to report vulnerabilities or incidents.',
  },
  sections: [
    {
      heading: 'Reporting a Vulnerability',
      paragraphs: [
        'If you discover a security vulnerability in Oriana hardware, firmware, or cloud monitoring services, please report it to security@orianainverters.com. Include a detailed description, affected product model, and steps to reproduce.',
        'We aim to acknowledge reports within 2 business days and provide status updates throughout our investigation.',
      ],
    },
    {
      heading: 'Coordinated Disclosure',
      paragraphs: [
        'We follow responsible disclosure practices. Please allow 90 days for remediation before public disclosure unless otherwise agreed. We recognize researchers who help improve our security posture.',
      ],
    },
    {
      heading: 'Product Security Updates',
      paragraphs: [
        'Firmware security patches are distributed through the Oriana Monitoring app and our Download Center. Register your products to receive automatic update notifications.',
      ],
    },
  ],
  ctaPrompt: 'Need immediate assistance?',
  cta: { label: 'Contact Security Team', href: '/contact' } satisfies LinkItem,
}
