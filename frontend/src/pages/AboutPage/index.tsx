// Example of: #1 Components (function component with no props), #2 TSX (Mantine components as JSX)
import { Stack, Text } from '@mantine/core'
import { UiContainer, UiTitle, UiSubtitle } from '../../ui'

export function AboutPage() {
  return (
    <UiContainer>
      <UiTitle>About Smart Todo</UiTitle>
      <UiSubtitle>A learning project built with modern React.</UiSubtitle>

      <Stack gap="md">
        <div>
          <Text fw={600} mb={4}>What is this?</Text>
          <Text c="dimmed">
            Smart Todo is a task management app built to learn and demonstrate React core concepts
            in a real, working application. Every component, hook, and pattern you see here maps
            to a fundamental React concept.
          </Text>
        </div>

        <div>
          <Text fw={600} mb={4}>Tech Stack</Text>
          <Text c="dimmed">
            React 19 · TypeScript · Vite · Mantine v9 · React Router
          </Text>
        </div>

        <div>
          <Text fw={600} mb={4}>Concepts Covered</Text>
          <Text c="dimmed">
            Components · TSX · Props · Rendering · Lists & Keys · Conditional Rendering · Events · Routing
          </Text>
        </div>

        <div>
          <Text fw={600} mb={4}>Built by</Text>
          <Text c="dimmed">SayefReyadh</Text>
        </div>
      </Stack>
    </UiContainer>
  )
}
