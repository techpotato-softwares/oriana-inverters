/** Site IA — benchmarked against Solis + Sungrow (plan §2, §5) */

export const inverterMegaMenu = [
  {
    title: 'Single Phase PV Inverter',
    href: '/products/category/single-phase',
    products: [
      { label: 'ORI-1P(3.6-5)K-US', href: '/products/ori-1p-3-6-5k-us' },
      { label: 'ORI-1P(6-10)K-US', href: '/products/ori-1p-6-10k-us' },
      { label: 'ORI-S6(3.8-11.4)K-US', href: '/products/ori-s6-3-8-11-4k-us' },
    ],
  },
  {
    title: 'Three Phase PV Inverter',
    href: '/products/category/three-phase',
    products: [
      { label: 'ORI-S5(75-125)K-US', href: '/products/ori-s5-75-125k-us' },
      { label: 'ORI-T75(50-110)K-US', href: '/products/ori-t75-50-110k-us' },
      { label: 'ORI-GC(25-60)K-US', href: '/products/ori-gc-25-60k-us' },
    ],
  },
  {
    title: 'Utility-Scale PV Inverter',
    href: '/products/category/utility-scale',
    products: [
      { label: 'ORI-GU250K-EHV-US', href: '/products/ori-gu250k-ehv-us' },
      { label: 'ORI-4200-MV Skid Solution', href: '/products/ori-4200-mv-skid' },
      { label: 'ORI-U2500 Central', href: '/products/ori-u2500-central' },
    ],
  },
  {
    title: 'Energy Storage Inverter',
    href: '/products/category/energy-storage',
    products: [
      { label: 'ORI-S6-EH1P(3.8-11.4)K-H-US', href: '/products/ori-s6-eh1p-hybrid' },
      { label: 'ORI-S6-EH2P(9.6-16)K-US', href: '/products/ori-s6-eh2p-hybrid' },
      { label: 'ORI-S6-EH3P(30-60)K-US', href: '/products/ori-s6-eh3p-hybrid' },
    ],
  },
  {
    title: 'Accessories',
    href: '/products/category/accessories',
    products: [
      { label: 'ORI-EPM Energy Manager', href: '/products/ori-epm' },
      { label: 'ORI-Data Logger', href: '/products/ori-data-logger' },
      { label: 'ORI-Monitoring Platform', href: '/products/ori-monitoring' },
    ],
  },
]

export const solutionsMenu = [
  { label: 'Residential', href: '/solutions/residential', desc: 'Home solar & battery solutions' },
  { label: 'Commercial & Industrial', href: '/solutions/commercial', desc: 'C&I rooftops & carports' },
  { label: 'Utility-Scale', href: '/solutions/utility', desc: 'Solar farms & IPP projects' },
  { label: 'Energy Storage', href: '/solutions/storage', desc: 'Hybrid & grid services' },
  { label: 'Case Studies', href: '/case-studies', desc: 'Customer success stories' },
]

export const supportMenu = [
  { label: 'Download Center', href: '/resources/downloads' },
  { label: 'Warranty', href: '/support/warranty' },
  { label: 'FAQs', href: '/resources/faqs' },
  { label: 'Installation Videos', href: '/resources/videos' },
  { label: 'Contact Support', href: '/support' },
]

export const newsMenu = [
  { label: 'Newsroom', href: '/posts' },
  { label: 'Video Center', href: '/resources/videos' },
  { label: 'Case Studies', href: '/case-studies' },
]

export const aboutMenu = [
  { label: 'Company Profile', href: '/about' },
  { label: 'Certifications & Awards', href: '/about/certifications' },
  { label: 'Partners', href: '/about/partners' },
  { label: 'Contact Us', href: '/contact' },
]

export const segments = [
  {
    id: 'home',
    label: 'For Home',
    href: '/solutions/residential',
    tagline: 'Residential PV + Storage + EV-ready solutions',
    image: 'residential',
  },
  {
    id: 'business',
    label: 'For Business',
    href: '/solutions/commercial',
    tagline: 'Commercial & industrial power conversion',
    image: 'commercial',
  },
  {
    id: 'utility',
    label: 'For Utility',
    href: '/solutions/utility',
    tagline: 'Utility-scale central inverter platforms',
    image: 'utility',
  },
] as const

/** Sungrow-style mega-menu column groups */
export type MegaMenuLink = { label: string; href: string }
export type MegaMenuColumn = { title: string; href?: string; links: MegaMenuLink[] }
export type MegaMenuKey =
  | 'about'
  | 'home'
  | 'business'
  | 'utility'
  | 'products'
  | 'support'

export const megaMenus: Record<
  MegaMenuKey,
  { label: string; columns: MegaMenuColumn[] }
> = {
  about: {
    label: 'About Us',
    columns: [
      {
        title: 'About Oriana',
        links: [
          { label: 'Company Profile', href: '/about' },
          { label: 'Certifications & Awards', href: '/about/certifications' },
        ],
      },
      {
        title: 'News & Media',
        links: [
          { label: 'Newsroom', href: '/posts' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Video Center', href: '/resources/videos' },
        ],
      },
      {
        title: 'Partners',
        links: [
          { label: 'Partners', href: '/about/partners' },
          { label: 'Where to Buy', href: '/where-to-buy' },
          { label: 'Contact Us', href: '/contact' },
        ],
      },
    ],
  },
  home: {
    label: 'For Home',
    columns: [
      {
        title: 'Solutions',
        links: [
          { label: 'Residential PV', href: '/solutions/residential' },
          { label: 'Energy Storage', href: '/solutions/storage' },
          { label: 'Hybrid Systems', href: '/products/category/energy-storage' },
        ],
      },
      {
        title: 'Products',
        links: [
          { label: 'Single Phase Inverters', href: '/products/category/single-phase' },
          { label: 'Hybrid Inverters', href: '/products/ori-s6-eh1p-hybrid' },
          { label: 'All Home Products', href: '/products' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Download Center', href: '/resources/downloads' },
          { label: 'Installation Videos', href: '/resources/videos' },
          { label: 'FAQs', href: '/resources/faqs' },
        ],
      },
    ],
  },
  business: {
    label: 'For Business',
    columns: [
      {
        title: 'Solutions',
        links: [
          { label: 'Commercial & Industrial', href: '/solutions/commercial' },
          { label: 'C&I Rooftops', href: '/solutions/commercial' },
          { label: 'Energy Storage', href: '/solutions/storage' },
        ],
      },
      {
        title: 'Products',
        links: [
          { label: 'Three Phase Inverters', href: '/products/category/three-phase' },
          { label: 'ORI-S5 Series', href: '/products/ori-s5-75-125k-us' },
          { label: 'All C&I Products', href: '/products' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Service & Support', href: '/support' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Request a Quote', href: '/contact' },
        ],
      },
    ],
  },
  utility: {
    label: 'For Utility',
    columns: [
      {
        title: 'Solutions',
        links: [
          { label: 'Utility-Scale PV', href: '/solutions/utility' },
          { label: 'Central Inverters', href: '/products/category/utility-scale' },
          { label: 'Grid Services', href: '/solutions/utility' },
        ],
      },
      {
        title: 'Products',
        links: [
          { label: 'ORI-GU250K', href: '/products/ori-gu250k-ehv-us' },
          { label: 'ORI-U2500 Central', href: '/products/ori-u2500-central' },
          { label: 'All Utility Products', href: '/products/category/utility-scale' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Datasheets', href: '/resources/downloads' },
          { label: 'Contact Sales', href: '/contact' },
        ],
      },
    ],
  },
  products: {
    label: 'Products',
    columns: inverterMegaMenu.map((col) => ({
      title: col.title.replace(' PV Inverter', '').replace(' Inverter', ''),
      href: col.href,
      links: col.products.map((p) => ({ label: p.label, href: p.href })),
    })),
  },
  support: {
    label: 'Service & Support',
    columns: [
      {
        title: 'Oriana Service',
        links: [
          { label: 'Service & Support', href: '/support' },
          { label: 'Warranty', href: '/support/warranty' },
          { label: 'Contact Support', href: '/support' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Download Center', href: '/resources/downloads' },
          { label: 'Installation Videos', href: '/resources/videos' },
          { label: 'FAQs', href: '/resources/faqs' },
        ],
      },
      {
        title: 'Sales',
        links: [
          { label: 'Where to Buy', href: '/where-to-buy' },
          { label: 'Find a Distributor', href: '/where-to-buy' },
          { label: 'Request a Quote', href: '/contact' },
        ],
      },
    ],
  },
}

export const primaryNav: MegaMenuKey[] = [
  'about',
  'home',
  'business',
  'utility',
  'products',
  'support',
]
