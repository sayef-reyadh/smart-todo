import { Group, Text } from '@mantine/core'
import { UiButton } from '../../ui'
import type { TodoStatsProps } from './types'

export type { TodoStatsProps } from './types'

export function TodoStats({ todos, onClearCompleted }: TodoStatsProps) {
  const doneCount = todos.filter((t) => t.done).length
  const remainingCount = todos.length - doneCount

  return (
    <Group justify="space-between" align="center">
      <Text size="sm" c="dimmed">
        {remainingCount} remaining · {doneCount} completed
      </Text>
      {doneCount > 0 && (
        <UiButton tone="danger" type="button" onClick={onClearCompleted}>
          Clear completed ({doneCount})
        </UiButton>
      )}
    </Group>
  )
}
