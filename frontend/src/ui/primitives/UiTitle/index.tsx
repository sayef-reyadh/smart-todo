import type { UiTitleProps } from './types'

export type { UiTitleProps } from './types'

export function UiTitle({ children }: UiTitleProps) {
  return <h1 style={{ margin: 0 }}>{children}</h1>
}
