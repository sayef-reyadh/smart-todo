import { Button } from '@mantine/core'
import type { UiButtonProps } from './types'

export type { UiButtonProps } from './types'

export function UiButton({ children, tone = 'primary', ...props }: UiButtonProps) {
  return (
    <Button color={tone === 'danger' ? 'red' : 'blue'} radius="md" {...props}>
      {children}
    </Button>
  )
}
