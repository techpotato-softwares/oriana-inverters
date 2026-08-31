import { redirect } from 'next/navigation'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { AllProductsCatalogue } from '@/components/oriana/AllProductsCatalogue'
import { staticCategories } from '@/data/products'
import {
  pickFeaturedCard,
  seriesToCatalogueCard,
  type AllProductsTab,
  type CatalogueByCategory,
} from '@/utilities/allProductsCatalogue'
import { getSeriesByCategory } from '@/utilities/getCatalogue'

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
  if (cat && legacyCategoryRedirects[cat]) {
    redirect(`/products/category/${legacyCategoryRedirects[cat]}`)
  }

  const tabs: AllProductsTab[] = staticCategories.map((item) => ({
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
      <PageHero
        variant="light"
        title="All Products"
        description="Raise energy yield and project returns with Oriana inverters, hybrid systems, and storage — engineered for homes, businesses, and utility plants."
      />
      <Breadcrumbs items={[{ label: 'All Products' }]} />
      <AllProductsCatalogue tabs={tabs} catalogues={catalogues} />
    </main>
  )
}
