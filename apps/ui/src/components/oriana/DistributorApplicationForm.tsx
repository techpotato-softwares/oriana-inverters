'use client'

import { useState } from 'react'

const fieldClass =
  'w-full rounded-xl border border-oriana-navy/12 bg-oriana-surface px-4 py-3 text-sm text-oriana-navy focus:border-oriana-blue focus:outline-none focus:ring-2 focus:ring-oriana-blue/15'

export function DistributorApplicationForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const fd = new FormData(form)

    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch('/api/distributor-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(fd.get('name') ?? ''),
          company: String(fd.get('company') ?? ''),
          email: String(fd.get('email') ?? ''),
          phone: String(fd.get('phone') ?? ''),
          cityState: String(fd.get('cityState') ?? ''),
          message: String(fd.get('message') ?? ''),
        }),
      })

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          errors?: { message?: string }[]
          message?: string
        } | null
        throw new Error(body?.errors?.[0]?.message || body?.message || 'Unable to submit. Please try again.')
      }

      setStatus('sent')
      form.reset()
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unable to submit. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center" role="status">
        <p className="font-display text-xl font-bold text-green-800">Application received</p>
        <p className="mt-2 text-green-700">
          Thank you. Our channel team will review your details and reply within two business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-oriana-navy/8 bg-white p-8 shadow-sm lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="distributor-name">
            Full name
          </label>
          <input id="distributor-name" name="name" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="distributor-company">
            Company
          </label>
          <input
            id="distributor-company"
            name="company"
            required
            autoComplete="organization"
            className={fieldClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="distributor-email">
            Email
          </label>
          <input
            id="distributor-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="distributor-phone">
            Phone
          </label>
          <input id="distributor-phone" name="phone" type="tel" required autoComplete="tel" className={fieldClass} />
        </div>
      </div>
      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="distributor-city">
          City / State
        </label>
        <input
          id="distributor-city"
          name="cityState"
          required
          autoComplete="address-level2"
          className={fieldClass}
        />
      </div>
      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="distributor-message">
          Tell us about your business
        </label>
        <textarea
          id="distributor-message"
          name="message"
          rows={5}
          required
          placeholder="Territory, current brands, and the segments you serve."
          className={fieldClass}
        />
      </div>
      {status === 'error' && errorMessage ? (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-8 w-full rounded-full bg-oriana-blue py-4 text-sm font-bold text-white transition hover:bg-oriana-deep disabled:opacity-60 sm:w-auto sm:px-12"
      >
        {status === 'sending' ? 'Submitting…' : 'Submit application'}
      </button>
    </form>
  )
}
