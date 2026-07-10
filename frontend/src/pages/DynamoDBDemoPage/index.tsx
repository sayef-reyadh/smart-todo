import { useState } from 'react'
import { apiService, type DemoQueryResult, type DemoItem } from '../../services/api'

// ── colour palette per pattern ────────────────────────────────────────────────
const COLOURS = {
  pk:    { bg: '#eff6ff', border: '#3b82f6', badge: '#3b82f6', label: 'PK' },
  pksk:  { bg: '#f5f3ff', border: '#7c3aed', badge: '#7c3aed', label: 'PK + SK' },
  gsi:   { bg: '#f0fdf4', border: '#16a34a', badge: '#16a34a', label: 'GSI' },
  lsi:   { bg: '#fff7ed', border: '#ea580c', badge: '#ea580c', label: 'LSI' },
}

// ── small helpers ─────────────────────────────────────────────────────────────
function Badge({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ background: color, color: 'white', borderRadius: '0.25rem', padding: '0.15rem 0.5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>
      {label}
    </span>
  )
}

function ResultTable({ items }: { items: DemoItem[] }) {
  if (items.length === 0) return <p style={{ color: '#94a3b8', margin: '0.5rem 0 0' }}>No items returned.</p>
  return (
    <div style={{ overflowX: 'auto', marginTop: '0.75rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
        <thead>
          <tr style={{ background: '#f1f5f9' }}>
            {['user_id', 'title', 'status', 'created_at', 'due_date'].map(col => (
              <th key={col} style={{ padding: '0.4rem 0.6rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item.id ?? i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '0.35rem 0.6rem' }}>{item.user_id}</td>
              <td style={{ padding: '0.35rem 0.6rem' }}>{item.title}</td>
              <td style={{ padding: '0.35rem 0.6rem' }}>
                <span style={{ color: item.status === 'COMPLETED' ? '#16a34a' : '#f59e0b', fontWeight: 600 }}>{item.status}</span>
              </td>
              <td style={{ padding: '0.35rem 0.6rem', whiteSpace: 'nowrap' }}>{item.created_at?.slice(0, 16).replace('T', ' ')}</td>
              <td style={{ padding: '0.35rem 0.6rem', whiteSpace: 'nowrap' }}>{item.due_date?.slice(0, 10) ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function QuerySection({
  colour, title, description, children, result, loading,
}: {
  colour: typeof COLOURS.pk
  title: string
  description: string
  children: React.ReactNode
  result: DemoQueryResult | null
  loading: boolean
}) {
  return (
    <div style={{ border: `1px solid ${colour.border}`, borderRadius: '0.5rem', background: colour.bg, padding: '1rem', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
        <Badge color={colour.badge} label={colour.label} />
        <strong style={{ fontSize: '0.95rem' }}>{title}</strong>
      </div>
      <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: '#475569' }}>{description}</p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>{children}</div>
      {result && (
        <div style={{ marginTop: '0.75rem' }}>
          <code style={{ display: 'block', background: '#1e293b', color: '#7dd3fc', padding: '0.5rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.75rem', overflowX: 'auto', whiteSpace: 'pre' }}>
            {result.dynamo_call}
          </code>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem', color: '#475569' }}>
            <strong>{result.count}</strong> item{result.count !== 1 ? 's' : ''} returned
          </p>
          <ResultTable items={result.items} />
        </div>
      )}
      {loading && <p style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.82rem' }}>Loading…</p>}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
      <label style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{label}</label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '0.35rem 0.6rem', border: '1px solid #cbd5e1', borderRadius: '0.375rem', fontSize: '0.82rem', width: '140px',
}

const btnStyle = (color: string): React.CSSProperties => ({
  padding: '0.38rem 0.9rem', background: color, color: 'white', border: 'none',
  borderRadius: '0.375rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem',
})

// ── Page ──────────────────────────────────────────────────────────────────────
export function DynamoDBDemoPage() {
  // seed / create
  const [seedMsg, setSeedMsg] = useState('')
  const [createTitle, setCreateTitle] = useState('')
  const [createDueDate, setCreateDueDate] = useState('')
  const [createMsg, setCreateMsg] = useState('')

  // PK
  const [pkUser, setPkUser] = useState('frontend-user')
  const [pkResult, setPkResult] = useState<DemoQueryResult | null>(null)
  const [pkLoading, setPkLoading] = useState(false)

  // PK+SK
  const [pkskUser, setPkskUser] = useState('alice')
  const [pkskFrom, setPkskFrom] = useState('')
  const [pkskTo, setPkskTo] = useState('')
  const [pkskResult, setPkskResult] = useState<DemoQueryResult | null>(null)
  const [pkskLoading, setPkskLoading] = useState(false)

  // GSI
  const [gsiStatus, setGsiStatus] = useState('PENDING')
  const [gsiResult, setGsiResult] = useState<DemoQueryResult | null>(null)
  const [gsiLoading, setGsiLoading] = useState(false)

  // LSI
  const [lsiUser, setLsiUser] = useState('alice')
  const [lsiResult, setLsiResult] = useState<DemoQueryResult | null>(null)
  const [lsiLoading, setLsiLoading] = useState(false)

  async function handleSeed() {
    setSeedMsg('Seeding…')
    const res = await apiService.seedDemo()
    setSeedMsg(`✓ Inserted ${res.seeded} tasks`)
  }

  async function handleCreate() {
    if (!createTitle.trim()) return
    await apiService.createDemoTask({ title: createTitle, due_date: createDueDate || undefined })
    setCreateTitle('')
    setCreateDueDate('')
    setCreateMsg('✓ Task created')
    setTimeout(() => setCreateMsg(''), 3000)
  }

  async function handlePK() {
    setPkLoading(true); setPkResult(null)
    const r = await apiService.queryPK(pkUser)
    setPkResult(r); setPkLoading(false)
  }

  async function handlePKSK() {
    setPkskLoading(true); setPkskResult(null)
    const r = await apiService.queryPKSKRange(pkskUser, pkskFrom, pkskTo)
    setPkskResult(r); setPkskLoading(false)
  }

  async function handleGSI() {
    setGsiLoading(true); setGsiResult(null)
    const r = await apiService.queryGSI(gsiStatus)
    setGsiResult(r); setGsiLoading(false)
  }

  async function handleLSI() {
    setLsiLoading(true); setLsiResult(null)
    const r = await apiService.queryLSI(lsiUser)
    setLsiResult(r); setLsiLoading(false)
  }

  return (
    <div style={{ maxWidth: 960, margin: '2rem auto', padding: '0 1rem 3rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>DynamoDB Key Patterns Demo</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Interactive showcase of the four DynamoDB access patterns using the <code>TASKS_DEMO</code> table.
        </p>
      </div>

      {/* Seed + Create */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem', padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
        <div>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>1. Load sample data</p>
          <button style={btnStyle('#0f172a')} onClick={handleSeed}>Seed 10 demo tasks</button>
          {seedMsg && <span style={{ marginLeft: '0.75rem', fontSize: '0.8rem', color: '#16a34a' }}>{seedMsg}</span>}
        </div>
        <div style={{ borderLeft: '1px solid #e2e8f0', paddingLeft: '1rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 600, fontSize: '0.85rem' }}>2. Or create your own task</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <Field label="Title">
              <input style={{ ...inputStyle, width: '200px' }} value={createTitle} onChange={e => setCreateTitle(e.target.value)} placeholder="Task title" />
            </Field>
            <Field label="Due date (optional)">
              <input style={inputStyle} type="date" value={createDueDate} onChange={e => setCreateDueDate(e.target.value)} />
            </Field>
            <button style={btnStyle('#3b82f6')} onClick={handleCreate}>Create</button>
            {createMsg && <span style={{ fontSize: '0.8rem', color: '#16a34a' }}>{createMsg}</span>}
          </div>
        </div>
      </div>

      {/* Table design callout */}
      <div style={{ background: '#1e293b', color: '#e2e8f0', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: '0.8rem' }}>
        <strong style={{ color: '#7dd3fc' }}>TASKS_DEMO table design</strong>
        <pre style={{ margin: '0.4rem 0 0', lineHeight: 1.6 }}>{`PK  = user_id     (partition key)   → groups tasks by user
SK  = created_at  (sort key)        → enables date-range queries per user
GSI = status-created_at-index       → query any status ACROSS all users
LSI = due_date-index                → user's tasks sorted by due_date (strongly consistent)`}</pre>
      </div>

      {/* Pattern 1: PK */}
      <QuerySection colour={COLOURS.pk} title="Simple Partition Key Query" result={pkResult} loading={pkLoading}
        description="Retrieves ALL tasks for one user. DynamoDB routes directly to that user's partition — no scan, O(1) lookup.">
        <Field label="user_id">
          <input style={inputStyle} value={pkUser} onChange={e => setPkUser(e.target.value)} placeholder="frontend-user" />
        </Field>
        <button style={btnStyle(COLOURS.pk.badge)} onClick={handlePK}>Run Query</button>
      </QuerySection>

      {/* Pattern 2: PK + SK range */}
      <QuerySection colour={COLOURS.pksk} title="Composite Key Range Query (PK + SK)" result={pkskResult} loading={pkskLoading}
        description="Reads only the date-range slice within one user's partition. Perfect for 'show me tasks from last week'.">
        <Field label="user_id">
          <input style={inputStyle} value={pkskUser} onChange={e => setPkskUser(e.target.value)} placeholder="alice" />
        </Field>
        <Field label="from (leave blank = 7 days ago)">
          <input style={{ ...inputStyle, width: '160px' }} type="datetime-local" value={pkskFrom} onChange={e => setPkskFrom(e.target.value)} />
        </Field>
        <Field label="to (leave blank = now)">
          <input style={{ ...inputStyle, width: '160px' }} type="datetime-local" value={pkskTo} onChange={e => setPkskTo(e.target.value)} />
        </Field>
        <button style={btnStyle(COLOURS.pksk.badge)} onClick={handlePKSK}>Run Query</button>
      </QuerySection>

      {/* Pattern 3: GSI */}
      <QuerySection colour={COLOURS.gsi} title="Global Secondary Index (GSI) Query" result={gsiResult} loading={gsiLoading}
        description="Queries status-created_at-index — spans ALL user partitions. An admin dashboard use-case. Data is eventually consistent.">
        <Field label="status">
          <select style={inputStyle} value={gsiStatus} onChange={e => setGsiStatus(e.target.value)}>
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </Field>
        <button style={btnStyle(COLOURS.gsi.badge)} onClick={handleGSI}>Run Query</button>
      </QuerySection>

      {/* Pattern 4: LSI */}
      <QuerySection colour={COLOURS.lsi} title="Local Secondary Index (LSI) Query" result={lsiResult} loading={lsiLoading}
        description="Queries due_date-index — same partition as base table (strongly consistent). Results are sorted by due_date. Only items WITH a due_date appear. LSI cannot be added after table creation.">
        <Field label="user_id">
          <input style={inputStyle} value={lsiUser} onChange={e => setLsiUser(e.target.value)} placeholder="alice" />
        </Field>
        <button style={btnStyle(COLOURS.lsi.badge)} onClick={handleLSI}>Run Query</button>
      </QuerySection>

    </div>
  )
}
