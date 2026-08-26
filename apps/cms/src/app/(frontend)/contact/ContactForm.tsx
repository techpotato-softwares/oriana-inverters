'use client'

import { useState } from 'react'
import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'

export type ContactCard = {
  iconKey?: string | null
  title: string
  detail: string
}

type ContactFormProps = {
  cards: ContactCard[]
  formId: number | null
  successMessage: string
}

const iconByKey: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
}

export function ContactForm({ cards, formId, successMessage }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const fields = ['name', 'email', 'company', 'message'] as const
    const submissionData = fields
      .map((field) => ({
        field,
        value: String(fd.get(field) ?? ''),
      }))
      .filter((row) => row.field === 'company' || row.value)

    if (!formId) {
      setStatus('sent')
      return
    }

    setStatus('sending')
    setErrorMessage('')
    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: formId,
          submissionData,
        }),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { errors?: { message?: string }[] } | null
        throw new Error(body?.errors?.[0]?.message || 'Unable to submit. Please try again.')
      }
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Unable to submit. Please try again.')
    }
  }

  return (
    <div className="grid gap-16 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <h2 className="font-display text-2xl font-bold text-oriana-navy">Get in Touch</h2>
        <div className="mt-8 space-y-6">
          {cards.map((item) => {
            const Icon = iconByKey[item.iconKey || ''] || Mail
            return (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-oriana-silver text-oriana-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-oriana-muted">
                    {item.title}
                  </p>
                  <p className="mt-1 font-medium text-oriana-navy">{item.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="lg:col-span-3">
        {status === 'sent' ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
            <p className="font-display text-xl font-bold text-green-800">Message Received</p>
            <p className="mt-2 text-green-700">{successMessage}</p>
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
            {status === 'error' && errorMessage ? (
              <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
            ) : null}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-8 w-full rounded-full bg-oriana-blue py-4 text-sm font-bold text-white transition hover:bg-oriana-navy disabled:opacity-60 sm:w-auto sm:px-12"
            >
              {status === 'sending' ? 'Submitting…' : 'Submit Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
