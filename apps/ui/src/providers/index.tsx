'use client'

import type { ReactNode } from 'react'
import { ThemeProvider } from './Theme'
import { HeaderThemeProvider } from './HeaderTheme'
import { SmoothScroll } from './SmoothScroll'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
