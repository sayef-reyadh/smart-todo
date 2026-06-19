import type { MouseEventHandler, ReactNode } from 'react'

export type UiButtonProps = {
  children: ReactNode
  tone?: 'primary' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  onClick?: MouseEventHandler<HTMLButtonElement>
}
