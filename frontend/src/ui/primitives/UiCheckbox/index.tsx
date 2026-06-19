import type { UiCheckboxProps } from './types'

export type { UiCheckboxProps } from './types'

export function UiCheckbox({ label, struck = false, ...props }: UiCheckboxProps) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
      <input type="checkbox" {...props} />
      <span style={{
        color: struck ? '#94a3b8' : '#1e293b',
        textDecoration: struck ? 'line-through' : 'none',
      }}>
        {label}
      </span>
    </label>
  )
}
