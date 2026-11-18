import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { TaskResponse } from '../types/api'

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '/api'

export type AuthTokenResponse = {
  access_token: string
  token_type: string
  user_id: string
  email: string
  name: string
  expires_in_minutes: number
}

export type RefreshTokenResponse = {
  access_token: string
  token_type: string
  expires_in_minutes: number
}

// Create axios instance — token injected dynamically via interceptor
const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true is required so the browser sends the httpOnly
  // refresh_token cookie on cross-origin requests to /api/auth/refresh
  withCredentials: true,
})

// ── Request interceptor: attach Bearer token from localStorage ────────────
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

// ── Response interceptor: silent token refresh on 401 ────────────────────
//
// Flow:
//   1. Any request returns 401 (access_token expired)
//   2. Interceptor calls POST /auth/refresh  (browser auto-sends httpOnly cookie)
//   3. Server returns new access_token → stored in localStorage
//   4. Original request is retried with the new token
//   5. If refresh also returns 401 → refresh_token expired → force logout
//
// _retry flag prevents infinite loops: if the retry itself gets a 401,
// we don't refresh again — we just reject and let the app handle logout.

let _isRefreshing = false
let _pendingQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = []

const _processQueue = (error: unknown, token: string | null) => {
  _pendingQueue.forEach(({ resolve, reject }) => {
    if (token) resolve(token)
    else reject(error)
  })
  _pendingQueue = []
}

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    // Only intercept 401s that are NOT from the refresh endpoint itself
    if (error.response?.status !== 401 || original._retry || original.url?.includes('/auth/refresh')) {
      return Promise.reject(error)
    }

    // Signature mismatch / malformed token — revoke refresh token then force re-login
    if (error.response?.data?.detail === 'Token invalid') {
      _processQueue(error, null)
      // Logout endpoint reads httpOnly cookie directly, no Bearer needed
      await axiosClient.post('/auth/logout').catch(() => {})
      localStorage.removeItem('access_token')
      localStorage.removeItem('auth_user')
      window.location.href = '/login'
      return Promise.reject(error)
    }

    if (_isRefreshing) {
      // Queue concurrent requests while a refresh is in progress
      return new Promise((resolve, reject) => {
        _pendingQueue.push({
          resolve: (token) => {
            original.headers['Authorization'] = `Bearer ${token}`
            resolve(axiosClient(original))
          },
          reject,
        })
      })
    }

    original._retry = true
    _isRefreshing = true

    try {
      const { data } = await axiosClient.post<RefreshTokenResponse>('/auth/refresh')
      const newToken = data.access_token
      localStorage.setItem('access_token', newToken)
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      original.headers['Authorization'] = `Bearer ${newToken}`
      _processQueue(null, newToken)
      return axiosClient(original)
    } catch (refreshError) {
      _processQueue(refreshError, null)
      // Refresh failed — clear session and redirect to login
      localStorage.removeItem('access_token')
      localStorage.removeItem('auth_user')
      window.location.href = '/login'
      return Promise.reject(refreshError)
    } finally {
      _isRefreshing = false
    }
  }
)

// API Service wrapper — central location for all API calls
export const apiService = {
  // Auth
  async signup(name: string, email: string, password: string): Promise<AuthTokenResponse> {
    const r = await axiosClient.post<AuthTokenResponse>('/auth/signup', { name, email, password })
    return r.data
  },

  async login(email: string, password: string): Promise<AuthTokenResponse> {
    const r = await axiosClient.post<AuthTokenResponse>('/auth/login', { email, password })
    return r.data
  },

  async logout(): Promise<void> {
    // Tell the server to revoke the refresh token in DB, then clear the cookie
    await axiosClient.post('/auth/logout').catch(() => {/* ignore errors on logout */})
    localStorage.removeItem('access_token')
    localStorage.removeItem('auth_user')
  },

  // Tasks
  async getTasks(): Promise<TaskResponse[]> {
    const response = await axiosClient.get<TaskResponse[]>('/tasks')
    return response.data
  },

  async getTaskById(taskId: string): Promise<TaskResponse> {
    const response = await axiosClient.get<TaskResponse>(`/tasks/${taskId}`)
    return response.data
  },

  async createTask(payload: {
    title: string
    description?: string
    due_date?: string | null
  }): Promise<TaskResponse> {
    const response = await axiosClient.post<TaskResponse>('/tasks', payload)
    return response.data
  },

  async updateTask(
    taskId: string,
    payload: {
      title?: string
      description?: string | null
      status?: 'PENDING' | 'COMPLETED'
      due_date?: string | null
    }
  ): Promise<TaskResponse> {
    const response = await axiosClient.patch<TaskResponse>(`/tasks/${taskId}`, payload)
    return response.data
  },

  async deleteTask(taskId: string): Promise<void> {
    await axiosClient.delete(`/tasks/${taskId}`)
  },
}
