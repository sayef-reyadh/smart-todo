import { UiButton, UiCheckbox } from '../../ui'
import type { TodoListProps } from './types'

export type { TodoListProps } from './types'

export function TodoList({ todos, onToggle, onDelete, onView }: TodoListProps) {
  return (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
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
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <UiButton tone="primary" type="button" onClick={() => onView(todo.id)}>
              View
            </UiButton>
            <UiButton tone="danger" type="button" onClick={() => onDelete(todo.id)}>
              Delete
            </UiButton>
          </div>
        </div>
      ))}
    </div>
  )
}
