// Layout: wraps all pages with a nav bar + content area (Outlet).
// This is a React Router layout route — demonstrates component composition + Outlet.
import { Outlet, NavLink } from 'react-router'
import { Group, Text } from '@mantine/core'

export function AppLayout() {
  return (
    <>
      {/* Nav bar — Group for horizontal layout, NavLink for client-side navigation (no page reload) */}
      <Group justify="center" gap="lg" py="sm" bg="white" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
        <Text fw={700} size="lg" mr="md">Smart Todo</Text>
        {/* NavLink from react-router — renders an <a> with active styling, no full-page reload */}
        <NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400, color: 'inherit', textDecoration: 'none' })}>
          Home
        </NavLink>
        <NavLink to="/about" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400, color: 'inherit', textDecoration: 'none' })}>
          About
        </NavLink>
      </Group>

      {/* Outlet renders the matched child route (HomePage or AboutPage) */}
      <Outlet />
    </>
  )
}
