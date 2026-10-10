import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { FadeIn } from '@/components/oriana/FadeIn'
import { SectionHeading } from '@/components/oriana/sustainability/SectionHeading'

export type AboutExploreLink = {
  label: string
  description: string
  href: string
  image: string
}

/** Image cards that route visitors to the other About pages. */
export function AboutExplore({
  eyebrow = 'Keep exploring',
  title,
  links,
}: {
  eyebrow?: string
  title: string
  links: AboutExploreLink[]
}) {
  return (
    <section aria-labelledby="about-explore-title" className="bg-oriana-surface py-20 lg:py-28">
      <div className="container">
        <FadeIn>
          <SectionHeading id="about-explore-title" eyebrow={eyebrow} title={title} />
        </FadeIn>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {links.map((link, index) => (
            <li key={link.href}>
              <FadeIn delay={index * 0.08} className="h-full">
                <Link
                  href={link.href}
                  className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-3xl bg-oriana-deep p-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oriana-blue"
                >
                  <Image
                    src={link.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-oriana-deep via-oriana-deep/35 to-transparent"
                  />
                  <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-oriana-deep">
                    <ArrowUpRight className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="relative">
                    <span className="block font-display text-xl font-semibold text-white lg:text-2xl">
                      {link.label}
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-white/75">{link.description}</span>
                  </span>
                </Link>
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
