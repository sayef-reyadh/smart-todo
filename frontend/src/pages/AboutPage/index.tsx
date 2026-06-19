// Example of: #1 Components (function component with no props), #2 TSX (plain HTML as JSX)
import { UiContainer, UiTitle, UiSubtitle } from '../../ui'

export function AboutPage() {
  return (
    <UiContainer>
      <UiTitle>About Smart Todo</UiTitle>
      <UiSubtitle>A learning project built with modern React.</UiSubtitle>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <h3 style={{ margin: '0 0 0.25rem' }}>What is this?</h3>
          <p style={{ color: '#64748b', margin: 0 }}>
            Smart Todo is a task management app built to learn and demonstrate React core concepts
            in a real, working application. Every component, hook, and pattern you see here maps
            to a fundamental React concept.
          </p>
        </div>

        <div>
          <h3 style={{ margin: '0 0 0.25rem' }}>Tech Stack</h3>
          <p style={{ color: '#64748b', margin: 0 }}>
            React 19 · TypeScript · Vite · Mantine v9 · React Router
          </p>
        </div>

        <div>
          <h3 style={{ margin: '0 0 0.25rem' }}>Concepts Covered</h3>
          <p style={{ color: '#64748b', margin: 0 }}>
            Components · TSX · Props · Rendering · Lists & Keys · Conditional Rendering · Events · Routing
          </p>
        </div>

        <div>
          <h3 style={{ margin: '0 0 0.25rem' }}>Built by</h3>
          <p style={{ color: '#64748b', margin: 0 }}>SayefReyadh</p>
        </div>
      </div>
    </UiContainer>
  )
}
