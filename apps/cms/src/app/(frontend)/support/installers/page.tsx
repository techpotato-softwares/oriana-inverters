import { Metadata } from 'next'
import { PageHero } from '@/components/oriana/PageHero'
import { FadeIn } from '@/components/oriana/FadeIn'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Installers Support | Oriana Inverters',
  description: 'Dedicated support, tools, and resources for our certified installer partners.',
}

export default function InstallersSupportPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <PageHero
        eyebrow="Support For You"
        title="Installers Support"
        description="Access technical documentation, remote diagnostic tools, and priority support channels designed specifically for solar professionals."
        variant="light"
      />
      
      <section className="py-24 bg-white">
        <div className="container">
          <FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 border border-gray-100 rounded-2xl bg-oriana-surface hover:shadow-md transition">
                <h3 className="text-xl font-display font-medium text-oriana-navy mb-4">Technical Documents</h3>
                <p className="text-oriana-muted mb-6">Download manuals, quick installation guides, and compliance certificates.</p>
                <Link href="/resources/downloads" className="text-oriana-blue font-medium hover:underline">Browse Library &rarr;</Link>
              </div>
              <div className="p-8 border border-gray-100 rounded-2xl bg-oriana-surface hover:shadow-md transition">
                <h3 className="text-xl font-display font-medium text-oriana-navy mb-4">Smart O&M Tools</h3>
                <p className="text-oriana-muted mb-6">Manage all your renewable plants in one place with the iSolarCloud platform.</p>
                <Link href="/support" className="text-oriana-blue font-medium hover:underline">Learn More &rarr;</Link>
              </div>
              <div className="p-8 border border-gray-100 rounded-2xl bg-oriana-surface hover:shadow-md transition">
                <h3 className="text-xl font-display font-medium text-oriana-navy mb-4">Warranty Claims</h3>
                <p className="text-oriana-muted mb-6">Quickly file and track warranty claims for customer installations.</p>
                <Link href="/support/warranty" className="text-oriana-blue font-medium hover:underline">File a Claim &rarr;</Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 bg-oriana-silver">
        <div className="container max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl font-display font-semibold text-oriana-navy mb-10 text-center">Popular FAQs for Installers</h2>
            <div className="space-y-4">
              {['What to do when the inverter reports PV string abnormal alarm or fault?', 'How to solve the inverter overtemperature derating?', 'SHRS/SHRT models report EC51 back-up overload fault shutdown, what is the cause?'].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="font-medium text-oriana-navy">{faq}</h4>
                  <p className="text-sm text-oriana-muted mt-2">Please refer to the technical manual or contact our priority support line for advanced troubleshooting steps.</p>
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
