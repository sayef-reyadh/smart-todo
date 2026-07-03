import { useEffect, useState } from 'react'
import axios from 'axios'
import type { Todo } from '../../types'
import type { TaskResponse } from '../types/api'

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || '/api'
const USER_HEADER = 'frontend-user'

function taskToTodo(t: TaskResponse): Todo {
  return { id: t.id, text: t.title, done: t.status === 'COMPLETED' }
}

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'X-User-Id': USER_HEADER },
})

export function useTodosAxios() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    client
      .get<TaskResponse[]>('/tasks')
      .then((r) => setTodos(r.data.map(taskToTodo)))
      .catch((e) => console.error('useTodosAxios load failed', e))
  }, [])

  async function add(text: string) {
    try {
      const r = await client.post<TaskResponse>('/tasks', { title: text })
      setTodos((prev) => [...prev, taskToTodo(r.data)])
    } catch (e) {
      console.error('add failed', e)
    }
  }

  async function toggle(id: string) {
    try {
      const r = await client.post<TaskResponse>(`/tasks/${id}/toggle`)
      setTodos((prev) => prev.map((p) => (p.id === r.data.id ? taskToTodo(r.data) : p)))
    } catch (e) {
      console.error('toggle failed', e)
    }
  }

  async function remove(id: string) {
    try {
      await client.delete(`/tasks/${id}`)
      setTodos((prev) => prev.filter((t) => t.id !== id))
    } catch (e) {
      console.error('remove failed', e)
    }
  }

  async function clearDone() {
    try {
      const done = todos.filter((t) => t.done)
      await Promise.all(done.map((d) => client.delete(`/tasks/${d.id}`)))
      setTodos((prev) => prev.filter((t) => !t.done))
    } catch (e) {
      console.error('clearDone failed', e)
    }
  }

  return { todos, add, toggle, remove, clearDone }
}
