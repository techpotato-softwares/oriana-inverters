import { Metadata } from 'next'
import { PageHero } from '@/components/oriana/PageHero'
import { FadeIn } from '@/components/oriana/FadeIn'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Business Owners Support | Oriana Inverters',
  description: 'Enterprise-grade support and tools for Commercial and Industrial solar installations.',
}

export default function BusinessSupportPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <PageHero
        eyebrow="Support For You"
        title="Business Owners Support"
        description="Maximize the ROI of your commercial solar investment with priority service, comprehensive O&M resources, and advanced fleet management tools."
        variant="light"
      />
      
      <section className="py-24 bg-white">
        <div className="container">
          <FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 border border-gray-100 rounded-2xl bg-oriana-surface hover:shadow-md transition">
                <h3 className="text-xl font-display font-medium text-oriana-navy mb-4">O&M Services</h3>
                <p className="text-oriana-muted mb-6">Learn about our preventative maintenance, field services, and SLA-backed support contracts.</p>
                <Link href="/support" className="text-oriana-blue font-medium hover:underline">View Service Plans &rarr;</Link>
              </div>
              <div className="p-8 border border-gray-100 rounded-2xl bg-oriana-surface hover:shadow-md transition">
                <h3 className="text-xl font-display font-medium text-oriana-navy mb-4">Fleet Management</h3>
                <p className="text-oriana-muted mb-6">Utilize our enterprise cloud platform for multi-site monitoring and yield analysis.</p>
                <Link href="/support" className="text-oriana-blue font-medium hover:underline">Explore Platform &rarr;</Link>
              </div>
              <div className="p-8 border border-gray-100 rounded-2xl bg-oriana-surface hover:shadow-md transition">
                <h3 className="text-xl font-display font-medium text-oriana-navy mb-4">Commercial Warranty</h3>
                <p className="text-oriana-muted mb-6">Review terms for C&I installations and access expedited replacement processes.</p>
                <Link href="/support/warranty" className="text-oriana-blue font-medium hover:underline">Warranty Details &rarr;</Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 bg-oriana-silver">
        <div className="container max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-display font-semibold text-oriana-navy mb-10 text-center">Popular FAQs for Businesses</h2>
            <div className="space-y-4">
              {['How does the accident ventilation system start up and work?', 'How should battery containers be handled after their first operation or long-term storage?', 'How to identify and set the switch codes for the master and slave units of the UD series?'].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-medium text-oriana-navy">{faq}</h4>
                  <p className="text-sm text-oriana-muted mt-2">Refer to the C&I technical guidelines or contact your dedicated account manager for specialized assistance.</p>
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
