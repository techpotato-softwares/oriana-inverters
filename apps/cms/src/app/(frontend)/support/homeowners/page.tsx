import { Metadata } from 'next'
import { PageHero } from '@/components/oriana/PageHero'
import { FadeIn } from '@/components/oriana/FadeIn'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Homeowners Support | Oriana Inverters',
  description: 'Everything you need to monitor, manage, and maintain your home solar system.',
}

export default function HomeownersSupportPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <PageHero
        eyebrow="Support For You"
        title="Homeowners Support"
        description="Welcome to your solar journey. Find quick guides, setup instructions for monitoring apps, and direct contact options for any questions about your home system."
        variant="light"
      />
      
      <section className="py-24 bg-white">
        <div className="container">
          <FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 border border-gray-100 rounded-2xl bg-oriana-surface hover:shadow-md transition">
                <h3 className="text-xl font-display font-medium text-oriana-navy mb-4">Quick Start Guides</h3>
                <p className="text-oriana-muted mb-6">Learn how to read your inverter display, connect to Wi-Fi, and understand basic operations.</p>
                <Link href="/resources/downloads" className="text-oriana-blue font-medium hover:underline">View Guides &rarr;</Link>
              </div>
              <div className="p-8 border border-gray-100 rounded-2xl bg-oriana-surface hover:shadow-md transition">
                <h3 className="text-xl font-display font-medium text-oriana-navy mb-4">App Setup</h3>
                <p className="text-oriana-muted mb-6">Step-by-step instructions for downloading and configuring the iSolarCloud app on your phone.</p>
                <Link href="/resources/downloads" className="text-oriana-blue font-medium hover:underline">Get the App &rarr;</Link>
              </div>
              <div className="p-8 border border-gray-100 rounded-2xl bg-oriana-surface hover:shadow-md transition">
                <h3 className="text-xl font-display font-medium text-oriana-navy mb-4">Find an Installer</h3>
                <p className="text-oriana-muted mb-6">Need an upgrade or physical maintenance? Locate a certified Oriana professional near you.</p>
                <Link href="/where-to-buy" className="text-oriana-blue font-medium hover:underline">Find Local Pros &rarr;</Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 bg-oriana-silver">
        <div className="container max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-display font-semibold text-oriana-navy mb-10 text-center">Popular FAQs for Homeowners</h2>
            <div className="space-y-4">
              {['How to set inverter parameters with iSolarCloud App?', 'How to log in Logger1000 Web interface?', 'What do the LED indicators on my residential inverter mean?'].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-medium text-oriana-navy">{faq}</h4>
                  <p className="text-sm text-oriana-muted mt-2">Check the user manual provided with your system, or follow the step-by-step guide in our download center.</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
               <Link href="/resources/faqs" className="inline-flex items-center justify-center rounded-full border border-oriana-blue px-6 py-2 text-sm font-semibold text-oriana-blue transition hover:bg-oriana-blue hover:text-white">View All FAQs</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
