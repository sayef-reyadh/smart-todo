import { TextInput } from '@mantine/core'
import type { UiTextInputProps } from './types'

export type { UiTextInputProps } from './types'

export function UiTextInput({ ariaLabel, ...props }: UiTextInputProps) {
  return (
    <TextInput
      aria-label={ariaLabel}
      style={{ flex: 1 }}
      radius="md"
      size="md"
      {...props}
    />
  )
}
