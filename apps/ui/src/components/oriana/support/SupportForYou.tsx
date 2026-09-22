'use client'

import { Stagger, StaggerItem } from '../FadeIn'
import { cn } from '@/utilities/ui'

const audiences = [
  {
    title: 'Installers Support',
    description: 'Technical manuals, training videos, and priority hotline for professional installers.',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Home Owners Support',
    description: 'Easy-to-understand guides, monitoring app assistance, and warranty registration.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Business Owners Support',
    description: 'Dedicated account management, fleet monitoring, and priority SLA responses.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800',
  },
]

export function SupportForYou() {
  return (
    <section className="py-24 bg-oriana-surface">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-semibold text-oriana-navy md:text-4xl">
            Support For You
          </h2>
          <p className="mt-4 text-oriana-muted max-w-2xl mx-auto">
            Tailored resources designed for your specific role and needs.
          </p>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((item, i) => (
            <StaggerItem key={i}>
              <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 h-full">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-oriana-navy mb-3">
                    {item.title}
                  </h3>
                  <p className="text-oriana-muted mb-6 flex-grow">
                    {item.description}
                  </p>
                  <a href="#" className="text-oriana-blue font-medium hover:text-oriana-sky transition-colors inline-flex items-center">
                    Learn More 
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
