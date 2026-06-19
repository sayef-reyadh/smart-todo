import type { CheckboxProps } from '@mantine/core'

export type UiCheckboxProps = {
  label: string
  struck?: boolean
} & Pick<CheckboxProps, 'checked' | 'onChange'>
