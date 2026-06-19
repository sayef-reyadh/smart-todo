import { useState } from 'react'
import { Group, Stack, Text } from '@mantine/core'
import {
  UiButton,
  UiCheckbox,
  UiContainer,
  UiSubtitle,
  UiTextInput,
  UiTitle,
} from './ui'
import type { Todo } from './types'

function App() {
  const [todoText, setTodoText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Set up frontend project', done: true },
    { id: '2', text: 'Build simple Smart Todo UI', done: false },
  ])

  // #7 Events: typed form event, preventDefault stops reload
  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedText = todoText.trim()
    if (!trimmedText) return

    // #2 useState: functional update, immutable spread
    setTodos((prev) => [
      ...prev,
      { id: Date.now().toString(), text: trimmedText, done: false },
    ])
    setTodoText('')
  }

  // #3 Props callback: "events up" — child calls this, parent owns state
  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.done))
  }

  // #4 Rendering: derived values — computed during render, no extra state
  const doneCount = todos.filter((t) => t.done).length
  const remainingCount = todos.length - doneCount

  return (
    <UiContainer>
      <UiTitle>Smart Todo</UiTitle>
      <UiSubtitle>Keep your tasks simple and focused.</UiSubtitle>

      {/* #7 Events: onSubmit with typed handler. <form> stays — Mantine has no form tag wrapper */}
      <form onSubmit={handleAddTodo}>
        <Group gap="sm" mb="md">
          {/* #7 Events: controlled input — value + onChange fires per keystroke */}
          <UiTextInput
            value={todoText}
            onChange={(event) => setTodoText(event.currentTarget.value)}
            placeholder="Add a new task"
            ariaLabel="Task title"
          />
          <UiButton type="submit">Add</UiButton>
        </Group>
      </form>

      {/* #6 Conditional rendering: ternary — show empty state or list */}
      {todos.length === 0 ? (
        <Text ta="center" c="dimmed" py="xl">
          No tasks yet — add one above.
        </Text>
      ) : (
        <Stack gap="sm">
          {/* #4 Rendering: derived values rendered inline */}
          <Text size="sm" c="dimmed">
            {remainingCount} remaining · {doneCount} completed
          </Text>

          {/* #5 Lists & keys: map with stable key={todo.id}, never index */}
          <Stack gap="xs">
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
                {/* #1 Components: UiCheckbox is a function component with typed props */}
                {/* #3 Props: data down (checked, label), events up (onChange callback) */}
                <UiCheckbox
                  checked={todo.done}
                  onChange={() => handleToggleTodo(todo.id)}
                  label={todo.text}
                  struck={todo.done}
                />
                {/* #7 Events: onClick with arrow wrapper to pass args */}
                <UiButton tone="danger" type="button" onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </UiButton>
              </Group>
            ))}
          </Stack>

          {/* #6 Conditional rendering: && with > 0 (avoids number trap) */}
          {doneCount > 0 && (
            <Group justify="flex-end">
              <UiButton tone="danger" type="button" onClick={handleClearCompleted}>
                Clear completed ({doneCount})
              </UiButton>
            </Group>
          )}
        </Stack>
      )}
    </UiContainer>
  )
}

export default App
