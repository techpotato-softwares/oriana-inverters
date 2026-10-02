import Link from 'next/link'

import type { CtaBandContent } from './types'

export function CtaBand({ title, body, primary, secondary }: CtaBandContent) {
  return (
    <div className="mt-16 rounded border border-oriana-blue/20 bg-oriana-deep p-8 text-white lg:p-12">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      {body ? <p className="mt-3 max-w-xl text-white/70">{body}</p> : null}
      {primary || secondary ? (
        <div className="mt-6 flex flex-wrap gap-4">
          {primary ? (
            <Link
              href={primary.href}
              className="rounded bg-white px-6 py-3 text-sm font-bold text-oriana-navy hover:bg-oriana-silver"
            >
              {primary.label}
            </Link>
          ) : null}
          {secondary ? (
            <Link
              href={secondary.href}
              className="rounded border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
