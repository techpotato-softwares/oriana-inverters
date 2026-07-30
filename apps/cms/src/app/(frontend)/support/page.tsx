import type { Metadata } from 'next'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Headphones, Mail, MapPin, Phone } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { getSupportContent } from '@/utilities/getSiteContent'

const iconMap: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  map: MapPin,
  headphones: Headphones,
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSupportContent()
  return {
    title: content.seo?.metaTitle,
    description: content.seo?.metaDescription,
  }
}

export default async function SupportPage() {
  const content = await getSupportContent()

  return (
    <main>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />
      <Breadcrumbs items={[{ label: 'Support' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.channels.map((ch) => {
              const Icon = iconMap[ch.icon] ?? Phone
              return (
                <div key={ch.title} className="rounded border border-oriana-navy/8 p-6">
                  <Icon className="h-8 w-8 text-oriana-blue" />
                  <h2 className="mt-4 font-semibold text-oriana-navy">{ch.title}</h2>
                  <p className="mt-2 text-sm font-medium text-oriana-blue">{ch.detail}</p>
                  <p className="mt-1 text-xs text-oriana-muted">{ch.note}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-oriana-navy">{content.resourcesTitle}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.resourceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded border border-oriana-navy/8 bg-oriana-silver/30 px-6 py-4 font-medium text-oriana-navy transition hover:border-oriana-blue hover:bg-white"
                >
                  {link.label}
                  <span className="text-oriana-blue">→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 rounded border border-oriana-blue/20 bg-oriana-navy p-8 text-white lg:p-12">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold">{content.ticketCta.title}</h2>
              <p className="mt-3 text-white/70">{content.ticketCta.description}</p>
              <Link
                href={content.ticketCta.cta.href}
                className="mt-6 inline-block rounded bg-white px-6 py-3 text-sm font-bold text-oriana-navy hover:bg-oriana-silver"
              >
                {content.ticketCta.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
