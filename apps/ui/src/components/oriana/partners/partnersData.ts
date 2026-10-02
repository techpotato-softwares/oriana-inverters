import type { CardItem, CtaBandContent, HeroContent, Intro, LinkItem, PageMeta } from '../marketing/types'

export const partnersHub = {
  meta: {
    title: 'Partners',
    description:
      'Grow with Oriana — distributor and partnership programmes for solar and storage professionals.',
  } satisfies PageMeta,
  hero: {
    eyebrow: 'Partners',
    title: 'Grow together with Oriana',
    description:
      'Join distributors and technology partners delivering bankable solar, storage, and hybrid solutions.',
  } satisfies HeroContent,
  tracks: [
    {
      icon: 'store',
      title: 'Distributors',
      href: '/partners/become-a-distributor',
      body: 'Authorized distributors access a full product portfolio, supply-chain support, and joint go-to-market programmes.',
      linkLabel: 'Become a Distributor',
    },
    {
      icon: 'handshake',
      title: 'Partnership',
      href: '/partners/partnership',
      body: 'EPCs, technology allies, and channel partners collaborate with Oriana on projects, solutions, and long-term market growth.',
      linkLabel: 'Become a Partner',
    },
  ] satisfies CardItem[],
  quickLinks: [
    { label: 'Find a Distributor', href: '/where-to-buy' },
    { label: 'Cases & Stories', href: '/case-studies' },
    { label: 'Partner Support', href: '/support' },
  ] satisfies LinkItem[],
  cta: {
    title: 'Ready to partner with Oriana?',
    body: 'Tell us about your business. Our channel and sales teams will follow up with programme details, commercial terms, and next steps.',
    primary: { label: 'Contact Us', href: '/contact' },
    secondary: { label: 'Find a Distributor', href: '/where-to-buy' },
  } satisfies CtaBandContent,
}

export const partnersDistributors = {
  meta: {
    title: 'Oriana for Distributors',
    description:
      'Become an Oriana distributor. Full product coverage, market coverage, and lifecycle service — with training, marketing, and project support.',
  } satisfies PageMeta,
  hero: {
    eyebrow: 'Partners',
    title: 'Joint growth. Shared success.',
    description:
      'Oriana offers distributors a bankable product line, a robust support network, and a clear path to grow residential, C&I, and utility sales together.',
  } satisfies HeroContent,
  intro: {
    title: 'Exceptional value, reliable support, a bright future',
    description:
      'Cutting-edge power conversion and storage technology, manufactured for compatibility and reliability. Partner with Oriana for growth — backed by training, supply, and service coverage.',
  } satisfies Intro,
  coverage: [
    {
      title: 'Full product coverage',
      body: 'A portfolio spanning residential, C&I, and utility scenarios — string, hybrid, and storage platforms designed to work together under one brand.',
    },
    {
      title: 'Full market coverage',
      body: 'Localized commercial support with the ability to tap Oriana’s broader resources as you expand across regions and customer segments.',
    },
    {
      title: 'Full service coverage',
      body: 'Lifecycle assurance: technical support, a reliable supply network, and after-sales programmes that cover products from commissioning through O&M.',
    },
  ] satisfies CardItem[],
  benefitsTitle: 'What other benefits do we offer?',
  benefits: [
    {
      title: 'Brand endorsement',
      body: 'Partner certification and opportunities to be featured as an authorized Oriana distributor.',
    },
    {
      title: 'Operational support',
      body: 'Performance plans tailored to your capabilities and market, with realistic goals and dedicated account support.',
    },
    {
      title: 'Digital tools',
      body: 'Partner accounts for order management, logistics visibility, and commercial tracking as your volume grows.',
    },
    {
      title: 'Marketing resources',
      body: 'Datasheets, videos, technical decks, and campaign assets to support both solutions and products.',
    },
    {
      title: 'Incentives and rewards',
      body: 'Development-based incentive policies, partner events, and opportunities to visit Oriana facilities with key customers.',
    },
    {
      title: 'Major project support',
      body: 'For tenders and large bids: solution workshops, customer visits, and joint meetings until the deal is secured.',
    },
  ] satisfies CardItem[],
  links: [
    { label: 'Product Documentation', href: '/resources/downloads' },
    { label: 'Cases & Stories', href: '/case-studies' },
    { label: 'Service & Support', href: '/support' },
  ] satisfies LinkItem[],
  cta: {
    title: 'Become an Oriana distributor',
    body: 'Inquire about distribution rights in your territory. We will follow up with portfolio details, commercial terms, and onboarding next steps.',
    primary: { label: 'Become a Distributor', href: '/partners/become-a-distributor' },
    secondary: { label: 'Find a Distributor', href: '/where-to-buy' },
  } satisfies CtaBandContent,
}

export const partnersApplyDistributor = {
  meta: {
    title: 'Become a Distributor',
    description:
      'Apply to distribute Oriana inverters and storage. Tell us about your territory and we will follow up with portfolio and commercial details.',
  } satisfies PageMeta,
  hero: {
    eyebrow: 'Partners',
    title: 'Become a distributor',
    description:
      'Bring Oriana inverters and storage to your market. Share a few details and our channel team will follow up with next steps.',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=80',
  } satisfies HeroContent,
  heroPrimary: { label: 'Start your application', href: '#distributor-form' } satisfies LinkItem,
  heroSecondary: { label: 'Find a distributor', href: '/where-to-buy' } satisfies LinkItem,
  intro: {
    title: 'What distribution with Oriana looks like',
    description:
      'Authorized distributors get a bankable portfolio, commercial support, and a service network behind every shipment.',
  } satisfies Intro,
  points: [
    {
      title: 'A full product line',
      body: 'Residential, commercial, and utility inverters and storage, sold under one brand with shared documentation.',
    },
    {
      title: 'Supply and service',
      body: 'Account support, training, and after-sales programmes that stay with the product after it leaves your warehouse.',
    },
    {
      title: 'Room to grow',
      body: 'Marketing assets, project support on larger bids, and a clear path as your territory expands.',
    },
  ] satisfies CardItem[],
  programmeLink: {
    label: 'Read the distributor programme',
    href: '/partners/distributors',
  } satisfies LinkItem,
  form: {
    title: 'Apply',
    body: 'Your application is saved for our channel team and emailed to info@orianainverters.com.',
    successTitle: 'Application received',
    successMessage:
      'Thank you. Our channel team will review your details and reply within two business days.',
  },
}

export const partnersInstallers = {
  meta: {
    title: 'Oriana for Installers',
    description:
      'Join Oriana as a certified installer. Access technical support, training, a global service network, and marketing resources.',
  } satisfies PageMeta,
  hero: {
    eyebrow: 'Partners',
    title: 'Join us. Be professional.',
    description:
      'Oriana works with installers worldwide to deliver reliable PV, hybrid, and storage systems — backed by dedicated sales and support teams.',
  } satisfies HeroContent,
  intro: {
    title: 'How we support you',
    description:
      'With dedicated engineering teams and a growing partner network, we help your installation business thrive — from first commissioning through long-term O&M.',
  } satisfies Intro,
  pillars: [
    {
      icon: 'headset',
      title: 'Technical Support',
      body: 'Remote diagnostics, on-site assistance, and a dedicated headquarters interface for regional teams — plus localized guides that close service gaps in the field.',
    },
    {
      icon: 'book-open',
      title: 'Training Resources',
      body: 'Online courses, hands-on workshops, and academy programmes covering product installation, commissioning, and after-sales service skills.',
    },
    {
      icon: 'globe',
      title: 'Global Service Network',
      body: 'Certified technicians, regional hubs, and responsive call centres so you can resolve issues quickly wherever you install Oriana equipment.',
    },
    {
      icon: 'megaphone',
      title: 'Marketing Support',
      body: 'Campaign collateral, solution decks, and real-world case studies to help you win homeowners, businesses, and repeat project work.',
    },
  ] satisfies CardItem[],
  quickLinks: [
    { label: 'Solutions for Home', href: '/solutions/residential' },
    { label: 'Solutions for Business', href: '/solutions/commercial' },
    { label: 'Cases & Stories', href: '/case-studies' },
    { label: 'Installer Training', href: '/partners/training' },
    { label: 'Product Documentation', href: '/resources/downloads' },
    { label: 'Warranty', href: '/support/warranty' },
  ] satisfies LinkItem[],
  cta: {
    title: 'Become an Oriana installer',
    body: 'Work with dedicated Oriana sales and support teams. Grow your company and customer base with a bankable inverter and storage portfolio.',
    primary: { label: 'Become an Installer', href: '/partners/become-an-installer' },
    secondary: { label: 'Find a Distributor', href: '/where-to-buy' },
  } satisfies CtaBandContent,
}

export const partnersApplyInstaller = {
  meta: {
    title: 'Become an Installer',
    description:
      'Apply to become a certified Oriana installer. Access training, technical support, warranty backing, and co-marketing resources.',
  } satisfies PageMeta,
  hero: {
    eyebrow: 'Partners',
    title: 'Become an Oriana installer',
    description:
      'Work with dedicated sales and support teams. Grow your company and customer base with Oriana PV, hybrid, and storage products.',
  } satisfies HeroContent,
  stepsTitle: 'How to join',
  steps: [
    {
      title: 'Tell us about your business',
      body: 'Share your region, typical project sizes, and whether you focus on residential, C&I, or both.',
    },
    {
      title: 'Meet the channel team',
      body: 'An Oriana representative will review your application, introduce local distributors, and outline programme requirements.',
    },
    {
      title: 'Complete product training',
      body: 'Finish installer academy modules covering installation, commissioning, monitoring, and after-sales service.',
    },
    {
      title: 'Go live with Oriana',
      body: 'Access documentation, warranty processes, and marketing assets so you can specify and install Oriana systems with confidence.',
    },
  ] satisfies CardItem[],
  benefitsTitle: 'What you get',
  benefits: [
    'Priority technical support for certified partners',
    'Installation videos, manuals, and FAQs',
    'Standard and extended warranty programmes',
    'Case studies and solution decks for homeowners and businesses',
    'Introductions to authorized distributors in your market',
  ],
  links: [
    { label: 'Installation Videos', href: '/resources/videos' },
    { label: 'FAQs', href: '/resources/faqs' },
    { label: 'Warranty', href: '/support/warranty' },
  ] satisfies LinkItem[],
  cta: {
    title: 'Start your installer application',
    body: 'Use the contact form and select installer partnership. Our team typically responds within one business day.',
    primary: { label: 'Contact Us', href: '/contact' },
    secondary: { label: 'Find a Distributor', href: '/where-to-buy' },
  } satisfies CtaBandContent,
}

export const partnersPartnership = {
  meta: {
    title: 'Partnership',
    description:
      'Become an Oriana partner — installers, distributors, EPCs, and technology alliances working together on solar and storage.',
  } satisfies PageMeta,
  hero: {
    eyebrow: 'Partners',
    title: 'Partnership with Oriana',
    description:
      'We build long-term relationships with channel, project, and technology partners who share a commitment to reliable clean energy.',
  } satisfies HeroContent,
  intro: {
    title: 'Choose how you partner',
    description:
      'Whether you install, distribute, develop projects, or integrate complementary technology, Oriana provides commercial support and a bankable product platform.',
  } satisfies Intro,
  paths: [
    {
      title: 'Certified installers',
      href: '/partners/become-an-installer',
      body: 'Specify and install Oriana inverters and storage with training, documentation, and dedicated installer support.',
      linkLabel: 'Learn more',
    },
    {
      title: 'Authorized distributors',
      href: '/partners/distributors',
      body: 'Stock and sell the Oriana portfolio with supply-chain support, incentives, and joint marketing.',
      linkLabel: 'Learn more',
    },
    {
      title: 'EPCs and developers',
      href: '/contact',
      body: 'Collaborate on C&I and utility projects with application engineering, bid support, and lifecycle service.',
      linkLabel: 'Learn more',
    },
    {
      title: 'Technology alliances',
      href: '/about/partners',
      body: 'Integrate batteries, monitoring, EV charging, and smart-home platforms with Oriana power conversion.',
      linkLabel: 'Learn more',
    },
  ] satisfies CardItem[],
  enablement: [
    {
      title: 'Training & enablement',
      body: 'Online and on-site programmes that build technical, commercial, and service capability across your team.',
    },
    {
      title: 'Joint marketing',
      body: 'Exhibitions, digital campaigns, and solution stories that raise your brand impact alongside Oriana.',
    },
    {
      title: 'Project collaboration',
      body: 'Bid support, customer workshops, and engineering reviews for major rooftop, C&I, and utility deals.',
    },
  ] satisfies CardItem[],
  cta: {
    title: 'Become a partner',
    body: 'Tell us which partnership path fits your business. We will connect you with the right Oriana team.',
    primary: { label: 'Become a Partner', href: '/contact' },
    secondary: { label: 'View Partner Network', href: '/about/partners' },
  } satisfies CtaBandContent,
}

export const partnersTraining = {
  meta: {
    title: 'Installer Training',
    description:
      'Oriana installer training community — installation, O&M, troubleshooting videos, and product documentation for PV and storage.',
  } satisfies PageMeta,
  hero: {
    eyebrow: 'Partners',
    title: 'Installer training community',
    description:
      'We power your growth journey — today and beyond. Installation training, O&M modules, and troubleshooting resources for Oriana professionals.',
  } satisfies HeroContent,
  topics: [
    {
      title: 'PV inverters',
      body: 'String and hybrid installation skills, commissioning checklists, and common fault-code walkthroughs.',
      href: '/resources/videos',
      linkLabel: 'Open resources',
    },
    {
      title: 'Energy storage',
      body: 'Hybrid and BESS installation practices, safety, and operations guidance for residential and C&I storage.',
      href: '/resources/videos',
      linkLabel: 'Open resources',
    },
    {
      title: 'O&M training',
      body: 'Preventive maintenance, remote diagnostics, and after-sales workflows that keep systems performing.',
      href: '/support',
      linkLabel: 'Open resources',
    },
    {
      title: 'Product documentation',
      body: 'Datasheets, manuals, certificates, and warranty documents in the download centre.',
      href: '/resources/downloads',
      linkLabel: 'Open resources',
    },
  ] satisfies CardItem[],
  quickLinks: [
    { label: 'Installation Videos', href: '/resources/videos' },
    { label: 'FAQs', href: '/resources/faqs' },
    { label: 'Download Centre', href: '/resources/downloads' },
  ] satisfies LinkItem[],
  cta: {
    title: 'Unlock professional growth',
    body: 'Certified Oriana installers get structured academy access, field guides, and a direct line to technical support.',
    primary: { label: 'Become an Installer', href: '/partners/become-an-installer' },
    secondary: { label: 'Contact Training', href: '/contact' },
  } satisfies CtaBandContent,
}
