// Layout: wraps all pages with a nav bar + content area (Outlet).
// Hooks demonstrated: useContext — reads darkMode from ThemeContext without prop drilling
import { Outlet, NavLink } from 'react-router'
import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export function AppLayout() {
  // useContext: reads the value provided by ThemeProvider in App.tsx
  // No props needed — any component can call useTheme() to access darkMode
  const { darkMode, toggleDark } = useTheme()
  const [greeting, setGreeting] = useState('Hello Sayef')

  useEffect(() => {
    let active = true

    async function loadGreeting() {
      try {
        const response = await fetch('/api/')
        const data = (await response.json()) as { Hello?: string; full_name?: string }
        const name = data.Hello ?? data.full_name

        if (active && name) {
          setGreeting(`Hello ${name}`)
        }
      } catch {
        // Keep the default greeting when backend is unavailable.
      }
    }

    loadGreeting()

    return () => {
      active = false
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: darkMode ? '#0f172a' : '#f8fafc', color: darkMode ? '#f8fafc' : '#0f172a', transition: 'background 0.2s, color 0.2s' }}>
      <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', padding: '0.75rem', background: darkMode ? '#1e293b' : 'white', borderBottom: '1px solid #e2e8f0' }}>
        <strong style={{ fontSize: '1.125rem', marginRight: '1rem' }}>
          Smart Todo <span style={{ fontWeight: 500, opacity: 0.8 }}>| {greeting}</span>
        </strong>
        <NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400, color: 'inherit', textDecoration: 'none' })}>
          Home
        </NavLink>
        <NavLink to="/about" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400, color: 'inherit', textDecoration: 'none' })}>
          About
        </NavLink>
        {/* useContext in action: toggleDark came from ThemeContext, not from a parent prop */}
        <button
          onClick={toggleDark}
          style={{ marginLeft: 'auto', background: 'none', border: '1px solid #cbd5e1', borderRadius: '0.375rem', padding: '0.25rem 0.75rem', cursor: 'pointer', color: 'inherit', fontSize: '0.85rem' }}
        >
          {darkMode ? '☀ Light' : '🌙 Dark'}
        </button>
      </nav>
      <Outlet />
    </div>
  )
}
