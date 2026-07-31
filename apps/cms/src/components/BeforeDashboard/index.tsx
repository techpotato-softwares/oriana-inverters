import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Oriana CMS — manage your catalogue here</h4>
      </Banner>
      <p className={`${baseClass}__intro`}>
        Content editors add products, categories, and documents in Admin. Published items appear on
        the public website automatically.
      </p>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>1. Categories</strong> — create product families under{' '}
          <strong>Catalogue → Categories</strong> (e.g. Residential Grid-Tied, C&amp;I Hybrid). Set
          Sort Order so they appear in the right sequence in the Products menu.
        </li>
        <li>
          <strong>2. Products</strong> — under <strong>Catalogue → Products</strong>, add each
          inverter model. Assign a category, fill specs, upload images/PDFs, then{' '}
          <strong>Publish</strong>.
        </li>
        <li>
          <strong>3. Downloads</strong> — upload datasheets, manuals, and certificates under{' '}
          <strong>Catalogue → Downloads</strong> and link them to a product when relevant.
        </li>
        <li>
          <strong>4. Media</strong> — upload images and PDFs under <strong>Media</strong>, then
          attach them on product records.
        </li>
        <li>
          Optional bootstrap:{' '}
          <SeedButton /> to load demo pages/posts, or run{' '}
          <code>npm run seed:catalogue</code> in the terminal to import the Excel product list into
          CMS.
        </li>
        <li>
          Preview the live site:{' '}
          <a href="/" target="_blank" rel="noreferrer">
            open website
          </a>
          .
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
