/* eslint-disable @typescript-eslint/no-explicit-any */
import { rtlLanguages } from '@payloadcms/translations'
import { ProgressBar, RootProvider } from '@payloadcms/ui'
import { getClientConfig } from '@payloadcms/ui/utilities/getClientConfig'
import { cookies as nextCookies } from 'next/headers'
import type { ImportMap, SanitizedConfig, ServerFunctionClient } from 'payload'
import { applyLocaleFiltering } from 'payload/shared'
import React, { Suspense } from 'react'

// Relative file paths bypass @payloadcms/next "exports" (these helpers aren't public).
import { getNavPrefs } from '../../../../../node_modules/@payloadcms/next/dist/elements/Nav/getNavPrefs.js'
import { getRequestTheme } from '../../../../../node_modules/@payloadcms/next/dist/utilities/getRequestTheme.js'
import { initReq } from '../../../../../node_modules/@payloadcms/next/dist/utilities/initReq.js'

type AdminShellProps = {
  children: React.ReactNode
  config: SanitizedConfig | Promise<SanitizedConfig>
  importMap: ImportMap
  serverFunction: ServerFunctionClient
}

/**
 * Sync html/body shell. Payload's stock RootLayout puts html/body inside an async
 * component that awaits DB/auth first; under AWS Lambda Web Adapter that causes
 * Next's LayoutRouter (`children`) to serialize as null → blank /admin.
 */
export function AdminRootShell({
  children,
  config,
  importMap,
  serverFunction,
}: AdminShellProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`@layer payload-default, payload;`}</style>
      </head>
      <body>
        <Suspense fallback={null}>
          <AdminRootProviders
            config={config}
            importMap={importMap}
            serverFunction={serverFunction}
          >
            {children}
          </AdminRootProviders>
        </Suspense>
        <div id="portal" />
      </body>
    </html>
  )
}

async function AdminRootProviders({
  children,
  config: configPromise,
  importMap,
  serverFunction,
}: AdminShellProps) {
  const {
    cookies,
    headers,
    languageCode,
    permissions,
    req,
    req: {
      payload: { config },
    },
  } = await initReq({
    configPromise,
    importMap,
    key: 'RootLayout',
  })

  const theme = getRequestTheme({ config, cookies, headers }) || 'light'
  const dir = rtlLanguages.includes(languageCode as (typeof rtlLanguages)[number])
    ? 'RTL'
    : 'LTR'

  const languageOptions = Object.entries(config.i18n.supportedLanguages || {}).reduce(
    (acc: { label: string; value: string }[], [language, languageConfig]) => {
      if (Object.keys(config.i18n.supportedLanguages).includes(language)) {
        acc.push({
          label: (languageConfig as any).translations.general.thisLanguage,
          value: language,
        })
      }
      return acc
    },
    [],
  )

  async function switchLanguageServerAction(lang: string) {
    'use server'
    const cookieStore = await nextCookies()
    cookieStore.set({
      name: `${config.cookiePrefix || 'payload'}-lng`,
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      value: lang,
    })
  }

  const navPrefs = await getNavPrefs(req)
  const clientConfig = getClientConfig({
    config,
    i18n: req.i18n,
    importMap,
    user: req.user as any,
  })
  await applyLocaleFiltering({ clientConfig, config, req })

  const providerProps = {
    config: clientConfig,
    dateFNSKey: req.i18n.dateFNSKey,
    fallbackLang: config.i18n.fallbackLanguage,
    isNavOpen: navPrefs?.open ?? true,
    languageCode,
    languageOptions,
    locale: req.locale ?? undefined,
    permissions: req.user ? permissions : null,
    serverFunction,
    switchLanguageServerAction,
    theme,
    translations: req.i18n.translations,
    user: req.user,
  }

  return (
    // Props mirror Payload RootLayout; cast avoids strict UI package mismatches.
    <RootProvider {...(providerProps as any)}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('data-theme',${JSON.stringify(theme)});document.documentElement.setAttribute('dir',${JSON.stringify(dir)});document.documentElement.lang=${JSON.stringify(languageCode)};`,
        }}
      />
      <ProgressBar />
      {children}
    </RootProvider>
  )
}
