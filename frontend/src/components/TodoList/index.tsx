import { UiButton, UiCheckbox } from '../../ui'
import type { TodoListProps } from './types'

export type { TodoListProps } from './types'

// Example of: #5 Lists & Keys (map with stable key), #3 Props (data down, events up),
// #7 Events (onClick with arrow to pass args), #1 Components (composing UiCheckbox + UiButton)
export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
      {/* Lists & Keys: map with stable key={todo.id} — never array index */}
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.625rem 0.75rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.5rem',
            background: '#f8fafc',
          }}
        >
          <UiCheckbox
            checked={todo.done}
            onChange={() => onToggle(todo.id)}
            label={todo.text}
            struck={todo.done}
          />
          <UiButton tone="danger" type="button" onClick={() => onDelete(todo.id)}>
            Delete
          </UiButton>
        </div>
      ))}
    </div>
  )
}
