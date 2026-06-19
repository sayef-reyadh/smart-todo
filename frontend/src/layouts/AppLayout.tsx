// Layout: wraps all pages with a nav bar + content area (Outlet).
// This is a React Router layout route — demonstrates component composition + Outlet.
import { Outlet, NavLink } from 'react-router'

export function AppLayout() {
  return (
    <>
      {/* Nav bar — plain HTML flexbox, NavLink for client-side navigation (no page reload) */}
      <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', padding: '0.75rem', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <strong style={{ fontSize: '1.125rem', marginRight: '1rem' }}>Smart Todo</strong>
        {/* NavLink from react-router — renders an <a> with active styling, no full-page reload */}
        <NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400, color: 'inherit', textDecoration: 'none' })}>
          Home
        </NavLink>
        <NavLink to="/about" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400, color: 'inherit', textDecoration: 'none' })}>
          About
        </NavLink>
      </nav>

      {/* Outlet renders the matched child route (HomePage or AboutPage) */}
      <Outlet />
    </>
  )
}
