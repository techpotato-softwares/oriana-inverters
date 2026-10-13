import type { HeroPageNavItem } from '@/components/oriana/HeroPageNav'

/** "All Products" plus one link per category, for the product hero sub-nav. */
export function productCategoryNav(categories: { slug: string; title: string }[]): HeroPageNavItem[] {
  return [
    { label: 'All Products', href: '/products' },
    ...categories.map((category) => ({
      label: category.title,
      href: `/products/category/${category.slug}`,
    })),
  ]
}
