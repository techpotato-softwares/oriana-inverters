/* Payload admin root layout — sync html/body shell for Lambda/LWA compatibility. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'

import { AdminRootShell } from './AdminRootShell'
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

const Layout = ({ children }: Args) => (
  <AdminRootShell config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </AdminRootShell>
)

export default Layout
