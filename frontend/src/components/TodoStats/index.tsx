import { UiButton } from '../../ui'
import type { TodoStatsProps } from './types'

export type { TodoStatsProps } from './types'

// Example of: #4 Rendering (derived values), #6 Conditional rendering (&& with > 0)
export function TodoStats({ todos, onClearCompleted }: TodoStatsProps) {
  // Derived during render — no extra state needed
  const doneCount = todos.filter((t) => t.done).length
  const remainingCount = todos.length - doneCount

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
        {remainingCount} remaining · {doneCount} completed
      </span>
      {/* Conditional rendering: && with > 0 avoids the number trap */}
      {doneCount > 0 && (
        <UiButton tone="danger" type="button" onClick={onClearCompleted}>
          Clear completed ({doneCount})
        </UiButton>
      )}
    </div>
  )
}
