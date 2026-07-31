/** Site IA — category hrefs used as static fallbacks; live Products menu comes from CMS. */

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
