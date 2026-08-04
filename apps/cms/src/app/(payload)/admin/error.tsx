'use client'

import { useEffect } from 'react'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[admin]', error)
  }, [error])

  return (
    <div
      style={{
        margin: 0,
        minHeight: '60vh',
        display: 'grid',
        placeItems: 'center',
        fontFamily: 'system-ui, sans-serif',
        color: '#0b1f33',
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 420, textAlign: 'center' }}>
        <h1 style={{ fontSize: 20, marginBottom: 8 }}>Admin failed to load</h1>
        <p style={{ fontSize: 14, lineHeight: 1.5, color: '#5b6b7c' }}>
          Often an expired login session or a temporary database blip. Sign in again, or retry.
        </p>
        {error.digest ? (
          <p style={{ fontSize: 12, color: '#8a97a5', wordBreak: 'break-all' }}>
            Digest: {error.digest}
          </p>
        ) : null}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20 }}>
          <button
            type="button"
            onClick={reset}
            style={{
              border: 0,
              borderRadius: 8,
              padding: '10px 16px',
              background: '#1d6fd8',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
          <a
            href="/admin/login"
            style={{
              borderRadius: 8,
              padding: '10px 16px',
              background: '#fff',
              border: '1px solid #d5dee8',
              color: '#0b1f33',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Go to login
          </a>
        </div>
      </div>
    </div>
  )
}
