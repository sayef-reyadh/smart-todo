import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Todo = {
  id: string
  text: string
  done: boolean
}

function App() {
  const [todoText, setTodoText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Set up frontend project', done: true },
    { id: '2', text: 'Build simple Smart Todo UI', done: false },
  ])

  const handleAddTodo = (event: FormEvent) => {
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
    <main className="app">
      <h1>Smart Todo</h1>
      <p className="subtitle">Keep your tasks simple and focused.</p>

      <form className="todo-form" onSubmit={handleAddTodo}>
        <input
          type="text"
          value={todoText}
          onChange={(event) => setTodoText(event.target.value)}
          placeholder="Add a new task"
          aria-label="Task title"
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
            </label>
            <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App
