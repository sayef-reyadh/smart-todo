import type { UiButtonProps } from './types'

export type { UiButtonProps } from './types'

export function UiButton({ children, tone = 'primary', ...props }: UiButtonProps) {
  return (
    <button
      {...props}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        color: 'white',
        background: tone === 'danger' ? '#ef4444' : '#3b82f6',
      }}
    >
      {children}
    </button>
  )
}
