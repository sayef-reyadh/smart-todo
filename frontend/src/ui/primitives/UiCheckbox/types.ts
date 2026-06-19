import type { ChangeEventHandler } from 'react'

export type UiCheckboxProps = {
  label: string
  struck?: boolean
  checked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}
