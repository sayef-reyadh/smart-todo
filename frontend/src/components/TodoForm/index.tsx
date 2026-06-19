import { useState } from 'react'
import { Group } from '@mantine/core'
import { UiButton, UiTextInput } from '../../ui'
import type { TodoFormProps } from './types'

export type { TodoFormProps } from './types'

// Example of: #1 Components (function component), #7 Events (form submit, controlled input),
// #3 Props (onAdd callback = "events up"), #2 useState (local form state)
export function TodoForm({ onAdd }: TodoFormProps) {
  // useState: local state for the input — resets on submit
  const [text, setText] = useState('')

  // Events: typed form event, preventDefault stops full-page reload
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed) // Props: callback up — parent owns the todo list, child just reports
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Group gap="sm" mb="md">
        {/* Events: controlled input — value + onChange fires per keystroke */}
        <UiTextInput
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
          placeholder="Add a new task"
          ariaLabel="Task title"
        />
        <UiButton type="submit">Add</UiButton>
      </Group>
    </form>
  )
}
