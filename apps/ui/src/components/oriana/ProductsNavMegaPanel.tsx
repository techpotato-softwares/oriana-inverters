'use client'

import type { NavMegaCategory } from '@/config/navigation'
import { NavMegaPanel } from '@/components/oriana/NavMegaPanel'

type ProductsNavMegaPanelProps = {
  label?: string
  categories: NavMegaCategory[]
}

/** @deprecated Use NavMegaPanel — kept for existing imports */
export function ProductsNavMegaPanel({ label, categories }: ProductsNavMegaPanelProps) {
  return <NavMegaPanel label={label} categories={categories} ariaLabel="Products menu" />
}
