import Link from 'next/link'
import { FadeIn } from './FadeIn'
import { ImageGallery } from './ImageGallery'

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80',
    alt: 'Solar farm at sunrise',
    caption: 'Utility-scale solar installation',
    layout: 'wide' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1558449028-b3695ee7b963?w=800&q=80',
    alt: 'Residential rooftop solar',
    caption: 'Residential rooftop system',
    layout: 'tall' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1613665813447-82a78c468ffe?w=800&q=80',
    alt: 'Solar inverter unit',
    caption: 'Oriana inverter technology',
    layout: 'square' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1466611653911-950815379e85?w=800&q=80',
    alt: 'Commercial solar panels',
    caption: 'Commercial & industrial deployment',
    layout: 'square' as const,
  },
]

export function GalleryAndCTA() {
  return (
    <>
      <section className="bg-oriana-surface py-24">
        <div className="container">
          <FadeIn className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-oriana-blue">
              Gallery
            </p>
            <h2 className="mt-3 text-3xl font-bold text-oriana-navy md:text-4xl">
              Powering Projects Worldwide
            </h2>
          </FadeIn>
          <ImageGallery images={galleryImages} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-oriana-navy py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-oriana-accent)_0%,_transparent_50%)] opacity-20" />
        <div className="container relative">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to Power Your Next Project?</h2>
            <p className="mt-4 text-lg text-white/75">
              Get expert guidance on inverter sizing, system design, and distributor availability.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-oriana-accent px-8 py-3.5 font-semibold text-oriana-navy transition hover:bg-white"
              >
                Request a Quote
              </Link>
              <Link
                href="/products"
                className="rounded-full border border-white/30 px-8 py-3.5 font-semibold transition hover:bg-white/10"
              >
                Browse Products
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
