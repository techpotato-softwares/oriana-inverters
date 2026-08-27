/** Site IA — category hrefs used as static fallbacks; live Products menu comes from CMS. */

export type SimpleNavLink = { label: string; href: string }

export type NavMenuColumn = { title: string; links: SimpleNavLink[] }

export type NavMegaCategory = {
  label: string
  href: string
  columns: NavMenuColumn[]
}

/** @deprecated Use NavMegaCategory */
export type ProductCategoryNav = NavMegaCategory

/** Products mega-menu — left category rail + column links (Sungrow-style). */
export const productsMegaMenuCategories: NavMegaCategory[] = [
  {
    label: 'On Grid Inverters',
    href: '/products/category/residential-grid-tied',
    columns: [
      {
        title: 'Products',
        links: [
          { label: 'Residential Grid-Tied', href: '/products/category/residential-grid-tied' },
          { label: 'C&I Grid-Tied', href: '/products/category/ci-grid-tied' },
          { label: 'All On Grid', href: '/products' },
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
  {
    label: 'Hybrid Inverters',
    href: '/products/category/residential-hybrid',
    columns: [
      {
        title: 'Products',
        links: [
          { label: 'Residential Hybrid', href: '/products/category/residential-hybrid' },
          { label: 'C&I Hybrid', href: '/products/category/ci-hybrid' },
          { label: 'All Hybrid', href: '/products' },
        ],
      },
      {
        title: 'Solutions',
        links: [
          { label: 'For Home', href: '/solutions/residential' },
          { label: 'For Business', href: '/solutions/commercial' },
          { label: 'Energy Storage', href: '/solutions/storage' },
        ],
      },
    ],
  },
  {
    label: 'Utility Scale Inverters',
    href: '/products/category/utility-grid-tied',
    columns: [
      {
        title: 'Products',
        links: [
          { label: 'Utility Grid-Tied', href: '/products/category/utility-grid-tied' },
          { label: 'All Utility Products', href: '/products' },
        ],
      },
      {
        title: 'Solutions',
        links: [
          { label: 'Utility-Scale PV', href: '/solutions/utility' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Contact Sales', href: '/contact' },
        ],
      },
    ],
  },
  {
    label: 'BESS',
    href: '/products/category/ci-hybrid',
    columns: [
      {
        title: 'Products',
        links: [
          { label: 'C&I Hybrid / BESS', href: '/products/category/ci-hybrid' },
          { label: 'Residential Hybrid', href: '/products/category/residential-hybrid' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Service & Support', href: '/support' },
          { label: 'Warranty', href: '/support/warranty' },
          { label: 'Documentation', href: '/resources/downloads' },
        ],
      },
    ],
  },
]

/** Service & Support mega-menu */
export const supportMegaMenuCategories: NavMegaCategory[] = [
  {
    label: 'Service & Support',
    href: '/support',
    columns: [
      {
        title: 'Oriana Service',
        links: [
          { label: 'Service & Support', href: '/support' },
          { label: 'Contact Support', href: '/support' },
          { label: 'Security Incident Response', href: '/support/security' },
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
  {
    label: 'Warranty',
    href: '/support/warranty',
    columns: [
      {
        title: 'Warranty',
        links: [
          { label: 'Warranty Overview', href: '/support/warranty' },
          { label: 'Product Documentation', href: '/resources/downloads' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Contact Support', href: '/support' },
          { label: 'Where to Buy', href: '/where-to-buy' },
        ],
      },
    ],
  },
  {
    label: 'Documentation',
    href: '/resources/downloads',
    columns: [
      {
        title: 'Downloads',
        links: [
          { label: 'Download Center', href: '/resources/downloads' },
          { label: 'Product Documentation', href: '/resources/downloads' },
          { label: 'Installation Videos', href: '/resources/videos' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'FAQs', href: '/resources/faqs' },
          { label: 'Case Studies', href: '/case-studies' },
        ],
      },
    ],
  },
  {
    label: 'Partners',
    href: '/about/partners',
    columns: [
      {
        title: 'Partnership',
        links: [
          { label: 'Become a Partner', href: '/about/partners' },
          { label: 'Find a Distributor', href: '/where-to-buy' },
        ],
      },
      {
        title: 'Sales',
        links: [
          { label: 'Where to Buy', href: '/where-to-buy' },
          { label: 'Request a Quote', href: '/contact' },
        ],
      },
    ],
  },
]

/** Flat list for mobile / simple fallbacks */
export const supportNavLinks: SimpleNavLink[] = supportMegaMenuCategories.map((cat) => ({
  label: cat.label,
  href: cat.href,
}))

/** Flat list for mobile / simple fallbacks */
export const productsNavLinks: SimpleNavLink[] = productsMegaMenuCategories.map((cat) => ({
  label: cat.label,
  href: cat.href,
}))

/** About Us mega-menu */
export const aboutMegaMenuCategories: NavMegaCategory[] = [
  {
    label: 'About ORIANA',
    href: '/about',
    columns: [
      {
        title: 'Company',
        links: [
          { label: 'Company Profile', href: '/about' },
          { label: 'Brand Story', href: '/about' },
          { label: 'Certifications & Awards', href: '/about/certifications' },
        ],
      },
      {
        title: 'Organization',
        links: [
          { label: 'Partners', href: '/about/partners' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Sustainability', href: '/sustainability' },
        ],
      },
    ],
  },
  {
    label: 'News & Media',
    href: '/posts',
    columns: [
      {
        title: 'News',
        links: [
          { label: 'Newsroom', href: '/posts' },
          { label: 'Press Releases', href: '/posts' },
          { label: 'Events', href: '/posts' },
        ],
      },
      {
        title: 'Media',
        links: [
          { label: 'Video Center', href: '/resources/videos' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Blog', href: '/posts' },
        ],
      },
    ],
  },
  {
    label: 'Oriana Foundation',
    href: '/about/foundation',
    columns: [
      {
        title: 'Foundation',
        links: [
          { label: 'Our Mission', href: '/about/foundation' },
          { label: 'Community Programmes', href: '/about/foundation' },
          { label: 'Our Achievements', href: '/about/foundation' },
        ],
      },
      {
        title: 'Get Involved',
        links: [
          { label: 'Partner With Us', href: '/contact' },
          { label: 'Volunteer', href: '/contact' },
          { label: 'Contact Foundation', href: '/contact' },
        ],
      },
    ],
  },
  {
    label: 'Career',
    href: '/careers',
    columns: [
      {
        title: 'Careers',
        links: [
          { label: 'Open Positions', href: '/careers' },
          { label: 'Life at Oriana', href: '/careers' },
          { label: 'Their Stories', href: '/careers' },
        ],
      },
      {
        title: 'Join Us',
        links: [
          { label: 'Apply Now', href: '/careers' },
          { label: 'Recruitment', href: '/careers' },
          { label: 'Internships', href: '/careers' },
        ],
      },
    ],
  },
  {
    label: 'Contact Us',
    href: '/contact',
    columns: [
      {
        title: 'Contact',
        links: [
          { label: 'Contact Oriana', href: '/contact' },
          { label: 'Sales Enquiry', href: '/contact' },
          { label: 'Support', href: '/support' },
        ],
      },
      {
        title: 'Locations',
        links: [
          { label: 'Where to Buy', href: '/where-to-buy' },
          { label: 'Find a Distributor', href: '/where-to-buy' },
          { label: 'Request a Quote', href: '/contact' },
        ],
      },
    ],
  },
]

/** Flat list for mobile / simple fallbacks */
export const aboutNavLinks: SimpleNavLink[] = aboutMegaMenuCategories.map((cat) => ({
  label: cat.label,
  href: cat.href,
}))

export type MainNavEntry =
  | { type: 'link'; label: string; href: string }
  | { type: 'products'; label: string; categories: NavMegaCategory[] }
  | { type: 'support'; label: string; categories: NavMegaCategory[] }
  | { type: 'about'; label: string; categories: NavMegaCategory[] }

/** Sustainability sub-pages — used in footer and in-page sub-nav */
export const sustainabilityNavLinks: SimpleNavLink[] = [
  { label: 'Overview', href: '/sustainability' },
  { label: 'Sustainability Strategy', href: '/sustainability/strategy' },
  { label: 'Reports and Policies', href: '/sustainability/reports' },
]

export const mainNav: MainNavEntry[] = [
  { type: 'link', label: 'Home', href: '/' },
  { type: 'products', label: 'Products', categories: productsMegaMenuCategories },
  { type: 'support', label: 'Service & Support', categories: supportMegaMenuCategories },
  { type: 'link', label: 'Sustainability', href: '/sustainability' },
  { type: 'about', label: 'About Us', categories: aboutMegaMenuCategories },
]

export const inverterMegaMenu = [
  {
    title: 'Residential Grid-Tied PV Inverter',
    href: '/products/category/residential-grid-tied',
    products: [] as { label: string; href: string }[],
  },
  {
    title: 'C&I Grid-Tied PV Inverter',
    href: '/products/category/ci-grid-tied',
    products: [] as { label: string; href: string }[],
  },
  {
    title: 'Utility Grid-Tied PV Inverter',
    href: '/products/category/utility-grid-tied',
    products: [] as { label: string; href: string }[],
  },
  {
    title: 'Residential Hybrid Inverter',
    href: '/products/category/residential-hybrid',
    products: [] as { label: string; href: string }[],
  },
  {
    title: 'C&I Hybrid Inverter',
    href: '/products/category/ci-hybrid',
    products: [] as { label: string; href: string }[],
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
          { label: 'Hybrid Systems', href: '/products/category/residential-hybrid' },
        ],
      },
      {
        title: 'Products',
        links: [
          { label: 'Residential Grid-Tied', href: '/products/category/residential-grid-tied' },
          { label: 'Residential Hybrid', href: '/products/category/residential-hybrid' },
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
          { label: 'C&I Grid-Tied', href: '/products/category/ci-grid-tied' },
          { label: 'C&I Hybrid', href: '/products/category/ci-hybrid' },
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
          { label: 'Utility Grid-Tied', href: '/products/category/utility-grid-tied' },
          { label: 'Grid Services', href: '/solutions/utility' },
        ],
      },
      {
        title: 'Products',
        links: [
          { label: 'Utility Catalogue', href: '/products/category/utility-grid-tied' },
          { label: 'All Products', href: '/products' },
          { label: 'Request a Quote', href: '/contact' },
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
    columns: productsMegaMenuCategories.map((cat) => ({
      title: cat.label,
      href: cat.href,
      links: cat.columns.flatMap((col) => col.links),
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

export const primaryNav: MegaMenuKey[] = ['products']
