import { Banner } from '@payloadcms/ui/elements/Banner'
import Link from 'next/link'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

type QuickLink = {
  slug: string
  title: string
  description: string
  accent: 'navy' | 'blue' | 'sky' | 'sun'
  icon: React.ReactNode
}

const IconBox = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden>
    {children}
  </svg>
)

const quickLinks: QuickLink[] = [
  {
    slug: 'categories',
    title: 'Categories',
    description: 'Product families for the catalogue menu',
    accent: 'navy',
    icon: (
      <IconBox>
        <path
          d="M4 6h16M4 12h10M4 18h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </IconBox>
    ),
  },
  {
    slug: 'products',
    title: 'Products',
    description: 'Inverter models, specs, and assets',
    accent: 'blue',
    icon: (
      <IconBox>
        <path
          d="M12 3v18M7 8l5-5 5 5M7 16l5 5 5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </IconBox>
    ),
  },
  {
    slug: 'downloads',
    title: 'Downloads',
    description: 'Datasheets, manuals, certificates',
    accent: 'sky',
    icon: (
      <IconBox>
        <path
          d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </IconBox>
    ),
  },
  {
    slug: 'media',
    title: 'Media',
    description: 'Images, video, and documents',
    accent: 'sun',
    icon: (
      <IconBox>
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="9" cy="10" r="1.5" fill="currentColor" />
        <path d="M3 16l5-4 4 3 3-2 6 3" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </IconBox>
    ),
  },
  {
    slug: 'pages',
    title: 'Pages',
    description: 'Marketing and content pages',
    accent: 'blue',
    icon: (
      <IconBox>
        <path
          d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M14 3v5h5M9 13h6M9 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </IconBox>
    ),
  },
  {
    slug: 'posts',
    title: 'Posts',
    description: 'News and blog articles',
    accent: 'sky',
    icon: (
      <IconBox>
        <path
          d="M5 5h14v14H5z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </IconBox>
    ),
  },
]

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Oriana CMS — manage your catalogue here</h4>
      </Banner>

      <p className={`${baseClass}__intro`}>
        Jump into a collection to edit content. Published catalogue items appear on the public site
        automatically.
      </p>

      <div className={`${baseClass}__grid`}>
        {quickLinks.map((link) => (
          <Link
            key={link.slug}
            className={`${baseClass}__card ${baseClass}__card--${link.accent}`}
            href={`/admin/collections/${link.slug}`}
            prefetch={false}
          >
            <span className={`${baseClass}__card-icon`} aria-hidden>
              {link.icon}
            </span>
            <span className={`${baseClass}__card-body`}>
              <span className={`${baseClass}__card-title`}>{link.title}</span>
              <span className={`${baseClass}__card-desc`}>{link.description}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className={`${baseClass}__footer`}>
        <p>
          Optional bootstrap: <SeedButton /> or run <code>npm run seed:catalogue</code> to import
          products. Preview the{' '}
          <a href="/" target="_blank" rel="noreferrer">
            live website
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default BeforeDashboard
