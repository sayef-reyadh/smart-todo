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

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedText = todoText.trim()
    if (!trimmedText) {
      return
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: Date.now().toString(), text: trimmedText, done: false },
    ])
    setTodoText('')
  }

  const handleToggleTodo = (id: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  const handleDeleteTodo = (id: string) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  return (
    <UiContainer>
      <UiTitle>Smart Todo</UiTitle>
      <UiSubtitle>Keep your tasks simple and focused.</UiSubtitle>

      <form
        onSubmit={handleAddTodo}
        style={{ display: 'flex', gap: '0.625rem', marginBottom: '1rem' }}
      >
        <UiTextInput
          value={todoText}
          onChange={(event) => setTodoText(event.currentTarget.value)}
          placeholder="Add a new task"
          ariaLabel="Task title"
        />
        <UiButton type="submit">Add</UiButton>
      </form>

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
            <UiCheckbox
              checked={todo.done}
              onChange={() => handleToggleTodo(todo.id)}
              label={todo.text}
              struck={todo.done}
            />
            <UiButton tone="danger" type="button" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </UiButton>
          </li>
        ))}
      </ul>
    </UiContainer>
  )
}

export default App
