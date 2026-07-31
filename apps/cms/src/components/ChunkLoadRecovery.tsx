'use client'

import { useEffect } from 'react'

const RELOAD_KEY = 'oriana:chunk-reload'

function isChunkLoadError(error: unknown): boolean {
  if (!error) return false
  if (typeof error === 'string') {
    return /Loading chunk [\d]+ failed|ChunkLoadError|Failed to fetch dynamically imported module/i.test(
      error,
    )
  }
  if (error instanceof Error) {
    return (
      error.name === 'ChunkLoadError' ||
      /Loading chunk [\d]+ failed|Failed to fetch dynamically imported module/i.test(error.message)
    )
  }
  return false
}

function reloadOnce() {
  try {
    if (sessionStorage.getItem(RELOAD_KEY) === '1') return
    sessionStorage.setItem(RELOAD_KEY, '1')
  } catch {
    // sessionStorage unavailable — still attempt a single reload
  }
  window.location.reload()
}

/**
 * After a CloudFront/S3 static deploy, old HTML can reference missing Next.js chunks.
 * Reload once so the browser picks up the new build. Avoids infinite reload loops.
 */
export function ChunkLoadRecovery() {
  useEffect(() => {
    // If this load stayed healthy, clear the flag so a future deploy can recover again.
    const clearTimer = window.setTimeout(() => {
      try {
        sessionStorage.removeItem(RELOAD_KEY)
      } catch {
        // ignore
      }
    }, 5000)

    const onError = (event: ErrorEvent) => {
      if (isChunkLoadError(event.error) || isChunkLoadError(event.message)) {
        reloadOnce()
      }
    }

    const onRejection = (event: PromiseRejectionEvent) => {
      if (isChunkLoadError(event.reason)) {
        reloadOnce()
      }
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onRejection)
    return () => {
      window.clearTimeout(clearTimer)
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onRejection)
    }
  }, [])

  return null
}
