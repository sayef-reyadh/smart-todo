// Example of: #2 useState (app state), #4 Rendering (derived values),
// #6 Conditional rendering (ternary for empty state), #3 Props (passing data down + callbacks up)
import { useState } from 'react'
import { Stack, Text } from '@mantine/core'
import { UiContainer, UiSubtitle, UiTitle } from '../../ui'
import { TodoForm } from '../../components/TodoForm'
import { TodoList } from '../../components/TodoList'
import { TodoStats } from '../../components/TodoStats'
import { addTodo, toggleTodo, deleteTodo, clearCompleted } from './utils'
import type { Todo } from '../../types'
import seedTodos from '../../data/todos.json'

export function HomePage() {
  // useState: initialized from static JSON (later: API call)
  const [todos, setTodos] = useState<Todo[]>(seedTodos)

  return (
    <UiContainer>
      <UiTitle>Smart Todo</UiTitle>
      <UiSubtitle>Keep your tasks simple and focused.</UiSubtitle>

      {/* Props: onAdd callback passed down — "events up" pattern */}
      <TodoForm onAdd={(text) => setTodos((prev) => addTodo(prev, text))} />

      {/* Conditional rendering: ternary — empty state vs todo list */}
      {todos.length === 0 ? (
        <Text ta="center" c="dimmed" py="xl">
          No tasks yet — add one above.
        </Text>
      ) : (
        <Stack gap="sm">
          {/* Props: data down (todos), callbacks up (onToggle, onDelete, onClearCompleted) */}
          <TodoStats
            todos={todos}
            onClearCompleted={() => setTodos((prev) => clearCompleted(prev))}
          />
          <TodoList
            todos={todos}
            onToggle={(id) => setTodos((prev) => toggleTodo(prev, id))}
            onDelete={(id) => setTodos((prev) => deleteTodo(prev, id))}
          />
        </Stack>
      )}
    </UiContainer>
  )
}
