import { useState, useRef } from 'react'
import { UiButton } from '../../ui'
import type { TodoFormProps } from './types'

export type { TodoFormProps } from './types'

// Hooks demonstrated: useState (inputs), useRef (focus input after submit)
export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd({ title: trimmed, description: description || undefined, due_date: dueDate || null })
    setTitle('')
    setDescription('')
    setDueDate('')
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          aria-label="Task title"
          style={{ padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0', fontSize: '1rem' }}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          aria-label="Task description"
          style={{ padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0', fontSize: '0.95rem', minHeight: '3rem' }}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          aria-label="Due date"
          style={{ padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0', fontSize: '0.95rem' }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <UiButton type="submit">Add</UiButton>
        </div>
      </div>
    </form>
  )
}
