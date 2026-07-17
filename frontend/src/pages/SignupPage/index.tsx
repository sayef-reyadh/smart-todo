import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { apiService } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { UiContainer, UiTitle, UiSubtitle } from '../../ui'
import { JwtViewer } from '../../components/JwtViewer'
import type { AuthTokenResponse } from '../../services/api'

export function SignupPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [tokenData, setTokenData] = useState<AuthTokenResponse | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await apiService.signup(name, email, password)
      setTokenData(data)   // show JWT in action before redirecting
      login(data)
      // give user a moment to see the token, then navigate
      setTimeout(() => navigate('/'), 4000)
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  if (tokenData) {
    return (
      <UiContainer>
        <UiTitle>Account Created!</UiTitle>
        <UiSubtitle>Here is your JWT token — see how it works:</UiSubtitle>
        <JwtViewer token={tokenData} />
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.82rem', marginTop: '1rem' }}>
          Redirecting to home in a moment…
        </p>
      </UiContainer>
    )
  }

  return (
    <UiContainer>
      <UiTitle>Create Account</UiTitle>
      <UiSubtitle>Join Smart Todo — it's free.</UiSubtitle>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
        <div style={{ display: 'grid', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Name</label>
          <input
            type="text" required value={name} onChange={e => setName(e.target.value)}
            style={inputStyle} placeholder="Alice"
          />
        </div>

        <div style={{ display: 'grid', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email</label>
          <input
            type="email" required value={email} onChange={e => setEmail(e.target.value)}
            style={inputStyle} placeholder="alice@example.com"
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
          {loading ? 'Creating account…' : 'Sign Up'}
        </button>
      </form>

      <p style={{ marginTop: '1rem', fontSize: '0.85rem', textAlign: 'center', color: '#64748b' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>
          Sign in
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
