import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Find a Distributor',
    description: 'Find authorized Oriana inverter distributors and installers in your region.',
  }
}

export default function FindADistributorPage() {
  redirect('/where-to-buy')
}
