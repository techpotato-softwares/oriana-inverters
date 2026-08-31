import React from 'react'

/** Payload admin login / header logo (plain img — admin chrome is not Next/Image). */
const AdminLogo: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="Oriana Inverters"
      src="/assets/logo.svg"
      style={{ height: '3.25rem', width: 'auto', display: 'block' }}
    />
  )
}

export default AdminLogo
