'use client'

import { useState } from 'react'
import { Breadcrumbs } from '@/components/oriana/Breadcrumbs'
import { PageHero } from '@/components/oriana/PageHero'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sent')
  }

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Let's Build Together"
        description="Tell us about your project. Our engineering and sales teams respond within one business day."
      />
      <Breadcrumbs items={[{ label: 'Contact' }]} />

      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-oriana-navy">Get in Touch</h2>
              <div className="mt-8 space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'info@orianainverters.com' },
                  { icon: Phone, label: 'Phone', value: '+1 (800) ORIANA-1' },
                  { icon: MapPin, label: 'Headquarters', value: 'United States' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-oriana-silver text-oriana-blue">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-oriana-muted">
                        {item.label}
                      </p>
                      <p className="mt-1 font-medium text-oriana-navy">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              {status === 'sent' ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                  <p className="font-display text-xl font-bold text-green-800">Message Received</p>
                  <p className="mt-2 text-green-700">
                    Thank you for reaching out. Our team will contact you within one business day.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-oriana-navy/8 bg-white p-8 shadow-sm lg:p-10"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="name">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-xl border border-oriana-navy/12 bg-oriana-surface px-4 py-3 text-sm focus:border-oriana-blue focus:outline-none focus:ring-2 focus:ring-oriana-blue/15"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="email">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-xl border border-oriana-navy/12 bg-oriana-surface px-4 py-3 text-sm focus:border-oriana-blue focus:outline-none focus:ring-2 focus:ring-oriana-blue/15"
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="company">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      className="w-full rounded-xl border border-oriana-navy/12 bg-oriana-surface px-4 py-3 text-sm focus:border-oriana-blue focus:outline-none focus:ring-2 focus:ring-oriana-blue/15"
                    />
                  </div>
                  <div className="mt-5">
                    <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="message">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell us about your project size, location, and timeline..."
                      className="w-full rounded-xl border border-oriana-navy/12 bg-oriana-surface px-4 py-3 text-sm focus:border-oriana-blue focus:outline-none focus:ring-2 focus:ring-oriana-blue/15"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-8 w-full rounded-full bg-oriana-blue py-4 text-sm font-bold text-white transition hover:bg-oriana-navy sm:w-auto sm:px-12"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
