import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to Oriana CMS</h4>
      </Banner>
      <p>Manage page copy, images, products, and partners from this admin.</p>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {' to load existing website content into Payload (idempotent — safe to re-run).'}
        </li>
        <li>
          Edit <strong>Pages</strong> globals (Home, About, Contact, …) and <strong>Content</strong>{' '}
          collections (Case Studies, FAQs, Distributors, …).
        </li>
        <li>
          Update <strong>Header</strong> / <strong>Footer</strong> under Site for nav and chrome.
        </li>
        <li>
          <a href="/" target="_blank" rel="noreferrer">
            Visit the website
          </a>{' '}
          to preview published changes.
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
