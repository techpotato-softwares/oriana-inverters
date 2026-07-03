'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { MapPin, Search } from 'lucide-react'
import type { Distributor } from '@/data/distributors'

type DistributorLocatorProps = {
  distributors: Distributor[]
}

export function DistributorLocator({ distributors }: DistributorLocatorProps) {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return distributors.filter((d) => {
      const matchesType = typeFilter === 'all' || d.type === typeFilter
      if (!matchesType) return false
      if (!q) return true
      const haystack = [d.name, d.city, d.state, d.country, d.region, d.type]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [distributors, query, typeFilter])

  const types = ['all', 'Distributor', 'Certified Installer', 'Service Center'] as const

  return (
    <>
      <div className="mx-auto max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-oriana-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city, state, country, or partner name..."
            className="w-full rounded border border-oriana-navy/15 py-3.5 pl-12 pr-4 text-sm focus:border-oriana-blue focus:outline-none focus:ring-2 focus:ring-oriana-blue/20"
            aria-label="Search distributors"
          />
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(type)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                typeFilter === type
                  ? 'bg-oriana-blue text-white'
                  : 'border border-oriana-navy/10 bg-white text-oriana-muted hover:border-oriana-blue/30'
              }`}
            >
              {type === 'all' ? 'All partners' : type}
            </button>
          ))}
        </div>

        <p className="mt-3 text-center text-xs text-oriana-muted">
          {filtered.length} partner{filtered.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {filtered.length === 0 ? (
          <div className="col-span-full rounded border border-oriana-navy/8 bg-oriana-silver/40 p-10 text-center">
            <p className="text-sm text-oriana-muted">No partners match your search.</p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setTypeFilter('all')
              }}
              className="mt-4 text-sm font-semibold text-oriana-blue hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filtered.map((d) => (
            <div
              key={d.id}
              className="flex gap-4 rounded border border-oriana-navy/8 p-6 transition hover:border-oriana-blue/20 hover:shadow-md"
            >
              <MapPin className="h-6 w-6 shrink-0 text-oriana-blue" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-oriana-navy">{d.name}</h2>
                  <span className="rounded-full bg-oriana-silver px-2.5 py-0.5 text-xs font-medium text-oriana-navy/70">
                    {d.type}
                  </span>
                </div>
                <p className="mt-1 text-sm text-oriana-muted">
                  {[d.city, d.state].filter(Boolean).join(', ')}
                  {d.country ? ` · ${d.country}` : ''}
                </p>
                <p className="text-xs text-oriana-muted">{d.region}</p>
                {(d.email || d.phone) && (
                  <p className="mt-2 text-xs text-oriana-muted">
                    {d.phone}
                    {d.phone && d.email ? ' · ' : ''}
                    {d.email}
                  </p>
                )}
                <Link
                  href="/contact"
                  className="mt-3 inline-block text-sm font-semibold text-oriana-blue hover:underline"
                >
                  Contact →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
