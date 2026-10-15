import { redirect } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { HeroPageNav } from '@/components/oriana/HeroPageNav'
import { heroImages } from '@/components/oriana/heroImages'
import { AboutHero } from '@/components/oriana/about/shared/AboutHero'
import { productCategoryNav } from '@/utilities/productCategoryNav'
import { AllProductsCatalogue } from '@/components/oriana/AllProductsCatalogue'
import { staticCategories } from '@/data/products'
import {
  pickFeaturedCard,
  seriesToCatalogueCard,
  type AllProductsTab,
  type CatalogueByCategory,
} from '@/utilities/allProductsCatalogue'
import { getHiddenCategorySlugs, getSeriesByCategory } from '@/utilities/getCatalogue'

export const metadata = {
  title: 'All Products',
  description:
    'Browse Oriana solar inverters, hybrid systems, and storage — from residential rooftops to utility-scale plants.',
}

/** Legacy query-param / old category slug redirects */
const legacyCategoryRedirects: Record<string, string> = {
  string: 'on-grid-inverters',
  hybrid: 'hybrid-inverters',
  utility: 'utility-scale-inverters',
  micro: 'on-grid-inverters',
  accessories: 'on-grid-inverters',
  'single-phase': 'on-grid-inverters',
  'three-phase': 'on-grid-inverters',
  'utility-scale': 'utility-scale-inverters',
  'energy-storage': 'hybrid-inverters',
  'residential-grid-tied': 'on-grid-inverters',
  'ci-grid-tied': 'on-grid-inverters',
  'utility-grid-tied': 'utility-scale-inverters',
  'residential-hybrid': 'hybrid-inverters',
  'ci-hybrid': 'hybrid-inverters',
}

type Props = { searchParams: Promise<{ cat?: string; category?: string }> }

export const dynamic = 'force-dynamic'

export default async function ProductsPage({ searchParams }: Props) {
  const { cat, category: categoryParam } = await searchParams
  const hidden = await getHiddenCategorySlugs()
  const legacyTarget = cat ? legacyCategoryRedirects[cat] : undefined
  if (legacyTarget && !hidden.has(legacyTarget)) {
    redirect(`/products/category/${legacyTarget}`)
  }

  const tabs: AllProductsTab[] = staticCategories
    .filter((item) => !hidden.has(item.slug))
    .map((item) => ({
      slug: item.slug,
      title: item.title,
    }))

  const requested = categoryParam || (cat && !legacyCategoryRedirects[cat] ? cat : undefined)
  if (requested && tabs.some((tab) => tab.slug === requested)) {
    redirect(`/products/category/${requested}`)
  }

  const catalogues: CatalogueByCategory = Object.fromEntries(
    await Promise.all(
      tabs.map(async (tab) => {
        const series = await getSeriesByCategory(tab.slug)
        const cards = series.map(seriesToCatalogueCard)
        return [tab.slug, { cards, featured: pickFeaturedCard(cards) }] as const
      }),
    ),
  )

  return (
    <main>
      <AboutHero
        eyebrow="Products"
        title="All Products"
        description="Raise energy yield and project returns with Oriana inverters, hybrid systems, and storage — engineered for homes, businesses, and utility plants."
        media={{ kind: 'image', ...heroImages.products }}
        primary={{ label: 'Browse the range', href: '#catalogue' }}
        secondary={{ label: 'Find a distributor', href: '/where-to-buy' }}
        nav={<HeroPageNav label="Product categories" items={productCategoryNav(tabs)} />}
      />
      <Breadcrumbs items={[{ label: 'All Products' }]} />
      <div id="catalogue" className="scroll-mt-24">
        <AllProductsCatalogue tabs={tabs} catalogues={catalogues} />
      </div>
    </main>
  )
}
