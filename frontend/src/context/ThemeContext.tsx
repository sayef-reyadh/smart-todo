// useContext: ThemeContext
// createContext makes a "shared box" any component in the tree can read from.
// useContext reads from that box — no prop drilling needed.
import { createContext, useContext, useState } from 'react'

type ThemeContextType = {
  darkMode: boolean
  toggleDark: () => void
}

// 1. Create the context with a default value (used only when there's no Provider above)
export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDark: () => {},
})

// 2. Provider: owns the state, wraps the app, hands the value down to everyone
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDark: () => setDarkMode((p) => !p) }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Custom helper so consumers don't import ThemeContext directly
export function useTheme() {
  return useContext(ThemeContext) // reads the nearest Provider's value
}
