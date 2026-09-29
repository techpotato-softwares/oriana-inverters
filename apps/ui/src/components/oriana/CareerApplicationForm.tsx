'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const fieldClass =
  'w-full rounded-xl border border-oriana-navy/12 bg-oriana-surface px-4 py-3 text-sm text-oriana-navy focus:border-oriana-blue focus:outline-none focus:ring-2 focus:ring-oriana-blue/15'

const MAX_RESUME_BYTES = 4 * 1024 * 1024

function CareerApplicationFormInner() {
  const params = useSearchParams()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [role, setRole] = useState(params.get('role') || '')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const fd = new FormData(form)
    const resume = fd.get('resume')

    if (!(resume instanceof File) || resume.size === 0) {
      setStatus('error')
      setErrorMessage('Upload a resume (PDF, DOC, or DOCX).')
      return
    }
    if (resume.size > MAX_RESUME_BYTES) {
      setStatus('error')
      setErrorMessage('Resume must be 4 MB or smaller.')
      return
    }

    const payload = new FormData()
    payload.append('file', resume)
    payload.append(
      '_payload',
      JSON.stringify({
        name: String(fd.get('name') ?? ''),
        email: String(fd.get('email') ?? ''),
        phone: String(fd.get('phone') ?? ''),
        location: String(fd.get('location') ?? ''),
        role,
        message: String(fd.get('message') ?? ''),
      }),
    )

    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch('/api/career-applications', {
        method: 'POST',
        body: payload,
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
      setRole('')
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
          Thank you. Our HR team will review your resume and reply if there is a match.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-oriana-navy/8 bg-white p-8 shadow-sm lg:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="career-name">
            Full name
          </label>
          <input id="career-name" name="name" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="career-email">
            Email
          </label>
          <input id="career-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="career-phone">
            Phone
          </label>
          <input id="career-phone" name="phone" type="tel" required autoComplete="tel" className={fieldClass} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="career-location">
            City
          </label>
          <input id="career-location" name="location" autoComplete="address-level2" className={fieldClass} />
        </div>
      </div>
      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="career-role">
          Role of interest
        </label>
        <input
          id="career-role"
          name="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          placeholder="Role title, or leave blank for a general application"
          className={fieldClass}
        />
      </div>
      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="career-message">
          Cover note
        </label>
        <textarea
          id="career-message"
          name="message"
          rows={5}
          placeholder="A short note on your experience and what you want to work on."
          className={fieldClass}
        />
      </div>
      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor="career-resume">
          Resume
        </label>
        <input
          id="career-resume"
          name="resume"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="block w-full text-sm text-oriana-navy file:mr-4 file:rounded-full file:border-0 file:bg-oriana-blue file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-oriana-deep"
        />
        <p className="mt-2 text-xs text-oriana-muted">PDF, DOC, or DOCX. Maximum 4 MB.</p>
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

export function CareerApplicationForm() {
  return (
    <Suspense fallback={null}>
      <CareerApplicationFormInner />
    </Suspense>
  )
}
