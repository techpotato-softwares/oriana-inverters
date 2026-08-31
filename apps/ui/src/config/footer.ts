/** Sungrow-style footer column groups */
export const footerNav = [
  {
    title: 'Products & Solutions',
    links: [
      { label: 'Residential Solutions', href: '/solutions/residential' },
      { label: 'C&I PV Solutions', href: '/solutions/commercial' },
      { label: 'Utility PV Solutions', href: '/solutions/utility' },
      { label: 'Energy Storage', href: '/solutions/storage' },
      { label: 'On Grid Inverters', href: '/products/category/on-grid-inverters' },
      { label: 'Hybrid Inverters', href: '/products/category/hybrid-inverters' },
      { label: 'Utility Scale Inverters', href: '/products/category/utility-scale-inverters' },
      { label: 'BESS', href: '/products/category/bess' },
    ],
  },
  {
    title: 'Partners',
    links: [
      { label: 'Oriana for Installers', href: '/partners/installers' },
      { label: 'Oriana for Distributors', href: '/partners/distributors' },
      { label: 'Find a Distributor', href: '/where-to-buy' },
    ],
  },
  {
    title: 'Service & Support',
    links: [
      { label: 'Oriana Service', href: '/support' },
      { label: 'Product Documentation', href: '/resources/downloads' },
      { label: 'Cases & Stories', href: '/case-studies' },
      { label: 'FAQs', href: '/resources/faqs' },
      { label: 'Security Incident Response', href: '/support/security' },
    ],
  },
  {
    title: 'Sustainability',
    links: [
      { label: 'Overview', href: '/sustainability' },
      { label: 'Sustainability Strategy', href: '/sustainability/strategy' },
      { label: 'Reports & Policies', href: '/sustainability/reports' },
    ],
  },
  {
    title: 'About Us',
    links: [
      { label: 'About ORIANA', href: '/about' },
      { label: 'News & Media', href: '/posts' },
      { label: 'Oriana Foundation', href: '/about/foundation' },
      { label: 'Career', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
] as const

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/oriana-inverters' },
  { label: 'Facebook', href: 'https://www.facebook.com/orianainverters' },
  { label: 'YouTube', href: 'https://www.youtube.com/@orianainverters' },
  { label: 'Instagram', href: 'https://www.instagram.com/orianainverters' },
] as const
