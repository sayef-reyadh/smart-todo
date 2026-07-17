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

// Create axios instance — token injected dynamically via interceptor
const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

// Interceptor: attach Bearer token from localStorage on every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

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
