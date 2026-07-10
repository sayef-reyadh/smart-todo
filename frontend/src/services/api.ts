import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { TaskResponse } from '../types/api'

export type DemoItem = {
  user_id: string
  created_at: string
  id: string
  title: string
  status: string
  due_date?: string
}

export type DemoQueryResult = {
  pattern: string
  key_used: string
  description: string
  dynamo_call: string
  count: number
  items: DemoItem[]
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '/api'
const USER_HEADER = 'frontend-user'

// Create axios instance with default config
const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'X-User-Id': USER_HEADER,
  },
})

// API Service wrapper — central location for all API calls
export const apiService = {
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

  // ── DynamoDB Demo ──────────────────────────────────────────────────────────

  async seedDemo(): Promise<{ seeded: number }> {
    const r = await axiosClient.post('/demo/seed')
    return r.data
  },

  async createDemoTask(payload: { title: string; category?: string; priority?: string; due_date?: string }): Promise<unknown> {
    const r = await axiosClient.post('/demo/tasks', payload)
    return r.data
  },

  async queryPK(userId: string): Promise<DemoQueryResult> {
    const r = await axiosClient.get('/demo/pk', { params: { user_id: userId } })
    return r.data
  },

  async queryPKSKRange(userId: string, fromDt: string, toDt: string): Promise<DemoQueryResult> {
    const r = await axiosClient.get('/demo/pk-sk-range', { params: { user_id: userId, from_dt: fromDt, to_dt: toDt } })
    return r.data
  },

  async queryGSI(category: string, priority: string): Promise<DemoQueryResult> {
    const r = await axiosClient.get('/demo/gsi', { params: { category, priority: priority || undefined } })
    return r.data
  },

  async queryLSI(userId: string): Promise<DemoQueryResult> {
    const r = await axiosClient.get('/demo/lsi', { params: { user_id: userId } })
    return r.data
  },

  async bulkSeed(count: number): Promise<{ inserted: number; total_in_table: number }> {
    const r = await axiosClient.post('/demo/bulk-seed', null, { params: { count } })
    return r.data
  },

  async getCount(): Promise<{ total: number }> {
    const r = await axiosClient.get('/demo/count')
    return r.data
  },

  async queryBeginsWith(userId: string, prefix: string): Promise<DemoQueryResult> {
    const r = await axiosClient.get('/demo/begins-with', { params: { user_id: userId, prefix } })
    return r.data
  },

  async queryContains(keyword: string): Promise<DemoQueryResult> {
    const r = await axiosClient.get('/demo/contains', { params: { keyword } })
    return r.data
  },

  async queryAttributeExists(userId: string, mustExist: boolean): Promise<DemoQueryResult> {
    const r = await axiosClient.get('/demo/attribute-exists', { params: { user_id: userId, must_exist: mustExist } })
    return r.data
  },
}
