import { useEffect, useState } from 'react'
import type { Todo } from '../types'
import type { TaskResponse } from '../types/api'
import { apiService } from '../services/api'

function taskToTodo(t: TaskResponse): Todo {
  return {
    id: t.id,
    text: t.title,
    done: t.status === 'COMPLETED',
    description: t.description ?? null,
    dueDate: t.due_date ?? null,
  }
}

export function useTodosAxios() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    (async () => {
      try {
        const tasks = await apiService.getTasks()
        setTodos(tasks.map(taskToTodo))
      } catch (err) {
        console.error('useTodosAxios: load failed', err)
      }
    })()
  }, [])

  async function add(payload: { title: string; description?: string; due_date?: string | null }) {
    try {
      const task = await apiService.createTask(payload)
      setTodos((prev) => [...prev, taskToTodo(task)])
    } catch (err) {
      console.error('add failed', err)
    }
  }

  async function toggle(id: string) {
    try {
      const current = todos.find((t) => t.id === id)
      const newStatus = current && current.done ? 'PENDING' : 'COMPLETED'
      const task = await apiService.updateTask(id, { status: newStatus })
      setTodos((prev) => prev.map((p) => (p.id === task.id ? taskToTodo(task) : p)))
    } catch (err) {
      console.error('toggle failed', err)
    }
  }

  async function remove(id: string) {
    try {
      await apiService.deleteTask(id)
      setTodos((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      console.error('remove failed', err)
    }
  }

  async function clearDone() {
    try {
      const done = todos.filter((t) => t.done)
      await Promise.all(done.map((d) => apiService.deleteTask(d.id)))
      setTodos((prev) => prev.filter((t) => !t.done))
    } catch (err) {
      console.error('clearDone failed', err)
    }
  }

  return { todos, add, toggle, remove, clearDone }
}
