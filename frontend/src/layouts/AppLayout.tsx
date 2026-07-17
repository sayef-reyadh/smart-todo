import { Outlet, NavLink, useNavigate } from 'react-router'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export function AppLayout() {
  const { darkMode, toggleDark } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: darkMode ? '#0f172a' : '#f8fafc', color: darkMode ? '#f8fafc' : '#0f172a', transition: 'background 0.2s, color 0.2s' }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0.75rem 1.25rem', background: darkMode ? '#1e293b' : 'white', borderBottom: '1px solid #e2e8f0' }}>
        <strong style={{ fontSize: '1.125rem' }}>Smart Todo</strong>
        <NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400, color: 'inherit', textDecoration: 'none' })}>
          Home
        </NavLink>
        <NavLink to="/about" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 400, color: 'inherit', textDecoration: 'none' })}>
          About
        </NavLink>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {user && (
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
              👤 <strong>{user.name}</strong> ({user.email})
            </span>
          )}
          <button onClick={toggleDark} style={navBtn}>
            {darkMode ? '☀ Light' : '🌙 Dark'}
          </button>
          {user
            ? <button onClick={handleLogout} style={{ ...navBtn, color: '#ef4444', borderColor: '#fecaca' }}>Sign out</button>
            : <NavLink to="/login" style={{ ...navBtn, textDecoration: 'none', display: 'inline-block' }}>Sign in</NavLink>
          }
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

const navBtn: React.CSSProperties = {
  background: 'none',
  border: '1px solid #cbd5e1',
  borderRadius: '0.375rem',
  padding: '0.25rem 0.75rem',
  cursor: 'pointer',
  color: 'inherit',
  fontSize: '0.85rem',
}
