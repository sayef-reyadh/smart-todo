import type { UiSubtitleProps } from './types'

export type { UiSubtitleProps } from './types'

export function UiSubtitle({ children }: UiSubtitleProps) {
  return <p style={{ color: '#64748b', marginTop: '0.5rem', marginBottom: '1.25rem' }}>{children}</p>
}
