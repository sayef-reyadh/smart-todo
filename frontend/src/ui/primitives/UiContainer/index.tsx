import { Paper } from '@mantine/core'
import type { UiContainerProps } from './types'

export type { UiContainerProps } from './types'

export function UiContainer({ children }: UiContainerProps) {
  return (
    <Paper
      withBorder
      radius="md"
      shadow="sm"
      p="lg"
      w="100%"
      maw={640}
      mx="auto"
      mt={48}
      bg="white"
    >
      {children}
    </Paper>
  )
}
