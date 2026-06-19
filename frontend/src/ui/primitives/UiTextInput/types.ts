import type { ChangeEventHandler } from 'react'

export type UiTextInputProps = {
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  ariaLabel: string
}
