import { createContext, useContext, useState, type ReactNode } from 'react'
import type { AuthTokenResponse } from '../services/api'
import { apiService } from '../services/api'

type AuthUser = {
  userId: string
  email: string
  name: string
  token: string
  expiresInMinutes: number
}

type AuthContextValue = {
  user: AuthUser | null
  login: (data: AuthTokenResponse) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem('auth_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  const login = (data: AuthTokenResponse) => {
    const authUser: AuthUser = {
      userId: data.user_id,
      email: data.email,
      name: data.name,
      token: data.access_token,
      expiresInMinutes: data.expires_in_minutes,
    }
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('auth_user', JSON.stringify(authUser))
    setUser(authUser)
  }

  const logout = () => {
    // Revoke refresh token on the server (clears httpOnly cookie + DB entry),
    // then clear local state. Fire-and-forget — don't block the UI.
    apiService.logout().finally(() => {
      setUser(null)
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
