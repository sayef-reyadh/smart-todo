import { Checkbox, Text } from '@mantine/core'
import type { UiCheckboxProps } from './types'

export type { UiCheckboxProps } from './types'

export function UiCheckbox({ label, struck = false, ...props }: UiCheckboxProps) {
  return (
    <Checkbox
      label={
        <Text
          component="span"
          c={struck ? 'dimmed' : 'dark'}
          style={struck ? { textDecoration: 'line-through' } : undefined}
        >
          {label}
        </Text>
      }
      {...props}
    />
  )
}
