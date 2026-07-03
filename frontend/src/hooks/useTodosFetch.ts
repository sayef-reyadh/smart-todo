import { useEffect, useState } from 'react'
import type { Todo } from '../../types'
import type { TaskResponse } from '../types/api'

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || ''
const USER_HEADER = 'frontend-user'

function taskToTodo(t: TaskResponse): Todo {
  return {
    id: t.id,
    text: t.title,
    done: t.status === 'COMPLETED',
  }
}

export function useTodosFetch() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/tasks`, { headers: { 'X-User-Id': USER_HEADER } })
        if (!res.ok) throw new Error(`Failed to load: ${res.status}`)
        const data: TaskResponse[] = await res.json()
        setTodos(data.map(taskToTodo))
      } catch (err) {
        console.error('useTodosFetch: load failed', err)
      }
    })()
  }, [])

  async function add(text: string) {
    try {
      const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-User-Id': USER_HEADER },
        body: JSON.stringify({ title: text }),
      })
      if (!res.ok) throw new Error('create failed')
      const t: TaskResponse = await res.json()
      setTodos((prev) => [...prev, taskToTodo(t)])
    } catch (err) {
      console.error('add failed', err)
    }
  }

  async function toggle(id: string) {
    try {
      // find current todo and compute new status
      const current = todos.find((t) => t.id === id)
      const newStatus = current && current.done ? 'PENDING' : 'COMPLETED'
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-User-Id': USER_HEADER },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error('toggle failed')
      const t: TaskResponse = await res.json()
      setTodos((prev) => prev.map((p) => (p.id === t.id ? taskToTodo(t) : p)))
    } catch (err) {
      console.error('toggle failed', err)
    }
  }

  async function remove(id: string) {
    try {
      const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'X-User-Id': USER_HEADER },
      })
      if (res.status === 204) {
        setTodos((prev) => prev.filter((t) => t.id !== id))
      } else {
        throw new Error('delete failed')
      }
    } catch (err) {
      console.error('remove failed', err)
    }
  }

  async function clearDone() {
    try {
      const done = todos.filter((t) => t.done)
      await Promise.all(done.map((d) => fetch(`${API_BASE}/tasks/${d.id}`, { method: 'DELETE', headers: { 'X-User-Id': USER_HEADER } })))
      setTodos((prev) => prev.filter((t) => !t.done))
    } catch (err) {
      console.error('clearDone failed', err)
    }
  }

  return { todos, add, toggle, remove, clearDone }
}
