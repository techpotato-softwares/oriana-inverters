import Link from 'next/link'
import { Headphones, Mail, MapPin, Phone } from 'lucide-react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { supportMenu } from '@/config/navigation'

export const metadata = {
  title: 'Service & Support',
  description: 'Technical support, warranty services, and resources for Oriana inverter owners and installers.',
}

const supportChannels = [
  {
    icon: Phone,
    title: 'Customer Hotline',
    detail: '+1 (800) ORIANA-1',
    note: 'Mon–Fri, 8 AM – 6 PM local time',
  },
  {
    icon: Mail,
    title: 'Technical Email',
    detail: 'support@orianainverters.com',
    note: 'Response within 1 business day',
  },
  {
    icon: Headphones,
    title: 'Installer Support',
    detail: 'installers@orianainverters.com',
    note: 'Dedicated line for certified partners',
  },
  {
    icon: MapPin,
    title: 'Regional Offices',
    detail: 'North America · Europe · APAC',
    note: 'Find your local representative',
  },
]

export default function SupportPage() {
  return (
    <main>
      <PageHero
        eyebrow="Support"
        title="Service & Support"
        description="Our technical team supports installers, EPCs, and end customers across every stage — from commissioning to long-term O&M."
      />
      <Breadcrumbs items={[{ label: 'Support' }]} />

      <section className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supportChannels.map((ch) => (
              <div key={ch.title} className="rounded border border-oriana-navy/8 p-6">
                <ch.icon className="h-8 w-8 text-oriana-blue" />
                <h2 className="mt-4 font-semibold text-oriana-navy">{ch.title}</h2>
                <p className="mt-2 text-sm font-medium text-oriana-blue">{ch.detail}</p>
                <p className="mt-1 text-xs text-oriana-muted">{ch.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-oriana-navy">Self-Service Resources</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {supportMenu
                .filter((l) => l.href !== '/support')
                .map((link) => (
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
              <h2 className="font-display text-2xl font-bold">Submit a Support Ticket</h2>
              <p className="mt-3 text-white/70">
                Describe your issue, include the inverter serial number and fault code if applicable. Our team will
                respond within one business day.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block rounded bg-white px-6 py-3 text-sm font-bold text-oriana-navy hover:bg-oriana-silver"
              >
                Open Contact Form
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
