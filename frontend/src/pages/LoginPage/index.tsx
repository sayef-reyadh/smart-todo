import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { apiService } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { UiContainer, UiTitle, UiSubtitle } from '../../ui'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await apiService.login(email, password)
      login(data)
      navigate('/')
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <UiContainer>
      <UiTitle>Sign In</UiTitle>
      <UiSubtitle>Welcome back to Smart Todo.</UiSubtitle>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
        <div style={{ display: 'grid', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email</label>
          <input
            type="email" required value={email} onChange={e => setEmail(e.target.value)}
            style={inputStyle} placeholder="you@example.com"
          />
        </div>

        <div style={{ display: 'grid', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Password</label>
          <input
            type="password" required value={password} onChange={e => setPassword(e.target.value)}
            style={inputStyle} placeholder="••••••••"
          />
        </div>

        {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0 }}>{error}</p>}

        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p style={{ marginTop: '1rem', fontSize: '0.85rem', textAlign: 'center', color: '#64748b' }}>
        No account?{' '}
        <Link to="/signup" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
          Sign up
        </Link>
      </p>
    </UiContainer>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '0.5rem 0.75rem',
  border: '1px solid #cbd5e1',
  borderRadius: '0.375rem',
  fontSize: '0.9rem',
  width: '100%',
  boxSizing: 'border-box',
}

const btnStyle: React.CSSProperties = {
  padding: '0.6rem',
  background: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '0.375rem',
  fontWeight: 600,
  fontSize: '0.95rem',
  cursor: 'pointer',
  marginTop: '0.25rem',
}
