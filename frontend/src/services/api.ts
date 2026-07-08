import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { TaskResponse } from '../types/api'

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
}
