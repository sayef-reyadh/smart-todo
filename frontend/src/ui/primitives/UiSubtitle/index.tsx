import { Text } from '@mantine/core'
import type { UiSubtitleProps } from './types'

export type { UiSubtitleProps } from './types'

export function UiSubtitle({ children }: UiSubtitleProps) {
  return (
    <Text c="dimmed" mt={8} mb={20}>
      {children}
    </Text>
  )
}
