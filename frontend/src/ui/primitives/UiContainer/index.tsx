import type { UiContainerProps } from './types'

export type { UiContainerProps } from './types'

export function UiContainer({ children }: UiContainerProps) {
  return (
    <div style={{
      maxWidth: 640,
      width: '100%',
      margin: '3rem auto 0',
      padding: '1.5rem',
      background: 'white',
      borderRadius: '0.5rem',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    }}>
      {children}
    </div>
  )
}
