export type PhoneCountry = {
  iso: string
  name: string
  dial: string
  /** National significant number length (digits only, no country code). */
  minLength: number
  maxLength: number
}

/** India first — default selection on every phone field. */
export const PHONE_COUNTRIES: PhoneCountry[] = [
  { iso: 'IN', name: 'India', dial: '91', minLength: 10, maxLength: 10 },
  { iso: 'AE', name: 'United Arab Emirates', dial: '971', minLength: 9, maxLength: 9 },
  { iso: 'AU', name: 'Australia', dial: '61', minLength: 9, maxLength: 9 },
  { iso: 'BD', name: 'Bangladesh', dial: '880', minLength: 10, maxLength: 10 },
  { iso: 'BH', name: 'Bahrain', dial: '973', minLength: 8, maxLength: 8 },
  { iso: 'BR', name: 'Brazil', dial: '55', minLength: 10, maxLength: 11 },
  { iso: 'CA', name: 'Canada', dial: '1', minLength: 10, maxLength: 10 },
  { iso: 'CN', name: 'China', dial: '86', minLength: 11, maxLength: 11 },
  { iso: 'DE', name: 'Germany', dial: '49', minLength: 10, maxLength: 11 },
  { iso: 'FR', name: 'France', dial: '33', minLength: 9, maxLength: 9 },
  { iso: 'GB', name: 'United Kingdom', dial: '44', minLength: 10, maxLength: 10 },
  { iso: 'ID', name: 'Indonesia', dial: '62', minLength: 9, maxLength: 12 },
  { iso: 'JP', name: 'Japan', dial: '81', minLength: 10, maxLength: 10 },
  { iso: 'KW', name: 'Kuwait', dial: '965', minLength: 8, maxLength: 8 },
  { iso: 'LK', name: 'Sri Lanka', dial: '94', minLength: 9, maxLength: 9 },
  { iso: 'MY', name: 'Malaysia', dial: '60', minLength: 9, maxLength: 10 },
  { iso: 'NP', name: 'Nepal', dial: '977', minLength: 10, maxLength: 10 },
  { iso: 'OM', name: 'Oman', dial: '968', minLength: 8, maxLength: 8 },
  { iso: 'PH', name: 'Philippines', dial: '63', minLength: 10, maxLength: 10 },
  { iso: 'PK', name: 'Pakistan', dial: '92', minLength: 10, maxLength: 10 },
  { iso: 'QA', name: 'Qatar', dial: '974', minLength: 8, maxLength: 8 },
  { iso: 'SA', name: 'Saudi Arabia', dial: '966', minLength: 9, maxLength: 9 },
  { iso: 'SG', name: 'Singapore', dial: '65', minLength: 8, maxLength: 8 },
  { iso: 'TH', name: 'Thailand', dial: '66', minLength: 9, maxLength: 9 },
  { iso: 'US', name: 'United States', dial: '1', minLength: 10, maxLength: 10 },
  { iso: 'ZA', name: 'South Africa', dial: '27', minLength: 9, maxLength: 9 },
]

export const DEFAULT_PHONE_COUNTRY = PHONE_COUNTRIES[0]

export function phoneCountryByIso(iso: string): PhoneCountry {
  return PHONE_COUNTRIES.find((country) => country.iso === iso) ?? DEFAULT_PHONE_COUNTRY
}

/** Digits only for the national part (strips leading 0 often typed for local numbers). */
export function nationalDigits(value: string, stripLeadingZero = true): string {
  const digits = value.replace(/\D/g, '')
  if (stripLeadingZero && digits.length > 1 && digits.startsWith('0')) {
    return digits.slice(1)
  }
  return digits
}

export function formatInternationalPhone(dial: string, national: string): string {
  const digits = nationalDigits(national)
  if (!digits) return ''
  return `+${dial} ${digits}`
}

export function isValidNationalNumber(country: PhoneCountry, national: string): boolean {
  const digits = nationalDigits(national)
  return digits.length >= country.minLength && digits.length <= country.maxLength
}
