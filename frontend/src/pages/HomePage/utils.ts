import type { Todo } from '../../types'

export function addTodo(todos: Todo[], text: string): Todo[] {
  return [...todos, { id: Date.now().toString(), text, done: false }]
}

export function toggleTodo(todos: Todo[], id: string): Todo[] {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo,
  )
}

export function deleteTodo(todos: Todo[], id: string): Todo[] {
  return todos.filter((todo) => todo.id !== id)
}

export function clearCompleted(todos: Todo[]): Todo[] {
  return todos.filter((todo) => !todo.done)
}
