'use client'

import { FadeIn, Stagger, StaggerItem } from '../FadeIn'

const resources = [
  {
    title: 'Product Documentation',
    description: 'Download datasheets, user manuals, and quick installation guides for all our inverter series.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'FAQs',
    description: 'Find answers to common questions about installation, monitoring setup, and troubleshooting.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Warranty',
    description: 'Review our comprehensive warranty policies, register your products, and initiate claims.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
]

export function SupportResources() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-oriana-deep -skew-y-2 transform origin-top-left -z-10" />
      
      <div className="container max-w-6xl">
        <FadeIn className="text-center mb-16 text-white pt-8">
          <h2 className="text-3xl font-display font-semibold md:text-4xl">
            Resources
          </h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Everything you need to install, operate, and maintain your Oriana inverters.
          </p>
        </FadeIn>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((res, i) => (
            <StaggerItem key={i}>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-oriana-silver text-oriana-blue rounded-xl flex items-center justify-center mb-6">
                  {res.icon}
                </div>
                <h3 className="text-xl font-semibold text-oriana-navy mb-3">
                  {res.title}
                </h3>
                <p className="text-oriana-muted mb-6">
                  {res.description}
                </p>
                <a href="#" className="text-oriana-blue font-medium hover:text-oriana-sky transition-colors inline-flex items-center">
                  Access Now 
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
