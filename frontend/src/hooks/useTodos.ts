// Custom Hook: useTodos
// A custom hook is just a function whose name starts with "use" and calls other hooks inside.
// It lets you pull stateful logic OUT of a component so it can be reused or kept tidy.
import { useState } from 'react'
import { addTodo, toggleTodo, deleteTodo, clearCompleted } from '../pages/HomePage/utils'
import type { Todo } from '../types'
import seedTodos from '../data/todos.json'

export function useTodos() {
  // The same useState that was in HomePage — now lives here instead
  const [todos, setTodos] = useState<Todo[]>(seedTodos)

  return {
    todos,
    add:       (text: string) => setTodos((prev) => addTodo(prev, text)),
    toggle:    (id: string)   => setTodos((prev) => toggleTodo(prev, id)),
    remove:    (id: string)   => setTodos((prev) => deleteTodo(prev, id)),
    clearDone: ()             => setTodos((prev) => clearCompleted(prev)),
  }
}
