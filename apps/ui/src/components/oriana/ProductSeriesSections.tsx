import {
  productCardTypeLabel,
  ProductSeriesCard,
} from './ProductSeriesCard'
import { listingSectionTitle } from '@/data/productMaster'
import { groupCardsBySegment, type AllProductsCard } from '@/utilities/allProductsCatalogue'

export function ProductSeriesSections({ cards }: { cards: AllProductsCard[] }) {
  const groups = groupCardsBySegment(cards)

  return (
    <div className="space-y-16 lg:space-y-20">
      {groups.map((group) => {
        const heading = listingSectionTitle(group.title)
        const headingId = `segment-${heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
        return (
          <section key={group.title} aria-labelledby={headingId}>
            <h2 id={headingId} className="category-section-heading mb-8 text-2xl font-semibold text-oriana-navy">
              {heading}
            </h2>
            <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {group.cards.map((card) => (
                <ProductSeriesCard
                  key={card.slug}
                  href={`/products/${card.slug}`}
                  typeLabel={productCardTypeLabel(card.group, card.categorySlug)}
                  title={card.series}
                  name={card.series}
                  categorySlug={card.categorySlug}
                  imageSrc={card.heroImageUrl}
                  imageAlt={card.heroImageAlt}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
