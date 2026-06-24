import { useState, useRef } from 'react'
import { UiButton } from '../../ui'
import type { TodoFormProps } from './types'

export type { TodoFormProps } from './types'

// Hooks demonstrated: useState (input text), useRef (focus input after submit)
export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('')

  // useRef: creates a reference to the input DOM node — does NOT cause re-renders
  // inputRef.current points to the actual <input> element after the component mounts
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
    // useRef in action: directly call .focus() on the DOM node — no re-render needed
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {/* ref={inputRef} wires this DOM element to our ref object */}
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task"
          aria-label="Task title"
          style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0', fontSize: '1rem' }}
        />
        <UiButton type="submit">Add</UiButton>
      </div>
    </form>
  )
}
