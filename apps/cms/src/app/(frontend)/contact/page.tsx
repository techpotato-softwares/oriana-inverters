import type { Metadata } from 'next'
import type { LucideIcon } from 'lucide-react'
import { Headphones, Mail, MapPin, Phone } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { ContactForm } from '@/components/oriana/ContactForm'
import { PageHero } from '@/components/oriana/PageHero'
import { getContactContent } from '@/utilities/getSiteContent'

const iconMap: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  map: MapPin,
  headphones: Headphones,
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContactContent()
  return {
    title: content.seo?.metaTitle,
    description: content.seo?.metaDescription,
  }
}

export default async function ContactPage() {
  const content = await getContactContent()

  return (
    <main>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-oriana-navy">{content.sidebarTitle}</h2>
              <div className="mt-8 space-y-6">
                {content.contactItems.map((item) => {
                  const Icon = iconMap[item.icon] ?? Mail
                  return (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-oriana-silver text-oriana-blue">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-oriana-muted">
                          {item.label}
                        </p>
                        <p className="mt-1 font-medium text-oriana-navy">{item.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="lg:col-span-3">
              <ContactForm form={content.form} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
