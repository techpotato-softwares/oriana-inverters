'use client'

import { useEffect, useId, useRef, useState } from 'react'

import {
  DEFAULT_PHONE_COUNTRY,
  formatInternationalPhone,
  isValidNationalNumber,
  nationalDigits,
  phoneCountryByIso,
  PHONE_COUNTRIES,
} from '@/components/oriana/phoneCountries'

type PhoneFieldProps = {
  id?: string
  name?: string
  label?: string
  required?: boolean
  className?: string
  /** Extra class on the outer wrapper (e.g. grid column span). */
  wrapperClassName?: string
}

/**
 * Country code + national number in one labeled field.
 * Submits a single value (`+91 9876543210`) via a hidden input named `name`.
 */
export function PhoneField({
  id: idProp,
  name = 'phone',
  label = 'Phone',
  required = false,
  className = '',
  wrapperClassName = '',
}: PhoneFieldProps) {
  const autoId = useId()
  const id = idProp || autoId
  const countryId = `${id}-country`
  const numberId = `${id}-number`
  const numberRef = useRef<HTMLInputElement>(null)

  const [iso, setIso] = useState(DEFAULT_PHONE_COUNTRY.iso)
  const [national, setNational] = useState('')
  const country = phoneCountryByIso(iso)
  const combined = formatInternationalPhone(country.dial, national)

  useEffect(() => {
    const input = numberRef.current
    if (!input) return
    if (!national) {
      input.setCustomValidity(required ? 'Enter your phone number.' : '')
      return
    }
    if (!isValidNationalNumber(country, national)) {
      const range =
        country.minLength === country.maxLength
          ? `${country.minLength}`
          : `${country.minLength}–${country.maxLength}`
      input.setCustomValidity(`Enter a ${range}-digit number for ${country.name}.`)
      return
    }
    input.setCustomValidity('')
  }, [national, country, required])

  return (
    <div className={wrapperClassName}>
      <label className="mb-2 block text-sm font-medium text-oriana-navy" htmlFor={numberId}>
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      <div className="flex gap-2">
        <label className="sr-only" htmlFor={countryId}>
          Country code
        </label>
        <select
          id={countryId}
          value={iso}
          onChange={(event) => {
            const nextCountry = phoneCountryByIso(event.target.value)
            setIso(event.target.value)
            setNational((prev) => nationalDigits(prev).slice(0, nextCountry.maxLength))
          }}
          className={`${className} w-[7.5rem] shrink-0 sm:w-36`}
          aria-label="Country code"
        >
          {PHONE_COUNTRIES.map((item) => (
            <option key={item.iso} value={item.iso}>
              {item.iso} +{item.dial}
            </option>
          ))}
        </select>
        <input
          ref={numberRef}
          id={numberId}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          required={required}
          value={national}
          maxLength={country.maxLength}
          placeholder={'0'.repeat(Math.min(country.maxLength, 10))}
          onChange={(event) => {
            setNational(nationalDigits(event.target.value, false).slice(0, country.maxLength))
          }}
          onBlur={() => setNational((prev) => nationalDigits(prev))}
          className={`${className} min-w-0 flex-1 tabular-nums`}
          aria-describedby={`${id}-hint`}
        />
      </div>
      <p id={`${id}-hint`} className="mt-1.5 text-xs text-oriana-muted">
        {country.name} (+{country.dial}): enter {country.minLength}
        {country.minLength === country.maxLength ? '' : `–${country.maxLength}`} digits
      </p>
      <input type="hidden" name={name} value={combined} />
    </div>
  )
}
