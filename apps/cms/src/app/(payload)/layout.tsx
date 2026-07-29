/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React, { Suspense } from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

/**
 * Wrap Next's layout `children` (LayoutRouter) in Suspense before Payload's async
 * RootLayout awaits initReq. On Lambda/LWA buffered mode, passing the raw children
 * thenable through those awaits serializes as `null`, so admin stays blank even
 * though LoginForm exists in the RSC payload.
 */
const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    <Suspense fallback={null}>{children}</Suspense>
  </RootLayout>
)

export default Layout
