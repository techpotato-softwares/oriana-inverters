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

export const supportMegaMenuCategories: NavMegaCategory[] = [
  {
    label: 'Overview', // We can hide this or use it as the main trigger
    href: '/support',
    columns: [
      {
        title: 'Oriana Service',
        links: [
          { label: 'Service Brand', href: '/support#service-brand' },
          { label: 'Service Stories', href: '/support#service-stories' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Product Documentation', href: '/resources/downloads' },
          { label: 'FAQs', href: '/resources/faqs' },
          { label: 'Warranty', href: '/support/warranty' },
        ],
      },
      {
        title: 'Success Stories',
        links: [
          { label: 'Cases & Stories', href: '/case-studies' },
        ],
      },
    ],
  },
]

/** Partners mega-menu — distributors only. Installer pages stay reachable by URL. */
export const partnersMegaMenuCategories: NavMegaCategory[] = [
  {
    label: 'Distributors',
    href: '/partners/distributors',
    columns: [
      {
        title: 'Partnership',
        links: [
          { label: 'Become a Distributor', href: '/partners/become-a-distributor' },
          { label: 'Find a Distributor', href: '/where-to-buy' },
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
          { label: 'Case Studies', href: '/case-studies' },
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
          { label: 'Our Achievements', href: '/about/foundation' },
        ],
      },
      {
        title: 'Get Involved',
        links: [{ label: 'Partner With Us', href: '/contact?intent=sales#contact-form' }],
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
          { label: 'Open Positions', href: '/careers#openings' },
          { label: 'Life at Oriana', href: '/careers#life' },
          { label: 'Apply Now', href: '/careers#apply' },
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
          { label: 'Contact Oriana', href: '/contact#contact-form' },
          { label: 'Sales Enquiry', href: '/contact?intent=sales#contact-form' },
          { label: 'Support', href: '/support' },
        ],
      },
      {
        title: 'Locations',
        links: [
          { label: 'Where to Buy', href: '/where-to-buy' },
          { label: 'Find a Distributor', href: '/where-to-buy' },
          { label: 'Request a Quote', href: '/contact?intent=quote#contact-form' },
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
          { label: 'Case Studies', href: '/case-studies' },
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
