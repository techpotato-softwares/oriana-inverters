import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Crumb = { label: string; href?: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-oriana-navy/8 bg-oriana-silver/40">
      <div className="container flex items-center gap-1.5 py-3 text-sm">
        <Link href="/" className="text-oriana-muted hover:text-oriana-blue">
          Home
        </Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-oriana-muted/50" />
            {item.href ? (
              <Link href={item.href} className="text-oriana-muted hover:text-oriana-blue">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-oriana-navy">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  )
}
