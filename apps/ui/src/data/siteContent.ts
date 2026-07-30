/** Static marketing content — used as CMS seed source and frontend fallback */

export const staticHome = {
  hero: {
    eyebrow: 'Oriana',
    title: 'Clean power that crosses borders',
    description:
      'High-efficiency inverters and storage platforms for homes, industry, and utility grids — engineered for partners who ship projects worldwide.',
    primaryCta: { label: 'Explore solutions', href: '/solutions/residential' },
    secondaryCta: { label: 'Become a partner', href: '/contact' },
  },
  strategies: {
    eyebrow: 'Go-to-market strategies',
    title: 'One platform. Four ways to win.',
    description:
      "Meet Ori's crew — each strategy tailored for the partners and projects shaping the global energy transition.",
    items: [
      {
        id: 'home',
        label: 'For Home',
        title: 'Residential energy independence',
        description:
          'Hybrid inverters and storage that keep households powered — quietly, efficiently, every day.',
        href: '/solutions/residential',
      },
      {
        id: 'business',
        label: 'For Business',
        title: 'Commercial & industrial scale',
        description:
          'Rooftop and carport platforms built for uptime, bankability, and fast commissioning.',
        href: '/solutions/commercial',
      },
      {
        id: 'utility',
        label: 'For Utility',
        title: 'Utility-scale grid strength',
        description:
          'Central and string architectures for multi-megawatt farms and IPP portfolios.',
        href: '/solutions/utility',
      },
      {
        id: 'storage',
        label: 'For Storage',
        title: 'Flexible energy services',
        description:
          'Hybrid conversion for peak shaving, backup, and emerging grid-service markets.',
        href: '/solutions/storage',
      },
    ],
  },
  impact: {
    eyebrow: 'Global footprint',
    title: 'Built for international partners',
    ctaLabel: 'Discover who we are',
    ctaHref: '/about',
    stats: [
      { icon: 'globe', value: '25+', label: 'Countries served' },
      { icon: 'award', value: '1M+', label: 'Converters installed' },
      { icon: 'leaf', value: '99.6%', label: 'Peak efficiency' },
      { icon: 'microscope', value: '3', label: 'Global R&D centers' },
    ],
  },
  whyOriana: {
    eyebrow: 'Why Oriana',
    title: 'Excellence that travels with every shipment',
    description:
      'From first sample to fleet deployment, we help international clients specify, certify, and scale clean power conversion with confidence.',
    items: [
      {
        icon: 'microscope',
        title: 'Technological innovation',
        copy: 'Continuous R&D across conversion efficiency, grid codes, and intelligent monitoring.',
        href: '/about',
      },
      {
        icon: 'shield',
        title: 'Bankable manufacturing',
        copy: 'Certified production, rigorous QA, and supply chains ready for multi-region delivery.',
        href: '/about/certifications',
      },
      {
        icon: 'globe',
        title: 'Local presence, global reach',
        copy: 'Distributor networks and support coverage that follow your projects across borders.',
        href: '/where-to-buy',
      },
      {
        icon: 'headphones',
        title: 'Partner-grade service',
        copy: 'Training, documentation, and responsive after-sales for installers and EPCs.',
        href: '/support',
      },
    ],
  },
  globalReach: {
    eyebrow: 'International clients',
    title: 'Ready wherever your next project lands',
    description:
      'Regional documentation, certification pathways, and partner enablement — so cross-border deals move from RFQ to commissioning without friction.',
    ctaLabel: 'Find a distributor',
    ctaHref: '/where-to-buy',
    regions: [
      { name: 'North America', focus: 'UL / NEC ready platforms' },
      { name: 'Europe & UK', focus: 'Grid-code compliant portfolios' },
      { name: 'Middle East', focus: 'High-irradiance utility lines' },
      { name: 'Asia Pacific', focus: 'C&I + storage growth markets' },
      { name: 'Latin America', focus: 'Distributed generation & EPCs' },
      { name: 'Africa', focus: 'Resilient off-grid & hybrid' },
    ],
  },
  news: {
    eyebrow: 'News & media',
    title: 'Latest from Oriana',
    viewAllLabel: 'Newsroom →',
    viewAllHref: '/posts',
    items: [
      {
        title: 'Oriana launches next-gen hybrid series for US residential market',
        date: 'Mar 15, 2026',
        href: '/posts',
        type: 'News',
      },
      {
        title: 'ORI-GU250K ranks among top utility-scale inverters globally',
        date: 'Feb 28, 2026',
        href: '/posts',
        type: 'News',
      },
      {
        title: '2025 ESG & Sustainability Report now available',
        date: 'Jan 10, 2026',
        href: '/resources/downloads',
        type: 'Report',
      },
    ],
  },
  caseStudiesIntro: {
    eyebrow: 'Case studies',
    title: 'Projects that prove the promise',
    viewAllLabel: 'All case studies →',
    viewAllHref: '/case-studies',
  },
  supportStrip: {
    service: {
      eyebrow: 'Service & support',
      title: 'Bankable. Reliable. Local.',
      hotline: 'Customer hotline: +1 (800) ORIANA-1',
      linkLabel: 'Online service',
      linkHref: '/support',
    },
    downloads: {
      eyebrow: 'Download center',
      links: [
        { label: 'Datasheets', href: '/resources/downloads' },
        { label: 'Installation manuals', href: '/resources/downloads' },
        { label: 'Certificates', href: '/resources/downloads' },
        { label: 'Warranty documents', href: '/resources/downloads' },
      ],
    },
    partner: {
      eyebrow: 'Partner with us',
      description:
        "Looking to distribute Oriana across a new market? Let's talk territory, training, and co-marketing.",
      ctaLabel: 'Request partnership',
      ctaHref: '/contact',
    },
  },
  seo: {
    metaTitle: 'Oriana Inverters | Solar Inverter & Energy Storage Solutions',
    metaDescription:
      'High-efficiency solar inverters and storage platforms for residential, commercial, and utility projects worldwide.',
  },
}

export const staticAbout = {
  hero: {
    eyebrow: 'About',
    title: 'Powering a Cleaner Tomorrow',
    description:
      'Oriana Inverters is a global manufacturer of solar inverter technology, serving residential, commercial, and utility markets with products engineered for performance and longevity.',
  },
  story: {
    title: 'Our Story',
    paragraphs: [
      {
        text: 'Founded by power electronics engineers with decades of experience in renewable energy, Oriana was built on a simple belief: the world needs inverters that are as reliable as the sun itself.',
      },
      {
        text: 'Today, over one million Oriana inverters operate across 25 countries — on rooftops, in industrial parks, and across desert solar farms — converting sunlight into clean, dependable power for millions of people.',
      },
    ],
  },
  stats: [
    { value: '2010', label: 'Founded' },
    { value: '1M+', label: 'Units Deployed' },
    { value: '25+', label: 'Countries' },
    { value: '500+', label: 'Team Members' },
  ],
  values: [
    {
      title: 'Engineering Excellence',
      description:
        'Every product undergoes rigorous design validation, environmental stress testing, and field trials before market release.',
    },
    {
      title: 'Customer Partnership',
      description:
        'We work alongside installers, EPCs, and distributors with dedicated technical support, training, and co-marketing resources.',
    },
    {
      title: 'Sustainable Future',
      description:
        'Our mission is to accelerate the global transition to clean energy through reliable, accessible power conversion technology.',
    },
  ],
  seo: {
    metaTitle: 'About Us',
    metaDescription:
      'Learn about Oriana Inverters — our mission, technology, and commitment to clean energy.',
  },
}

export const staticContact = {
  hero: {
    eyebrow: 'Contact',
    title: "Let's Build Together",
    description:
      'Tell us about your project. Our engineering and sales teams respond within one business day.',
  },
  sidebarTitle: 'Get in Touch',
  contactItems: [
    { icon: 'mail', label: 'Email', value: 'info@orianainverters.com' },
    { icon: 'phone', label: 'Phone', value: '+1 (800) ORIANA-1' },
    { icon: 'map', label: 'Headquarters', value: 'United States' },
  ],
  form: {
    nameLabel: 'Full Name *',
    emailLabel: 'Email *',
    companyLabel: 'Company',
    messageLabel: 'Project Details *',
    submitLabel: 'Submit Request',
    successTitle: 'Message Received',
    successMessage:
      'Thank you for reaching out. Our team will contact you within one business day.',
  },
  seo: {
    metaTitle: 'Contact',
    metaDescription: 'Contact Oriana Inverters for sales, partnerships, and project support.',
  },
}

export const staticCareers = {
  hero: {
    eyebrow: 'About',
    title: 'Careers at Oriana',
    description:
      'Build the future of clean power conversion with a global team of engineers, makers, and problem-solvers.',
  },
  why: {
    title: 'Why Oriana',
    description:
      'We offer competitive benefits, hybrid work options for eligible roles, and the opportunity to work on products deployed across 25 countries. Our culture values engineering rigour, customer partnership, and environmental responsibility.',
    imageUrl: '/assets/illustrations/careers.svg',
  },
  openingsTitle: 'Open Positions',
  fallbackCtaLabel: "Don't see a fit? Send us your résumé",
  fallbackCtaHref: '/contact',
  seo: {
    metaTitle: 'Careers',
    metaDescription:
      'Join Oriana Inverters — engineering, manufacturing, sales, and support careers in clean energy.',
  },
}

export const staticSupport = {
  hero: {
    eyebrow: 'Support',
    title: 'Service & Support',
    description:
      'Our technical team supports installers, EPCs, and end customers across every stage — from commissioning to long-term O&M.',
  },
  channels: [
    {
      icon: 'phone',
      title: 'Customer Hotline',
      detail: '+1 (800) ORIANA-1',
      note: 'Mon–Fri, 8 AM – 6 PM local time',
    },
    {
      icon: 'mail',
      title: 'Technical Email',
      detail: 'support@orianainverters.com',
      note: 'Response within 1 business day',
    },
    {
      icon: 'headphones',
      title: 'Installer Support',
      detail: 'installers@orianainverters.com',
      note: 'Dedicated line for certified partners',
    },
    {
      icon: 'map',
      title: 'Regional Offices',
      detail: 'North America · Europe · APAC',
      note: 'Find your local representative',
    },
  ],
  resourcesTitle: 'Self-Service Resources',
  resourceLinks: [
    { label: 'Download Center', href: '/resources/downloads' },
    { label: 'Warranty', href: '/support/warranty' },
    { label: 'FAQs', href: '/resources/faqs' },
    { label: 'Installation Videos', href: '/resources/videos' },
  ],
  ticketCta: {
    title: 'Submit a Support Ticket',
    description:
      'Describe your issue, include the inverter serial number and fault code if applicable. Our team will respond within one business day.',
    cta: { label: 'Open Contact Form', href: '/contact' },
  },
  seo: {
    metaTitle: 'Service & Support',
    metaDescription:
      'Technical support, warranty services, and resources for Oriana inverter owners and installers.',
  },
}

export const staticWarranty = {
  hero: {
    eyebrow: 'Support',
    title: 'Warranty',
    description:
      'Industry-leading warranty coverage backed by global service infrastructure and spare parts availability.',
  },
  tiersTitle: 'Coverage by Product Line',
  tiers: [
    {
      product: 'Residential String & Hybrid',
      standard: '10 Years',
      extended: 'Up to 20 Years (optional)',
    },
    {
      product: 'Commercial Three-Phase',
      standard: '10 Years',
      extended: 'Up to 15 Years (optional)',
    },
    {
      product: 'Utility-Scale Central',
      standard: '10 Years',
      extended: 'Custom O&M agreements',
    },
  ],
  register: {
    title: 'Register Your Product',
    description:
      'Register within 60 days of installation to activate full warranty coverage. You will need the serial number, installation date, and installer contact information.',
  },
  claim: {
    title: 'Submit a Warranty Claim',
    description:
      'Contact our support team with your serial number, fault description, and photos if applicable. RMA processing typically completes within 5 business days for in-warranty units.',
  },
  primaryCta: { label: 'Register / Claim Warranty', href: '/contact' },
  secondaryCta: { label: 'Download Warranty Policy (PDF)', href: '/resources/downloads' },
  seo: {
    metaTitle: 'Warranty',
    metaDescription: 'Oriana inverter warranty terms, registration, and claim process.',
  },
}

export const staticSustainability = {
  hero: {
    eyebrow: 'Sustainability',
    title: 'Powering a Sustainable Future',
    description:
      'Oriana integrates environmental responsibility into product design, manufacturing, and supply chain operations.',
  },
  highlights: [
    { value: '45%', label: 'Renewable energy at manufacturing sites' },
    { value: 'ISO 14001', label: 'Environmental management certified' },
    { value: '2025', label: 'ESG report published' },
    { value: '1M+', label: 'Clean energy units deployed' },
  ],
  approach: {
    title: 'Our Approach',
    description:
      'Every Oriana inverter helps displace fossil generation over a 25+ year operational life. We complement that impact by reducing manufacturing emissions, designing for recyclability, and partnering with suppliers who share our environmental standards.',
    imageUrl: '/assets/illustrations/sustainability.svg',
    primaryCta: { label: 'Our Strategy', href: '/sustainability/strategy' },
    secondaryCta: { label: 'Reports & Policies →', href: '/sustainability/reports' },
  },
  seo: {
    metaTitle: 'Sustainability',
    metaDescription: 'Oriana Inverters commitment to sustainable manufacturing and clean energy.',
  },
}

export const staticSustainabilityReports = {
  hero: {
    eyebrow: 'Sustainability',
    title: 'Reports & Policies',
    description: 'Download our latest environmental, social, and governance disclosures.',
  },
  reports: [
    { title: '2025 ESG & Sustainability Report', year: '2025', size: '4.8 MB', href: '/resources/downloads' },
    { title: 'Environmental Policy', year: '2024', size: '620 KB', href: '/resources/downloads' },
    { title: 'Supplier Code of Conduct', year: '2024', size: '480 KB', href: '/resources/downloads' },
    { title: 'Conflict Minerals Statement', year: '2025', size: '310 KB', href: '/resources/downloads' },
    { title: 'ISO 14001 Certificate', year: '2024', size: '520 KB', href: '/resources/downloads' },
  ],
  seo: {
    metaTitle: 'Reports & Policies',
    metaDescription: 'Oriana sustainability reports, environmental policies, and compliance documents.',
  },
}

export const staticWhereToBuy = {
  hero: {
    eyebrow: 'Sales',
    title: 'Where to Buy',
    description:
      'Purchase Oriana inverters through our authorized distributor network or certified installer partners.',
  },
  becomeDistributor: {
    title: 'Become a Distributor',
    description:
      'Join the Oriana partner network with co-marketing support, technical training, and competitive commercial terms.',
    cta: { label: 'Partner Inquiry', href: '/contact' },
  },
  seo: {
    metaTitle: 'Where to Buy',
    metaDescription: 'Find authorized Oriana inverter distributors and installers in your region.',
  },
}

export const staticPageIntros = {
  faqs: {
    eyebrow: 'Resources',
    title: 'Frequently Asked Questions',
    description:
      'Answers to common questions about product selection, installation, warranty, and monitoring.',
    ctaPrompt: 'Still have questions?',
    ctaLabel: 'Contact Support',
    ctaHref: '/support',
  },
  videos: {
    eyebrow: 'Resources',
    title: 'Video Center',
    description:
      'Step-by-step installation guides, commissioning walkthroughs, and product overviews.',
    footerNote: 'More videos coming soon. Subscribe to our newsroom for updates.',
  },
  certifications: {
    eyebrow: 'About',
    title: 'Certifications & Awards',
    description:
      "Oriana products meet the world's most stringent safety, grid interconnection, and quality standards.",
    certsHeading: 'Product Certifications',
    awardsHeading: 'Industry Recognition',
  },
  partners: {
    eyebrow: 'About',
    title: 'Partners',
    description:
      'We work with a global network of distributors, installers, and technology partners to deliver bankable solar solutions.',
    cta: {
      title: 'Partner with Oriana',
      description:
        'Access technical training, co-marketing resources, and dedicated commercial support as an authorized Oriana partner.',
      primaryCta: { label: 'Become a Partner', href: '/contact' },
      secondaryCta: { label: 'Find a Distributor', href: '/where-to-buy' },
    },
  },
  caseStudies: {
    eyebrow: 'Projects',
    title: 'Case Studies',
    description: 'Real-world deployments of Oriana inverters across residential, commercial, and utility projects.',
  },
  products: {
    eyebrow: 'Catalogue',
    title: 'Solar Inverter Catalogue',
    description:
      'High-efficiency power conversion solutions for every application — from residential rooftops to gigawatt-scale solar farms.',
  },
}

export const staticSolutions = [
  {
    slug: 'residential' as const,
    title: 'Residential Solutions',
    description:
      'Power your home with Oriana single-phase string and hybrid inverters — engineered for maximum rooftop energy harvest, battery integration, and decades of reliable operation.',
    benefits: [
      { text: 'Single-phase string inverters from 1 – 11.4 kW' },
      { text: 'Hybrid models with seamless battery backup switching' },
      { text: 'WiFi monitoring with homeowner-friendly app' },
      { text: 'Quiet operation with fanless or low-noise designs' },
      { text: '10-year standard warranty with extension options' },
    ],
    products: [
      { name: 'ORI-S3 String Series' },
      { name: 'ORI-S6 Hybrid Series' },
      { name: 'ORI-M300 Microinverter' },
    ],
    imageUrl: '/assets/products/single-phase.svg',
  },
  {
    slug: 'commercial' as const,
    title: 'Commercial & Industrial',
    description:
      'Scale your business energy independence with three-phase inverter systems designed for warehouses, factories, data centers, and commercial rooftops.',
    benefits: [
      { text: 'Three-phase string inverters up to 110 kW' },
      { text: 'Multi-MPPT for complex rooftop geometries' },
      { text: 'Fleet monitoring and SCADA integration' },
      { text: 'AFCI and rapid shutdown compliance' },
      { text: 'Dedicated C&I technical support team' },
    ],
    products: [
      { name: 'ORI-T50 Series' },
      { name: 'ORI-T75 Commercial' },
      { name: 'ORI-T110 Three-Phase' },
    ],
    imageUrl: '/assets/products/three-phase.svg',
  },
  {
    slug: 'utility' as const,
    title: 'Utility-Scale Solutions',
    description:
      'Deploy megawatt-class solar plants with Oriana central inverter platforms — built for 99.6% efficiency, grid code compliance, and 25+ year operational life.',
    benefits: [
      { text: 'Central inverters from 1 – 3.5 MW' },
      { text: 'Outdoor-rated IP65 enclosures' },
      { text: 'Grid-forming capability for weak grids' },
      { text: 'Modular serviceability and hot-swap design' },
      { text: 'Global grid code pre-certification' },
    ],
    products: [
      { name: 'ORI-U1000' },
      { name: 'ORI-U2500 Central' },
      { name: 'ORI-U3500 Utility Platform' },
    ],
    imageUrl: '/assets/products/utility-scale.svg',
  },
  {
    slug: 'storage' as const,
    title: 'Energy Storage Solutions',
    description:
      'Integrate battery storage seamlessly with Oriana hybrid inverters — enabling backup power, peak shaving, time-of-use optimization, and grid services revenue.',
    benefits: [
      { text: 'Compatible with leading lithium battery brands' },
      { text: 'UPS-level switching under 10 ms' },
      { text: 'Time-of-use and self-consumption optimization' },
      { text: 'Virtual power plant (VPP) ready' },
      { text: 'Black start and islanding capability' },
    ],
    products: [
      { name: 'ORI-S6 Hybrid' },
      { name: 'ORI-H50 Storage Series' },
      { name: 'ORI-EMS Energy Manager' },
    ],
    imageUrl: '/assets/products/hybrid-storage.svg',
  },
]

export const staticFaqGroups = [
  {
    title: 'Product Selection',
    sortOrder: 0,
    items: [
      {
        question: 'How do I choose between single-phase and three-phase inverters?',
        answer:
          'Single-phase inverters are designed for residential systems up to ~11.4 kW. Three-phase models are required for commercial rooftops and systems above typical residential limits. Contact your distributor or our sales team for sizing assistance.',
      },
      {
        question: 'Are Oriana hybrid inverters compatible with third-party batteries?',
        answer:
          'Yes. Oriana hybrid inverters support leading lithium battery brands via standard communication protocols. Refer to the compatibility list in each product datasheet.',
      },
    ],
  },
  {
    title: 'Installation & Commissioning',
    sortOrder: 1,
    items: [
      {
        question: 'Who can install Oriana inverters?',
        answer:
          'Installation must be performed by licensed electricians familiar with local electrical codes and solar interconnection requirements. Certified installer training is available through our distributor network.',
      },
      {
        question: 'How do I register my inverter for warranty?',
        answer:
          'Register your product within 60 days of installation via the Oriana Monitoring app or the warranty portal linked from our Support page.',
      },
    ],
  },
  {
    title: 'Monitoring & Troubleshooting',
    sortOrder: 2,
    items: [
      {
        question: 'How do I connect my inverter to WiFi?',
        answer:
          'Use the Oriana Monitoring app to scan the QR code on the inverter label and follow the on-screen pairing steps. Ethernet is also supported on most models.',
      },
      {
        question: 'What should I do if my inverter shows a fault code?',
        answer:
          'Note the fault code displayed on the unit or app, then consult the troubleshooting section of your installation manual or contact our support hotline.',
      },
    ],
  },
]

export const staticVideos = [
  { title: 'ORI-S6 Hybrid — Unboxing & Wall Mount', category: 'Installation', duration: '8:42', sortOrder: 0 },
  { title: 'Commissioning via Oriana Monitoring App', category: 'Commissioning', duration: '12:15', sortOrder: 1 },
  { title: 'ORI-S5 Three-Phase — Rooftop Installation', category: 'Installation', duration: '15:30', sortOrder: 2 },
  { title: 'ORI-GU250K — Utility Plant Overview', category: 'Product Overview', duration: '6:20', sortOrder: 3 },
  { title: 'Troubleshooting Common Fault Codes', category: 'Support', duration: '10:05', sortOrder: 4 },
  { title: 'Battery Integration with Hybrid Inverters', category: 'Energy Storage', duration: '11:48', sortOrder: 5 },
]

export const staticJobs = [
  { title: 'Power Electronics Engineer', location: 'San Jose, CA', department: 'R&D', type: 'Full-time', sortOrder: 0 },
  { title: 'Applications Engineer — Utility-Scale', location: 'Austin, TX', department: 'Technical Sales', type: 'Full-time', sortOrder: 1 },
  { title: 'Quality Assurance Specialist', location: 'Phoenix, AZ', department: 'Manufacturing', type: 'Full-time', sortOrder: 2 },
  { title: 'Customer Support Specialist', location: 'Remote — US', department: 'Service', type: 'Full-time', sortOrder: 3 },
]

export const staticPartners = [
  { name: 'SolarEdge Distribution NA', category: 'Distribution Partners' as const, sortOrder: 0 },
  { name: 'GreenPower Wholesale', category: 'Distribution Partners' as const, sortOrder: 1 },
  { name: 'EuroSolar Components', category: 'Distribution Partners' as const, sortOrder: 2 },
  { name: 'APAC Energy Solutions', category: 'Distribution Partners' as const, sortOrder: 3 },
  { name: 'Leading Battery OEMs', category: 'Technology Alliances' as const, sortOrder: 0 },
  { name: 'Monitoring Platform Integrators', category: 'Technology Alliances' as const, sortOrder: 1 },
  { name: 'EV Charger Manufacturers', category: 'Technology Alliances' as const, sortOrder: 2 },
  { name: 'Smart Home Ecosystems', category: 'Technology Alliances' as const, sortOrder: 3 },
  { name: 'Tier-1 Solar Developers', category: 'EPC & Developer Partners' as const, sortOrder: 0 },
  { name: 'Commercial Rooftop Specialists', category: 'EPC & Developer Partners' as const, sortOrder: 1 },
  { name: 'Utility-Scale EPC Firms', category: 'EPC & Developer Partners' as const, sortOrder: 2 },
  { name: 'Microgrid Integrators', category: 'EPC & Developer Partners' as const, sortOrder: 3 },
]

export const staticCertifications = [
  { kind: 'certification' as const, name: 'UL 1741 SA', scope: 'Distributed energy resources', region: 'North America', sortOrder: 0 },
  { kind: 'certification' as const, name: 'IEEE 1547-2018', scope: 'Interconnection standards', region: 'North America', sortOrder: 1 },
  { kind: 'certification' as const, name: 'IEC 62109-1/2', scope: 'Safety of power converters', region: 'Global', sortOrder: 2 },
  { kind: 'certification' as const, name: 'EN 50549', scope: 'Grid connection', region: 'Europe', sortOrder: 3 },
  { kind: 'certification' as const, name: 'ISO 9001:2015', scope: 'Quality management', region: 'Global', sortOrder: 4 },
  { kind: 'certification' as const, name: 'ISO 14001:2015', scope: 'Environmental management', region: 'Global', sortOrder: 5 },
  { kind: 'award' as const, name: 'Top Brand — Solar Inverters', year: '2025', organization: 'Energy Storage News', sortOrder: 0 },
  { kind: 'award' as const, name: 'Innovation Award — Hybrid Technology', year: '2024', organization: 'Intersolar Europe', sortOrder: 1 },
  { kind: 'award' as const, name: 'Bankability Leader', year: '2024', organization: 'BloombergNEF Tier 1', sortOrder: 2 },
]

export const staticContentPages = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    eyebrow: 'Legal',
    description: 'Last updated: January 2026',
    breadcrumb: [{ label: 'Privacy Policy' }],
    sections: [
      {
        heading: 'Information We Collect',
        paragraphs: [
          { text: 'We collect information you provide when requesting quotes, registering products, subscribing to our newsletter, or contacting support. This may include your name, email address, company name, phone number, and project details.' },
          { text: 'We also collect technical data when you visit our website, including IP address, browser type, and pages viewed, through cookies and analytics tools used to improve our services.' },
        ],
      },
      {
        heading: 'How We Use Your Information',
        paragraphs: [
          { text: 'Your information is used to respond to inquiries, process warranty registrations, deliver marketing communications you have opted into, and improve our products and website experience.' },
          { text: 'We do not sell personal information to third parties. We may share data with authorized distributors and service partners solely to fulfil your requests.' },
        ],
      },
      {
        heading: 'Your Rights',
        paragraphs: [
          { text: 'You may request access, correction, or deletion of your personal data by contacting privacy@orianainverters.com. California residents have additional rights under the CCPA.' },
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          { text: 'For privacy-related questions, email privacy@orianainverters.com or write to Oriana Inverters, Privacy Office, United States.' },
        ],
      },
    ],
    seo: {
      metaTitle: 'Privacy Policy',
      metaDescription: 'Oriana Inverters privacy policy — how we collect, use, and protect your personal information.',
    },
  },
  {
    slug: 'terms',
    title: 'Terms of Use',
    eyebrow: 'Legal',
    description: 'Last updated: January 2026',
    breadcrumb: [{ label: 'Terms of Use' }],
    sections: [
      {
        heading: 'Acceptance of Terms',
        paragraphs: [
          { text: 'By accessing www.orianainverters.com you agree to these Terms of Use. If you do not agree, please discontinue use of this website.' },
        ],
      },
      {
        heading: 'Website Content',
        paragraphs: [
          { text: 'Product specifications, images, and documentation on this site are for general reference. Always refer to the official datasheet for the product serial number installed at your site.' },
          { text: 'Oriana reserves the right to update product information without prior notice. Nothing on this website constitutes a binding offer or warranty beyond published product documentation.' },
        ],
      },
      {
        heading: 'Intellectual Property',
        paragraphs: [
          { text: 'All trademarks, logos, datasheets, and website content are owned by Oriana Inverters or its licensors. You may not reproduce materials without written permission.' },
        ],
      },
      {
        heading: 'Limitation of Liability',
        paragraphs: [
          { text: 'Oriana is not liable for indirect or consequential damages arising from use of this website. Product warranties are governed by separate warranty documents supplied with each unit.' },
        ],
      },
    ],
    seo: {
      metaTitle: 'Terms of Use',
      metaDescription: 'Terms and conditions for using the Oriana Inverters website and digital services.',
    },
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    eyebrow: 'Legal',
    description: 'Important notices regarding information on this website.',
    breadcrumb: [{ label: 'Disclaimer' }],
    sections: [
      {
        paragraphs: [
          { text: 'The information on this website is provided for general informational purposes only. While Oriana Inverters strives to keep content accurate and up to date, we make no warranties about completeness, reliability, or suitability for any purpose.' },
        ],
      },
      {
        heading: 'Product Information',
        paragraphs: [
          { text: 'Specifications, images, and performance data are subject to change without notice. Always consult the official datasheet for the specific product model and serial number installed at your site.' },
        ],
      },
      {
        heading: 'Third-Party Links',
        paragraphs: [
          { text: 'Links to external websites are provided for convenience. Oriana does not endorse and is not responsible for content on third-party sites.' },
        ],
      },
    ],
    seo: {
      metaTitle: 'Disclaimer',
      metaDescription: 'Website disclaimer for Oriana Inverters product and marketing information.',
    },
  },
  {
    slug: 'security',
    title: 'Security Incident Response',
    eyebrow: 'Support',
    description:
      'Oriana takes product and platform security seriously. Use this page to report vulnerabilities or incidents.',
    breadcrumb: [
      { label: 'Support', href: '/support' },
      { label: 'Security' },
    ],
    sections: [
      {
        heading: 'Reporting a Vulnerability',
        paragraphs: [
          { text: 'If you discover a security vulnerability in Oriana hardware, firmware, or cloud monitoring services, please report it to security@orianainverters.com. Include a detailed description, affected product model, and steps to reproduce.' },
          { text: 'We aim to acknowledge reports within 2 business days and provide status updates throughout our investigation.' },
        ],
      },
      {
        heading: 'Coordinated Disclosure',
        paragraphs: [
          { text: 'We follow responsible disclosure practices. Please allow 90 days for remediation before public disclosure unless otherwise agreed. We recognize researchers who help improve our security posture.' },
        ],
      },
      {
        heading: 'Product Security Updates',
        paragraphs: [
          { text: 'Firmware security patches are distributed through the Oriana Monitoring app and our Download Center. Register your products to receive automatic update notifications.' },
        ],
      },
    ],
    seo: {
      metaTitle: 'Security Incident Response',
      metaDescription: 'Report a cybersecurity incident related to Oriana products or services.',
    },
  },
  {
    slug: 'strategy',
    title: 'Sustainability Strategy',
    eyebrow: 'Sustainability',
    description: 'Our roadmap to net-zero operations and responsible product lifecycle management.',
    breadcrumb: [
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Strategy' },
    ],
    sections: [
      {
        heading: '2030 Targets',
        paragraphs: [
          { text: 'Reduce Scope 1 and 2 greenhouse gas emissions by 50% versus 2020 baseline across all manufacturing facilities.' },
          { text: 'Achieve 80% renewable electricity consumption at major production sites.' },
          { text: 'Design 100% of new products for RoHS compliance and improved recyclability.' },
        ],
      },
      {
        heading: 'Product Lifecycle',
        paragraphs: [
          { text: 'We conduct lifecycle assessments on flagship inverter platforms to identify opportunities to reduce embodied carbon in enclosures, semiconductors, and logistics.' },
          { text: 'Extended warranty programmes and modular serviceability extend product life in the field, reducing e-waste.' },
        ],
      },
      {
        heading: 'Supply Chain',
        paragraphs: [
          { text: 'Key suppliers are audited against our Supplier Code of Conduct covering labour practices, environmental management, and conflict minerals due diligence.' },
        ],
      },
    ],
    seo: {
      metaTitle: 'Sustainability Strategy',
      metaDescription: 'Oriana Inverters environmental strategy and 2030 sustainability targets.',
    },
  },
]
