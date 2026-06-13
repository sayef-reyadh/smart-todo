import '@mantine/core/styles.css'
import { MantineProvider, createTheme } from '@mantine/core'
import type { ReactNode } from 'react'

const appTheme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  },
})

type AppUiProviderProps = {
  children: ReactNode
}

export function AppUiProvider({ children }: AppUiProviderProps) {
  return <MantineProvider theme={appTheme}>{children}</MantineProvider>
}
