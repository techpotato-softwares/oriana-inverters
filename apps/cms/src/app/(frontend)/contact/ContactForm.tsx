'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import type { WebsiteForm, WebsiteFormField } from '@/utilities/getContactForm'

export type ContactCard = {
  iconKey?: string | null
  title: string
  detail: string
}

type ContactIntent = 'sales' | 'quote' | 'career'

type ContactFormProps = {
  cards: ContactCard[]
  form: WebsiteForm | null
  successMessage: string
  intent?: string | null
}

const intentCopy: Record<ContactIntent, { title: string; placeholder: string; prefix: string }> = {
  sales: {
    title: 'Sales enquiry',
    placeholder: 'Products, volume, and the market you sell into.',
    prefix: 'Sales enquiry',
  },
  quote: {
    title: 'Request a quote',
    placeholder: 'System size, location, and the timeline you are working toward.',
    prefix: 'Quote request',
  },
  career: {
    title: 'Career application',
    placeholder: 'The role you want, your location, and a short note on your experience.',
    prefix: 'Career application',
  },
}

/** Used only to draw the form when no Form Builder form exists; submitting then shows an error. */
const fallbackFields: WebsiteFormField[] = [
  { blockType: 'text', name: 'name', label: 'Full Name', required: true, width: 50 },
  { blockType: 'email', name: 'email', label: 'Email', required: true, width: 50 },
  { blockType: 'text', name: 'company', label: 'Company', width: 100 },
  { blockType: 'textarea', name: 'message', label: 'Project Details', required: true, width: 100 },
]

const autoComplete: Record<string, string> = {
  name: 'name',
  fullName: 'name',
  firstName: 'given-name',
  lastName: 'family-name',
  email: 'email',
  phone: 'tel',
  company: 'organization',
  city: 'address-level2',
}

const inputClass =
  'w-full rounded-xl border border-oriana-navy/12 bg-oriana-surface px-4 py-3 text-sm text-oriana-navy focus:border-oriana-blue focus:outline-none focus:ring-2 focus:ring-oriana-blue/15'

function asIntent(value: string | null | undefined): ContactIntent | null {
  if (value === 'sales' || value === 'quote' || value === 'career') return value
  return null
}

const iconByKey: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
}

type NamedField = Exclude<WebsiteFormField, { blockType: 'message' }>

function isNamed(field: WebsiteFormField): field is NamedField {
  return field.blockType !== 'message'
}

/** The field that receives the intent prefix and placeholder: `message`, else the first textarea. */
function messageFieldName(fields: WebsiteFormField[]): string | undefined {
  const named = fields.filter(isNamed)
  return (
    named.find((field) => field.name === 'message')?.name ??
    named.find((field) => field.blockType === 'textarea')?.name
  )
}

export function ContactForm({ cards, form, successMessage, intent }: ContactFormProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const topic = asIntent(intent)
  const copy = topic ? intentCopy[topic] : null
  const fields = form?.fields.length ? form.fields : fallbackFields
  const messageName = messageFieldName(fields)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!topic && window.location.hash !== '#contact-form') return
    const container = document.getElementById('contact-form')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    container?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    formRef.current?.querySelector<HTMLElement>('input, select, textarea')?.focus()
  }, [topic])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!form) {
      setStatus('error')
      setErrorMessage(
        'Our contact form is unavailable right now. Please email us using the details on this page.',
      )
      return
    }

    const fd = new FormData(e.currentTarget)
    const submissionData = form.fields.filter(isNamed).flatMap((field) => {
      if (field.blockType === 'checkbox') {
        return [{ field: field.name, value: fd.get(field.name) ? 'Yes' : 'No' }]
      }
      const raw = String(fd.get(field.name) ?? '').trim()
      if (!raw) return []
      const value = field.name === messageName && copy ? `[${copy.prefix}]\n${raw}` : raw
      return [{ field: field.name, value }]
    })

    setStatus('sending')
    setErrorMessage('')
    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: form.id, submissionData }),
      })
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { errors?: { message?: string }[] } | null
        throw new Error(body?.errors?.[0]?.message || 'Unable to submit. Please try again.')
      }
      if (form.redirectUrl) {
        router.push(form.redirectUrl)
        return
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
                  <Icon className="h-5 w-5" aria-hidden />
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

      <div id="contact-form" className="scroll-mt-32 lg:col-span-3">
        {status === 'sent' ? (
          <div
            role="status"
            className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
          >
            <p className="font-display text-xl font-bold text-green-800">Message Received</p>
            <p className="mt-2 text-green-700">{successMessage}</p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-oriana-navy/8 bg-white p-8 shadow-sm lg:p-10"
          >
            <h2 className="font-display text-2xl font-bold text-oriana-navy">
              {copy?.title || 'Send a message'}
            </h2>
            <p className="mt-2 mb-6 text-sm text-oriana-muted">
              {copy
                ? 'This form goes to the Oriana team. Include enough detail for a useful reply.'
                : 'Share your project and we will route it to the right team.'}
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((field, index) => (
                <FormFieldControl
                  key={field.id || `${field.blockType}-${index}`}
                  field={field}
                  placeholder={
                    isNamed(field) && field.name === messageName
                      ? copy?.placeholder || 'Tell us about your project size, location, and timeline...'
                      : undefined
                  }
                />
              ))}
            </div>
            {status === 'error' && errorMessage ? (
              <p role="alert" className="mt-4 text-sm text-red-600">
                {errorMessage}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-8 w-full rounded-full bg-oriana-blue py-4 text-sm font-bold text-white transition hover:bg-oriana-deep disabled:opacity-60 sm:w-auto sm:px-12"
            >
              {status === 'sending' ? 'Submitting…' : form?.submitButtonLabel || 'Submit Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function FormFieldControl({
  field,
  placeholder,
}: {
  field: WebsiteFormField
  placeholder?: string
}) {
  if (field.blockType === 'message') {
    return field.message ? (
      <div className="prose prose-sm max-w-none text-oriana-muted sm:col-span-2">
        <RichText data={field.message as SerializedEditorState} />
      </div>
    ) : null
  }

  const id = `contact-${field.name}`
  const span = field.width && field.width <= 50 ? '' : 'sm:col-span-2'
  const label = (
    <>
      {field.label || field.name}
      {field.required ? <span aria-hidden> *</span> : null}
    </>
  )

  if (field.blockType === 'checkbox') {
    return (
      <label className={`flex items-start gap-3 text-sm text-oriana-navy ${span}`}>
        <input
          id={id}
          name={field.name}
          type="checkbox"
          required={Boolean(field.required)}
          defaultChecked={Boolean(field.defaultValue)}
          className="mt-0.5 h-4 w-4 accent-oriana-blue"
        />
        <span>{label}</span>
      </label>
    )
  }

  return (
    <div className={span}>
      <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor={id}>
        {label}
      </label>
      {field.blockType === 'textarea' ? (
        <textarea
          id={id}
          name={field.name}
          rows={5}
          required={Boolean(field.required)}
          defaultValue={field.defaultValue || undefined}
          placeholder={placeholder}
          className={inputClass}
        />
      ) : field.blockType === 'select' ? (
        <select
          id={id}
          name={field.name}
          required={Boolean(field.required)}
          defaultValue={field.defaultValue || ''}
          className={inputClass}
        >
          <option value="" disabled={Boolean(field.required)}>
            {field.placeholder || 'Select an option'}
          </option>
          {field.options?.map((option) => (
            <option key={option.id || option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={field.name}
          type={
            field.blockType === 'email' ? 'email' : field.blockType === 'number' ? 'number' : 'text'
          }
          required={Boolean(field.required)}
          defaultValue={
            'defaultValue' in field && field.defaultValue != null
              ? String(field.defaultValue)
              : undefined
          }
          autoComplete={autoComplete[field.name]}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  )
}
