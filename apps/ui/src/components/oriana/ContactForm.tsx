'use client'

import { useState } from 'react'
import { staticContact } from '@/data/siteContent'

type ContactFormProps = {
  form?: typeof staticContact.form
}

export function ContactForm({ form = staticContact.form }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="font-display text-xl font-bold text-green-800">{form.successTitle}</p>
        <p className="mt-2 text-green-700">{form.successMessage}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-oriana-navy/8 bg-white p-8 shadow-sm lg:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="name">
            {form.nameLabel}
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
            {form.emailLabel}
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
          {form.companyLabel}
        </label>
        <input
          id="company"
          name="company"
          className="w-full rounded-xl border border-oriana-navy/12 bg-oriana-surface px-4 py-3 text-sm focus:border-oriana-blue focus:outline-none focus:ring-2 focus:ring-oriana-blue/15"
        />
      </div>
      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="message">
          {form.messageLabel}
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
        {form.submitLabel}
      </button>
    </form>
  )
}
