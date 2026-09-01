import {
  buildProductsMegaMenu,
  categoryHref,
  familyHref,
  productMaster,
} from '@/data/productMaster'

/** Site IA — Products menu is built from productMaster.json. */

export type SimpleNavLink = { label: string; href: string }

export type NavMenuColumn = {
  title: string
  href?: string
  image?: string
  links: SimpleNavLink[]
}

export type NavMegaCategory = {
  label: string
  href: string
  image?: string
  columns: NavMenuColumn[]
}

export function categoryHasSubitems(category: NavMegaCategory): boolean {
  return (
    Boolean(category.image) ||
    category.columns.some((column) => column.links.length > 0 || Boolean(column.href))
  )
}

export function megaItemHasSubitems(categories: NavMegaCategory[] | undefined): boolean {
  return Boolean(categories?.some(categoryHasSubitems))
}

/** Products mega-menu — driven by productMaster.json (category → segment → product). */
export const productsMegaMenuCategories: NavMegaCategory[] = buildProductsMegaMenu()

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
]

const partnerSolutionsColumn: NavMenuColumn = {
  title: 'Solutions & Cases',
  links: [
    { label: 'Solutions for Home', href: '/solutions/residential' },
    { label: 'Solutions for Business', href: '/solutions/commercial' },
    { label: 'Cases & Stories', href: '/case-studies' },
  ],
}

const partnerHowToBuyColumn: NavMenuColumn = {
  title: 'How to Buy',
  links: [{ label: 'Find a Distributor', href: '/where-to-buy' }],
}

/** Partners mega-menu — left rail is Installers / Distributors only. */
export const partnersMegaMenuCategories: NavMegaCategory[] = [
  {
    label: 'Installers',
    href: '/partners/installers',
    columns: [
      {
        title: 'Partnership',
        links: [
          { label: 'Oriana for Installers', href: '/partners/installers' },
          { label: 'Become an Installer', href: '/partners/become-an-installer' },
        ],
      },
      partnerSolutionsColumn,
      partnerHowToBuyColumn,
      {
        title: 'Support',
        links: [
          { label: 'Installer Support', href: '/support' },
          { label: 'Product Documentation', href: '/resources/downloads' },
          { label: 'Installation Videos', href: '/resources/videos' },
          { label: 'FAQs', href: '/resources/faqs' },
          { label: 'Warranty', href: '/support/warranty' },
        ],
      },
    ],
  },
  {
    label: 'Distributors',
    href: '/partners/distributors',
    columns: [
      {
        title: 'Partnership',
        links: [
          { label: 'Oriana for Distributors', href: '/partners/distributors' },
          { label: 'Find a Distributor', href: '/where-to-buy' },
        ],
      },
      partnerSolutionsColumn,
      partnerHowToBuyColumn,
      {
        title: 'Support',
        links: [
          { label: 'Distributor Support', href: '/support' },
          { label: 'Product Documentation', href: '/resources/downloads' },
          { label: 'FAQs', href: '/resources/faqs' },
          { label: 'Warranty', href: '/support/warranty' },
        ],
      },
    ],
  },
]

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

export type MainNavEntry =
  | { type: 'link'; label: string; href: string }
  | { type: 'products'; label: string; categories: NavMegaCategory[] }
  | { type: 'partners'; label: string; categories: NavMegaCategory[] }
  | { type: 'support'; label: string; categories: NavMegaCategory[] }
  | { type: 'about'; label: string; categories: NavMegaCategory[] }

export const mainNav: MainNavEntry[] = [
  { type: 'link', label: 'Home', href: '/' },
  { type: 'products', label: 'Products', categories: productsMegaMenuCategories },
  { type: 'partners', label: 'Partners', categories: partnersMegaMenuCategories },
  { type: 'support', label: 'Service & Support', categories: supportMegaMenuCategories },
  { type: 'link', label: 'Sustainability', href: '/sustainability' },
  { type: 'about', label: 'About Us', categories: aboutMegaMenuCategories },
]

export const inverterMegaMenu = productMaster.categories.map((category) => ({
  title: category.name,
  href: categoryHref(category.name),
  products: category.families.map((family) => ({
    label: family.productName,
    href: familyHref(family),
  })),
}))

export const supportMenu = [
  { label: 'Download Center', href: '/resources/downloads' },
  { label: 'Warranty', href: '/support/warranty' },
  { label: 'FAQs', href: '/resources/faqs' },
  { label: 'Installation Videos', href: '/resources/videos' },
  { label: 'Contact Support', href: '/support' },
]

/** Sungrow-style mega-menu column groups */
export type MegaMenuLink = { label: string; href: string }
export type MegaMenuColumn = { title: string; href?: string; links: MegaMenuLink[] }
export type MegaMenuKey =
  | 'about'
  | 'home'
  | 'business'
  | 'utility'
  | 'products'
  | 'partners'
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
          { label: 'Hybrid Systems', href: '/products/category/hybrid-inverters' },
        ],
      },
      {
        title: 'Products',
        links: [
          { label: 'On Grid Inverters', href: '/products/category/on-grid-inverters' },
          { label: 'Hybrid Inverters', href: '/products/category/hybrid-inverters' },
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
          { label: 'On Grid Inverters', href: '/products/category/on-grid-inverters' },
          { label: 'Hybrid Inverters', href: '/products/category/hybrid-inverters' },
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
          { label: 'Utility Scale Inverters', href: '/products/category/utility-scale-inverters' },
          { label: 'Grid Services', href: '/solutions/utility' },
        ],
      },
      {
        title: 'Products',
        links: [
          { label: 'Utility Catalogue', href: '/products/category/utility-scale-inverters' },
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
  partners: {
    label: 'Partners',
    columns: partnersMegaMenuCategories.map((cat) => ({
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
