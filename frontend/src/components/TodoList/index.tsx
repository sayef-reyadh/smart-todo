import { Group, Stack } from '@mantine/core'
import { UiButton, UiCheckbox } from '../../ui'
import type { TodoListProps } from './types'

export type { TodoListProps } from './types'

// Example of: #5 Lists & Keys (map with stable key), #3 Props (data down, events up),
// #7 Events (onClick with arrow to pass args), #1 Components (composing UiCheckbox + UiButton)
export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <Stack gap="xs">
      {/* Lists & Keys: map with stable key={todo.id} — never array index */}
      {todos.map((todo) => (
        <Group
          key={todo.id}
          justify="space-between"
          align="center"
          gap="sm"
          p="xs"
          px="sm"
          style={{
            border: '1px solid var(--mantine-color-gray-3)',
            borderRadius: 'var(--mantine-radius-md)',
            background: 'var(--mantine-color-gray-0)',
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
        </Group>
      ))}
    </Stack>
  )
}
