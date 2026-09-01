import {
  productCardTypeLabel,
  ProductSeriesCard,
} from './ProductSeriesCard'
import { groupCardsBySegment, type AllProductsCard } from '@/utilities/allProductsCatalogue'

export function ProductSeriesSections({ cards }: { cards: AllProductsCard[] }) {
  const groups = groupCardsBySegment(cards)
  const showHeadings = groups.length > 1

  return (
    <div className="space-y-16 lg:space-y-20">
      {groups.map((group) => {
        const headingId = showHeadings
          ? `segment-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
          : undefined
        return (
          <section key={group.title} aria-labelledby={headingId}>
            {showHeadings ? (
              <div className="mb-8 flex items-end justify-between gap-4 border-b border-oriana-navy/10 pb-4">
                <h2
                  id={headingId}
                  className="font-display text-2xl font-semibold text-oriana-ink md:text-3xl"
                >
                  {group.title}
                </h2>
                <p className="shrink-0 text-sm text-oriana-muted">
                  {group.cards.length} {group.cards.length === 1 ? 'product' : 'products'}
                </p>
              </div>
            ) : null}
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
