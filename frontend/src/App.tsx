import { useState } from 'react'
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

      {/* #7 Events: onSubmit with typed handler */}
      <form
        onSubmit={handleAddTodo}
        style={{ display: 'flex', gap: '0.625rem', marginBottom: '1rem' }}
      >
        {/* #7 Events: controlled input — value + onChange fires per keystroke */}
        <UiTextInput
          value={todoText}
          onChange={(event) => setTodoText(event.currentTarget.value)}
          placeholder="Add a new task"
          ariaLabel="Task title"
        />
        <UiButton type="submit">Add</UiButton>
      </form>

      {/* #6 Conditional rendering: early-return-style — show empty state or list */}
      {todos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem 0' }}>
          No tasks yet — add one above.
        </p>
      ) : (
        <>
          {/* #4 Rendering: derived values rendered inline */}
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>
            {remainingCount} remaining · {doneCount} completed
          </p>

          {/* #5 Lists & keys: map with stable key={todo.id}, never index */}
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gap: '0.625rem',
            }}
          >
            {todos.map((todo) => (
              <li
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
              </li>
            ))}
          </ul>

          {/* #6 Conditional rendering: && with > 0 (avoids number trap) */}
          {doneCount > 0 && (
            <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
              <UiButton tone="danger" type="button" onClick={handleClearCompleted}>
                Clear completed ({doneCount})
              </UiButton>
            </div>
          )}
        </>
      )}
    </UiContainer>
  )
}

export default App
