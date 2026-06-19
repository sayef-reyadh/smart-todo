import type { UiTextInputProps } from './types'

export type { UiTextInputProps } from './types'

export function UiTextInput({ ariaLabel, ...props }: UiTextInputProps) {
  return (
    <input
      aria-label={ariaLabel}
      {...props}
      style={{
        flex: 1,
        padding: '0.5rem 0.75rem',
        borderRadius: '0.375rem',
        border: '1px solid #e2e8f0',
        fontSize: '1rem',
      }}
    />
  )
}
