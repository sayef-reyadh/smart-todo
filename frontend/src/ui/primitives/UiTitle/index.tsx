import { Title } from '@mantine/core'
import type { UiTitleProps } from './types'

export type { UiTitleProps } from './types'

export function UiTitle({ children }: UiTitleProps) {
  return (
    <Title order={1} mb={0}>
      {children}
    </Title>
  )
}
