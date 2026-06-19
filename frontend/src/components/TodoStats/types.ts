import type { Todo } from '../../types'

export type TodoStatsProps = {
  todos: Todo[]
  onClearCompleted: () => void
}
