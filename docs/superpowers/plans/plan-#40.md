# Learn React Core Concepts (TSX) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add practical, live-rendered TSX examples for all 7 React core concepts directly into the Smart Todo app, so each concept is visible and interactive when running `npm run dev`.

**Architecture:** Each concept gets its own example component in `frontend/src/examples/`. `App.tsx` imports and renders all 7 inside labeled sections below the main todo list, using existing `UiSubtitle` for headings. A shared `Todo` type is exported from a single types file to avoid duplication. All examples operate on the same `todos` state from `App.tsx` — no separate data.

**Tech Stack:** React 19, TypeScript (TSX), Vite, Mantine v9

## Global Constraints

- All files are `.tsx` (never `.jsx` or `.js`).
- Type-check must pass: `cd frontend && npx tsc -p tsconfig.app.json --noEmit` — zero errors.
- Use existing Mantine UI primitives from `frontend/src/ui/` where they fit. Plain HTML when demonstrating raw React concepts.
- No new dependencies. Everything uses React 19 + Mantine already installed.
- Commit after each task. Author: SayefReyadh, no co-author.
- Every example must render live in the app (wired into `App.tsx`), not be a dead file.

---

### Task 1: Extract shared Todo type

**Files:**
- Create: `frontend/src/types.ts`
- Modify: `frontend/src/App.tsx:12-16`

**Interfaces:**
- Consumes: nothing
- Produces: `Todo` type (`{ id: string; text: string; done: boolean }`) used by all subsequent tasks.

- [ ] **Step 1: Create the shared type file**

```ts
// frontend/src/types.ts
export type Todo = {
  id: string
  text: string
  done: boolean
}
```

- [ ] **Step 2: Update App.tsx to import from types.ts**

Replace the inline `type Todo` block in `App.tsx` with:

```tsx
import type { Todo } from './types'
```

Remove lines 12-16 (the inline `type Todo = { ... }` block).

- [ ] **Step 3: Verify type-check passes**

Run: `cd frontend && npx tsc -p tsconfig.app.json --noEmit`
Expected: `No errors found`

- [ ] **Step 4: Commit**

```bash
git add frontend/src/types.ts frontend/src/App.tsx
git commit -m "Extract shared Todo type to types.ts"
```

---

### Task 2: Example 1 — Components (`TodoItem`)

**Files:**
- Create: `frontend/src/examples/1-components.tsx`
- Modify: `frontend/src/App.tsx`

**Interfaces:**
- Consumes: `Todo` from `frontend/src/types.ts`
- Produces: `TodoItem` component (`{ todo: Todo } => JSX.Element`)

**Concept demonstrated:** A function component is a function that takes typed props and returns JSX. Capitalized name. Pure.

- [ ] **Step 1: Create the example component**

```tsx
// frontend/src/examples/1-components.tsx
import type { Todo } from '../types'

type TodoItemProps = {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  return (
    <li
      data-id={todo.id}
      style={{ textDecoration: todo.done ? 'line-through' : 'none', padding: '0.25rem 0' }}
    >
      {todo.text}
    </li>
  )
}
```

- [ ] **Step 2: Wire into App.tsx**

Add import at top of `App.tsx`:
```tsx
import { TodoItem } from './examples/1-components'
```

Add below the `</ul>` closing tag (after the main todo list), before `</UiContainer>`:
```tsx
<UiSubtitle>Example 1: Components — TodoItem</UiSubtitle>
<ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
  {todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} />
  ))}
</ul>
```

- [ ] **Step 3: Verify type-check passes**

Run: `cd frontend && npx tsc -p tsconfig.app.json --noEmit`
Expected: `No errors found`

- [ ] **Step 4: Visual check — run dev server**

Run: `cd frontend && npm run dev`
Expected: Below the main todo list, a "Example 1: Components — TodoItem" section renders each todo as plain text, with done items struck through.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/examples/1-components.tsx frontend/src/App.tsx
git commit -m "Add React Core #1 Components example — TodoItem"
```

---

### Task 3: Example 2 — TSX (`TodoSummary`)

**Files:**
- Create: `frontend/src/examples/2-tsx.tsx`
- Modify: `frontend/src/App.tsx`

**Interfaces:**
- Consumes: `Todo` from `frontend/src/types.ts`
- Produces: `TodoSummary` component (`{ todos: Todo[] } => JSX.Element`)

**Concept demonstrated:** `{}` expressions, `className`, fragment `<>`, self-closing `<hr />`, `&&` rendering. Compiler type-checks the markup.

- [ ] **Step 1: Create the example component**

```tsx
// frontend/src/examples/2-tsx.tsx
import type { Todo } from '../types'

export function TodoSummary({ todos }: { todos: Todo[] }) {
  const remaining = todos.filter((t) => !t.done).length

  return (
    <>
      <p style={{ fontWeight: 600 }}>{remaining} of {todos.length} tasks remaining</p>
      {remaining === 0 && <hr style={{ border: '1px solid #16a34a' }} />}
    </>
  )
}
```

- [ ] **Step 2: Wire into App.tsx**

Add import:
```tsx
import { TodoSummary } from './examples/2-tsx'
```

Add after Example 1 section:
```tsx
<UiSubtitle>Example 2: TSX — TodoSummary</UiSubtitle>
<TodoSummary todos={todos} />
```

- [ ] **Step 3: Verify type-check passes**

Run: `cd frontend && npx tsc -p tsconfig.app.json --noEmit`
Expected: `No errors found`

- [ ] **Step 4: Commit**

```bash
git add frontend/src/examples/2-tsx.tsx frontend/src/App.tsx
git commit -m "Add React Core #2 TSX example — TodoSummary"
```

---

### Task 4: Example 3 — Props (`TodoCard`)

**Files:**
- Create: `frontend/src/examples/3-props.tsx`
- Modify: `frontend/src/App.tsx`

**Interfaces:**
- Consumes: `Todo` from `frontend/src/types.ts`
- Produces: `TodoCard` component (`{ todo: Todo; onToggle: (id: string) => void; variant?: 'plain' | 'card'; children?: React.ReactNode } => JSX.Element`)

**Concept demonstrated:** Read-only data down (todo), callbacks up (onToggle), optional prop with default (variant), union type, `children`.

- [ ] **Step 1: Create the example component**

```tsx
// frontend/src/examples/3-props.tsx
import type { Todo } from '../types'

type TodoCardProps = {
  todo: Todo
  onToggle: (id: string) => void
  variant?: 'plain' | 'card'
  children?: React.ReactNode
}

export function TodoCard({ todo, onToggle, variant = 'card', children }: TodoCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: variant === 'card' ? '0.5rem 0.75rem' : 0,
        border: variant === 'card' ? '1px solid #e2e8f0' : 'none',
        borderRadius: '0.5rem',
      }}
    >
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none', flex: 1 }}>
        {todo.text}
      </span>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Wire into App.tsx**

Add import:
```tsx
import { TodoCard } from './examples/3-props'
```

Add after Example 2 section:
```tsx
<UiSubtitle>Example 3: Props — TodoCard</UiSubtitle>
<div style={{ display: 'grid', gap: '0.5rem' }}>
  {todos.map((todo) => (
    <TodoCard key={todo.id} todo={todo} onToggle={handleToggleTodo} variant="card">
      <UiButton tone="danger" type="button" onClick={() => handleDeleteTodo(todo.id)}>
        Delete
      </UiButton>
    </TodoCard>
  ))}
</div>
```

- [ ] **Step 3: Verify type-check passes**

Run: `cd frontend && npx tsc -p tsconfig.app.json --noEmit`
Expected: `No errors found`

- [ ] **Step 4: Commit**

```bash
git add frontend/src/examples/3-props.tsx frontend/src/App.tsx
git commit -m "Add React Core #3 Props example — TodoCard"
```

---

### Task 5: Example 4 — Rendering (`TodoProgress`)

**Files:**
- Create: `frontend/src/examples/4-rendering.tsx`
- Modify: `frontend/src/App.tsx`

**Interfaces:**
- Consumes: `Todo` from `frontend/src/types.ts`
- Produces: `TodoProgress` component (`{ todos: Todo[] } => JSX.Element`)

**Concept demonstrated:** Derived values computed during render (no extra state). `useRef` render counter showing when React re-renders. StrictMode doubles in dev.

- [ ] **Step 1: Create the example component**

```tsx
// frontend/src/examples/4-rendering.tsx
import { useRef } from 'react'
import type { Todo } from '../types'

export function TodoProgress({ todos }: { todos: Todo[] }) {
  const renders = useRef(0)
  renders.current += 1

  const done = todos.filter((t) => t.done).length
  const pct = todos.length === 0 ? 0 : Math.round((done / todos.length) * 100)

  return (
    <div>
      <p>{done}/{todos.length} done ({pct}%)</p>
      <div style={{ background: '#e2e8f0', borderRadius: 4, height: 8 }}>
        <div style={{ width: `${pct}%`, background: '#16a34a', height: 8, borderRadius: 4, transition: 'width 0.2s' }} />
      </div>
      <small style={{ color: '#94a3b8' }}>Rendered {renders.current}× (doubled in dev by StrictMode)</small>
    </div>
  )
}
```

- [ ] **Step 2: Wire into App.tsx**

Add import:
```tsx
import { TodoProgress } from './examples/4-rendering'
```

Add after Example 3 section:
```tsx
<UiSubtitle>Example 4: Rendering — TodoProgress</UiSubtitle>
<TodoProgress todos={todos} />
```

- [ ] **Step 3: Verify type-check passes**

Run: `cd frontend && npx tsc -p tsconfig.app.json --noEmit`
Expected: `No errors found`

- [ ] **Step 4: Commit**

```bash
git add frontend/src/examples/4-rendering.tsx frontend/src/App.tsx
git commit -m "Add React Core #4 Rendering example — TodoProgress"
```

---

### Task 6: Example 5 — Lists & Keys (`TodoChecklist`)

**Files:**
- Create: `frontend/src/examples/5-lists-and-keys.tsx`
- Modify: `frontend/src/App.tsx`

**Interfaces:**
- Consumes: `Todo` from `frontend/src/types.ts`
- Produces: `TodoChecklist` component (`{ todos: Todo[] } => JSX.Element`)

**Concept demonstrated:** `filter` then `map` with stable `key={todo.id}` (never index). Shows only open items.

- [ ] **Step 1: Create the example component**

```tsx
// frontend/src/examples/5-lists-and-keys.tsx
import type { Todo } from '../types'

export function TodoChecklist({ todos }: { todos: Todo[] }) {
  const open = todos.filter((t) => !t.done)

  if (open.length === 0) return <p style={{ color: '#16a34a' }}>All tasks completed!</p>

  return (
    <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
      {open.map((todo) => (
        <li key={todo.id} style={{ padding: '0.125rem 0' }}>{todo.text}</li>
      ))}
    </ol>
  )
}
```

- [ ] **Step 2: Wire into App.tsx**

Add import:
```tsx
import { TodoChecklist } from './examples/5-lists-and-keys'
```

Add after Example 4 section:
```tsx
<UiSubtitle>Example 5: Lists & Keys — TodoChecklist</UiSubtitle>
<TodoChecklist todos={todos} />
```

- [ ] **Step 3: Verify type-check passes**

Run: `cd frontend && npx tsc -p tsconfig.app.json --noEmit`
Expected: `No errors found`

- [ ] **Step 4: Commit**

```bash
git add frontend/src/examples/5-lists-and-keys.tsx frontend/src/App.tsx
git commit -m "Add React Core #5 Lists and Keys example — TodoChecklist"
```

---

### Task 7: Example 6 — Conditional Rendering (`TodoStatus`)

**Files:**
- Create: `frontend/src/examples/6-conditional-rendering.tsx`
- Modify: `frontend/src/App.tsx`

**Interfaces:**
- Consumes: `Todo` from `frontend/src/types.ts`
- Produces: `TodoStatus` component (`{ todos: Todo[] } => JSX.Element`)

**Concept demonstrated:** Early return (empty state), ternary (all done vs remaining), `&&` with `> 0` (avoids number trap).

- [ ] **Step 1: Create the example component**

```tsx
// frontend/src/examples/6-conditional-rendering.tsx
import type { Todo } from '../types'

export function TodoStatus({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) return <p>No tasks yet — add one above.</p>

  const done = todos.filter((t) => t.done).length

  return (
    <div>
      {done === todos.length ? (
        <strong style={{ color: '#16a34a' }}>Everything done!</strong>
      ) : (
        <span>{todos.length - done} task(s) remaining</span>
      )}
      {done > 0 && <p style={{ color: '#16a34a', margin: '0.25rem 0 0' }}>{done} completed</p>}
    </div>
  )
}
```

- [ ] **Step 2: Wire into App.tsx**

Add import:
```tsx
import { TodoStatus } from './examples/6-conditional-rendering'
```

Add after Example 5 section:
```tsx
<UiSubtitle>Example 6: Conditional Rendering — TodoStatus</UiSubtitle>
<TodoStatus todos={todos} />
```

- [ ] **Step 3: Verify type-check passes**

Run: `cd frontend && npx tsc -p tsconfig.app.json --noEmit`
Expected: `No errors found`

- [ ] **Step 4: Commit**

```bash
git add frontend/src/examples/6-conditional-rendering.tsx frontend/src/App.tsx
git commit -m "Add React Core #6 Conditional Rendering example — TodoStatus"
```

---

### Task 8: Example 7 — Events (`QuickAddForm`)

**Files:**
- Create: `frontend/src/examples/7-events.tsx`
- Modify: `frontend/src/App.tsx`

**Interfaces:**
- Consumes: nothing (self-contained form with internal state)
- Produces: `QuickAddForm` component (`{ onAdd: (text: string) => void } => JSX.Element`)

**Concept demonstrated:** Controlled input (`value` + typed `onChange`), `onSubmit` with `e.preventDefault()`, typed events (`React.ChangeEvent<HTMLInputElement>`, `React.FormEvent<HTMLFormElement>`), callback up ("events up").

- [ ] **Step 1: Create the example component**

```tsx
// frontend/src/examples/7-events.tsx
import { useState } from 'react'

export function QuickAddForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
      <input
        value={text}
        onChange={handleChange}
        placeholder="Quick add (events demo)"
        style={{ flex: 1, padding: '0.375rem 0.5rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0' }}
      />
      <button type="submit" style={{ padding: '0.375rem 0.75rem', borderRadius: '0.375rem', cursor: 'pointer' }}>
        Add
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Wire into App.tsx**

Add import:
```tsx
import { QuickAddForm } from './examples/7-events'
```

Add after Example 6 section:
```tsx
<UiSubtitle>Example 7: Events — QuickAddForm</UiSubtitle>
<QuickAddForm
  onAdd={(text) =>
    setTodos((prev) => [...prev, { id: Date.now().toString(), text, done: false }])
  }
/>
```

- [ ] **Step 3: Verify type-check passes**

Run: `cd frontend && npx tsc -p tsconfig.app.json --noEmit`
Expected: `No errors found`

- [ ] **Step 4: Visual check — full app test**

Run: `cd frontend && npm run dev`
Expected: All 7 example sections render below the main todo list. QuickAddForm adds real todos. Progress bar, checklist, and status update live as todos change.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/examples/7-events.tsx frontend/src/App.tsx
git commit -m "Add React Core #7 Events example — QuickAddForm"
```

---

### Task 9: Final verification and push

**Files:**
- No new files

- [ ] **Step 1: Full type-check**

Run: `cd frontend && npx tsc -p tsconfig.app.json --noEmit`
Expected: `No errors found`

- [ ] **Step 2: Lint check**

Run: `cd frontend && npx eslint .`
Expected: No errors (warnings OK)

- [ ] **Step 3: Build check**

Run: `cd frontend && npm run build`
Expected: Build succeeds

- [ ] **Step 4: Push branch**

```bash
git push -u origin sayef/40-learn-react-core-concepts-tsx
```

- [ ] **Step 5: Create PR**

```bash
gh pr create --repo sayef-reyadh/smart-todo \
  --base main \
  --title "Add React Core Concepts examples to Smart Todo app" \
  --body "Closes #40

## Summary
- Extracted shared Todo type to types.ts
- Added 7 example components (one per core concept) in frontend/src/examples/
- All wired live into App.tsx — visible when running the dev server

## Examples
1. Components — TodoItem
2. TSX — TodoSummary
3. Props — TodoCard
4. Rendering — TodoProgress
5. Lists & Keys — TodoChecklist
6. Conditional Rendering — TodoStatus
7. Events — QuickAddForm"
```
