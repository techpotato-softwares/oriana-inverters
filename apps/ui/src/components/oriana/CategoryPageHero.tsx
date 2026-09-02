import { CATEGORY_HERO_IMAGE } from '@/data/categoryPageCopy'

export function CategoryPageHero({ title }: { title: string }) {
  return (
    <section className="category-hero" aria-label={`${title} hero`}>
      <img
        src={CATEGORY_HERO_IMAGE}
        alt=""
        style={{
          display: 'block',
          width: '100%',
          height: 'min(62vh, 640px)',
          objectFit: 'cover',
          objectPosition: 'center bottom',
        }}
      />
    </section>
  )
}

export function CategoryPageIntro({
  title,
  paragraphs,
}: {
  title: string
  paragraphs: string[]
}) {
  if (!paragraphs.length) return null

  return (
    <div className="category-intro mb-12 lg:mb-16">
      <h1 className="font-sans text-4xl font-bold text-oriana-navy">{title}</h1>
      <div className="category-intro-body mt-5">
        {paragraphs.map((paragraph, index) => (
          <p
            key={paragraph.slice(0, 48)}
            className={index === 0 ? 'text-base leading-relaxed text-oriana-ink' : 'mt-4 text-base leading-relaxed text-oriana-ink'}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
