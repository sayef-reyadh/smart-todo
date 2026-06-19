import type { TextInputProps } from '@mantine/core'

export type UiTextInputProps = Pick<
  TextInputProps,
  'value' | 'onChange' | 'placeholder'
> & {
  ariaLabel: string
}
