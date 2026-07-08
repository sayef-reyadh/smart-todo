// Hooks demonstrated in this file: useState, useEffect, Custom Hook (useTodos)
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { UiContainer, UiSubtitle, UiTitle } from '../../ui'
import { TodoForm } from '../../components/TodoForm'
import { TodoList } from '../../components/TodoList'
import { TodoStats } from '../../components/TodoStats'
import { useTodos } from '../../hooks/useTodos'

export function HomePage() {
  const navigate = useNavigate()
  
  // Custom Hook: all todo state + handlers live in useTodos — this component stays clean
  const { todos, add, toggle, remove, clearDone } = useTodos()

  // adapt add to the new signature used by TodoForm
  const handleAdd = (payload: { title: string; description?: string; due_date?: string | null }) => add(payload)

  // useState: simple boolean — show or hide completed todos
  const [showDone, setShowDone] = useState(true)

  // useEffect: runs after every render where `todos` changed — syncs document title
  // The array [todos] is the dependency — effect re-runs only when todos changes
  useEffect(() => {
    const pending = todos.filter((t) => !t.done).length
    document.title = pending > 0 ? `(${pending}) Smart Todo` : 'Smart Todo'
  }, [todos])

  // Derived value: filter list based on showDone — no extra state needed
  const visibleTodos = showDone ? todos : todos.filter((t) => !t.done)

  const handleView = (taskId: string) => {
    navigate(`/tasks/${taskId}`)
  }

  return (
    <UiContainer>
      <UiTitle>Smart Todo</UiTitle>
      <UiSubtitle>Keep your tasks simple and focused.</UiSubtitle>

      <TodoForm onAdd={handleAdd} />

      {todos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem 0' }}>
          No tasks yet — add one above.
        </p>
      ) : (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <TodoStats todos={todos} onClearCompleted={clearDone} />

          {/* useState: clicking this button flips showDone → re-render shows/hides done todos */}
          <button
            onClick={() => setShowDone((prev) => !prev)}
            style={{ justifySelf: 'start', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: '0.85rem' }}
          >
            {showDone ? 'Hide completed' : 'Show completed'}
          </button>

          <TodoList
            todos={visibleTodos}
            onToggle={toggle}
            onDelete={remove}
            onView={handleView}
          />
        </div>
      )}
    </UiContainer>
  )
}
