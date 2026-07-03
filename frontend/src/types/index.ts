// Shared app-wide types. Lives here because multiple components + pages depend on them.
export type Todo = {
  id: string
  text: string
  done: boolean
  description?: string | null
  dueDate?: string | null
}
