import { Button, Checkbox, Paper, Text, TextInput, Title } from '@mantine/core'
import type { CheckboxProps, TextInputProps } from '@mantine/core'
import type { MouseEventHandler, ReactNode } from 'react'

type UiContainerProps = {
  children: ReactNode
}

type UiButtonProps = {
  children: ReactNode
  tone?: 'primary' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

type UiCheckboxProps = {
  label: string
  struck?: boolean
} & Pick<CheckboxProps, 'checked' | 'onChange'>

type UiTextInputProps = Pick<
  TextInputProps,
  'value' | 'onChange' | 'placeholder'
> & {
  ariaLabel: string
}

export function UiContainer({ children }: UiContainerProps) {
  return (
    <Paper
      withBorder
      radius="md"
      shadow="sm"
      p="lg"
      w="100%"
      maw={640}
      mx="auto"
      mt={48}
      bg="white"
    >
      {children}
    </Paper>
  )
}

export function UiTitle({ children }: { children: ReactNode }) {
  return (
    <Title order={1} mb={0}>
      {children}
    </Title>
  )
}

export function UiSubtitle({ children }: { children: ReactNode }) {
  return (
    <Text c="dimmed" mt={8} mb={20}>
      {children}
    </Text>
  )
}

export function UiTextInput({ ariaLabel, ...props }: UiTextInputProps) {
  return (
    <TextInput
      aria-label={ariaLabel}
      style={{ flex: 1 }}
      radius="md"
      size="md"
      {...props}
    />
  )
}

export function UiButton({ children, tone = 'primary', ...props }: UiButtonProps) {
  return (
    <Button color={tone === 'danger' ? 'red' : 'blue'} radius="md" {...props}>
      {children}
    </Button>
  )
}

export function UiCheckbox({ label, struck = false, ...props }: UiCheckboxProps) {
  return (
    <Checkbox
      label={
        <Text
          component="span"
          c={struck ? 'dimmed' : 'dark'}
          style={struck ? { textDecoration: 'line-through' } : undefined}
        >
          {label}
        </Text>
      }
      {...props}
    />
  )
}
