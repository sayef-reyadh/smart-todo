import { useState } from 'react'
import { apiService, type DemoQueryResult, type DemoItem, type DemoSummary } from '../../services/api'

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
            {['user_id', 'title', 'category', 'priority', 'status', 'created_at', 'due_date'].map(col => (
              <th key={col} style={{ padding: '0.4rem 0.6rem', textAlign: 'left', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item.id ?? i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '0.35rem 0.6rem' }}>{item.user_id}</td>
              <td style={{ padding: '0.35rem 0.6rem' }}>{item.title}</td>
              <td style={{ padding: '0.35rem 0.6rem' }}>{item.category}</td>
              <td style={{ padding: '0.35rem 0.6rem' }}>
                <span style={{ color: item.priority === 'HIGH' ? '#ef4444' : item.priority === 'MEDIUM' ? '#f59e0b' : '#94a3b8', fontWeight: 600 }}>{item.priority}</span>
              </td>
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
  const [gsiCategory, setGsiCategory] = useState('WORK')
  const [gsiPriority, setGsiPriority] = useState('')
  const [gsiResult, setGsiResult] = useState<DemoQueryResult | null>(null)
  const [gsiLoading, setGsiLoading] = useState(false)

  // LSI
  const [lsiUser, setLsiUser] = useState('alice')
  const [lsiResult, setLsiResult] = useState<DemoQueryResult | null>(null)
  const [lsiLoading, setLsiLoading] = useState(false)

  // Bulk seed
  const [bulkCount, setBulkCount] = useState(1000)
  const [bulkMsg, setBulkMsg] = useState('')
  const [totalCount, setTotalCount] = useState<number | null>(null)

  // begins_with
  const [bwUser, setBwUser] = useState('alice')
  const [bwPrefix, setBwPrefix] = useState('2026-07')
  const [bwResult, setBwResult] = useState<DemoQueryResult | null>(null)
  const [bwLoading, setBwLoading] = useState(false)

  // contains
  const [containsKw, setContainsKw] = useState('bug')
  const [containsResult, setContainsResult] = useState<DemoQueryResult | null>(null)
  const [containsLoading, setContainsLoading] = useState(false)

  // attribute_exists
  const [attrUser, setAttrUser] = useState('frontend-user')
  const [attrMustExist, setAttrMustExist] = useState(true)
  const [attrResult, setAttrResult] = useState<DemoQueryResult | null>(null)
  const [attrLoading, setAttrLoading] = useState(false)

  // Service-layer demos
  const [svcUser, setSvcUser] = useState('alice')
  const [overdueItems, setOverdueItems] = useState<DemoItem[] | null>(null)
  const [overdueLoading, setOverdueLoading] = useState(false)
  const [summary, setSummary] = useState<DemoSummary | null>(null)
  const [summaryLoading, setSummaryLoading] = useState(false)

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
    const r = await apiService.queryGSI(gsiCategory, gsiPriority)
    setGsiResult(r); setGsiLoading(false)
  }

  async function handleLSI() {
    setLsiLoading(true); setLsiResult(null)
    const r = await apiService.queryLSI(lsiUser)
    setLsiResult(r); setLsiLoading(false)
  }

  async function handleBulkSeed() {
    setBulkMsg(`Inserting ${bulkCount} items…`)
    const r = await apiService.bulkSeed(bulkCount)
    setTotalCount(r.total_in_table)
    setBulkMsg(`✓ Inserted ${r.inserted} items — table now has ${r.total_in_table} total`)
  }

  async function handleCount() {
    const r = await apiService.getCount()
    setTotalCount(r.total)
  }

  async function handleBeginsWith() {
    setBwLoading(true); setBwResult(null)
    const r = await apiService.queryBeginsWith(bwUser, bwPrefix)
    setBwResult(r); setBwLoading(false)
  }

  async function handleContains() {
    setContainsLoading(true); setContainsResult(null)
    const r = await apiService.queryContains(containsKw)
    setContainsResult(r); setContainsLoading(false)
  }

  async function handleAttributeExists() {
    setAttrLoading(true); setAttrResult(null)
    const r = await apiService.queryAttributeExists(attrUser, attrMustExist)
    setAttrResult(r); setAttrLoading(false)
  }

  async function handleOverdue() {
    setOverdueLoading(true); setOverdueItems(null)
    const r = await apiService.getOverdue(svcUser)
    setOverdueItems(r.items); setOverdueLoading(false)
  }

  async function handleSummary() {
    setSummaryLoading(true); setSummary(null)
    const r = await apiService.getSummary(svcUser)
    setSummary(r); setSummaryLoading(false)
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
            <Field label="Category">
              <select style={inputStyle} value={createDueDate} onChange={e => setCreateDueDate(e.target.value)}>
                {['WORK','PERSONAL','STUDY','HEALTH'].map(c => <option key={c}>{c}</option>)}
              </select>
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
SK  = created_at  (sort key, ISO)   → begins_with / between / range queries
GSI = category-priority-index       → cross-partition: all HIGH WORK tasks
LSI = due_date-index                → user tasks sorted by deadline (strongly consistent)
BillingMode = PAY_PER_REQUEST       → auto-scales on demand, zero capacity config`}</pre>
      </div>

      {/* Pattern 1: PK */}
      <QuerySection colour={COLOURS.pk} title="Simple Partition Key Query" result={pkResult} loading={pkLoading}
        description="Retrieves ALL tasks for one user. DynamoDB routes directly to that user's partition — no scan, O(1) lookup.">
        <Field label="user_id  ← PK (Partition Key)">
          <input style={inputStyle} value={pkUser} onChange={e => setPkUser(e.target.value)} placeholder="frontend-user" />
        </Field>
        <button style={btnStyle(COLOURS.pk.badge)} onClick={handlePK}>Run Query</button>
      </QuerySection>

      {/* Pattern 2: PK + SK range */}
      <QuerySection colour={COLOURS.pksk} title="Composite Key Range Query (PK + SK)" result={pkskResult} loading={pkskLoading}
        description="Reads only the date-range slice within one user's partition. Perfect for 'show me tasks from last week'.">
        <Field label="user_id  ← PK (Partition Key)">
          <input style={inputStyle} value={pkskUser} onChange={e => setPkskUser(e.target.value)} placeholder="alice" />
        </Field>
        <Field label="from  ← SK (Sort Key) range start">
          <input style={{ ...inputStyle, width: '160px' }} type="datetime-local" value={pkskFrom} onChange={e => setPkskFrom(e.target.value)} />
        </Field>
        <Field label="to  ← SK (Sort Key) range end">
          <input style={{ ...inputStyle, width: '160px' }} type="datetime-local" value={pkskTo} onChange={e => setPkskTo(e.target.value)} />
        </Field>
        <button style={btnStyle(COLOURS.pksk.badge)} onClick={handlePKSK}>Run Query</button>
      </QuerySection>

      {/* Pattern 3: GSI */}
      <QuerySection colour={COLOURS.gsi} title="Global Secondary Index (GSI) Query" result={gsiResult} loading={gsiLoading}
        description="Queries category-priority-index — spans ALL user partitions. An admin use-case: 'all HIGH priority WORK tasks'. Eventually consistent.">
        <Field label="category  ← GSI Partition Key">
          <select style={inputStyle} value={gsiCategory} onChange={e => setGsiCategory(e.target.value)}>
            {['WORK','PERSONAL','STUDY','HEALTH'].map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="priority  ← GSI Sort Key (optional)">
          <select style={inputStyle} value={gsiPriority} onChange={e => setGsiPriority(e.target.value)}>
            <option value="">Any</option>
            {['HIGH','MEDIUM','LOW'].map(p => <option key={p}>{p}</option>)}
          </select>
        </Field>
        <button style={btnStyle(COLOURS.gsi.badge)} onClick={handleGSI}>Run Query</button>
      </QuerySection>

      {/* Pattern 4: LSI */}
      <QuerySection colour={COLOURS.lsi} title="Local Secondary Index (LSI) Query" result={lsiResult} loading={lsiLoading}
        description="Queries due_date-index — same partition as base table (strongly consistent). Results are sorted by due_date. Only items WITH a due_date appear. LSI cannot be added after table creation.">
        <Field label="user_id  ← PK (same Partition Key as base table)">
          <input style={inputStyle} value={lsiUser} onChange={e => setLsiUser(e.target.value)} placeholder="alice" />
        </Field>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#92400e' }}>Results sorted by <strong>due_date</strong> (LSI Sort Key) instead of created_at</p>
        <button style={btnStyle(COLOURS.lsi.badge)} onClick={handleLSI}>Run Query</button>
      </QuerySection>

      {/* Divider */}
      <div style={{ borderTop: '2px solid #e2e8f0', margin: '1.5rem 0', paddingTop: '1rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.1rem' }}>Scale & Auto-Capacity</h2>
      </div>

      {/* Bulk Seed */}
      <div style={{ border: '1px solid #0f172a', borderRadius: '0.5rem', background: '#f8fafc', padding: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <Badge color="#0f172a" label="PAY_PER_REQUEST" />
          <strong>Bulk Seed — Auto-Scale Demo</strong>
        </div>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: '#475569' }}>
          DynamoDB <code>BillingMode=PAY_PER_REQUEST</code> scales throughput instantly with no provisioned capacity.
          batch_writer automatically chunks into 25-item requests — no manual batching needed.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <Field label="Items to insert">
            <input style={{ ...inputStyle, width: '100px' }} type="number" min={1} max={5000}
              value={bulkCount} onChange={e => setBulkCount(Number(e.target.value))} />
          </Field>
          <button style={btnStyle('#0f172a')} onClick={handleBulkSeed}>Bulk Insert</button>
          <button style={{ ...btnStyle('#64748b') }} onClick={handleCount}>Refresh Count</button>
        </div>
        {bulkMsg && <p style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#16a34a' }}>{bulkMsg}</p>}
        {totalCount !== null && !bulkMsg &&
          <p style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#475569' }}>Table total: <strong>{totalCount}</strong> items</p>}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '2px solid #e2e8f0', margin: '1.5rem 0', paddingTop: '1rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.1rem' }}>String &amp; Condition Functions</h2>
      </div>

      {/* begins_with */}
      <QuerySection colour={{ bg: '#fdf4ff', border: '#a855f7', badge: '#a855f7', label: 'begins_with' }}
        title="begins_with on Sort Key" result={bwResult} loading={bwLoading}
        description="KeyConditionExpression: Key('created_at').begins_with(prefix). Index-aware — DynamoDB uses the sort key B-tree, no scan. e.g. '2026-07' matches all July 2026 tasks.">
        <Field label="user_id  ← PK">
          <input style={inputStyle} value={bwUser} onChange={e => setBwUser(e.target.value)} />
        </Field>
        <Field label="SK prefix  ← begins_with(created_at, ...)">
          <input style={{ ...inputStyle, width: '120px' }} value={bwPrefix} onChange={e => setBwPrefix(e.target.value)} placeholder="2026-07" />
        </Field>
        <button style={btnStyle('#a855f7')} onClick={handleBeginsWith}>Run Query</button>
      </QuerySection>

      {/* contains */}
      <QuerySection colour={{ bg: '#fff1f2', border: '#f43f5e', badge: '#f43f5e', label: 'contains' }}
        title="contains (FilterExpression on title)" result={containsResult} loading={containsLoading}
        description="Attr('title').contains(keyword) — applied as a FilterExpression after reading items. Scans the entire table. Powerful but costly at scale — consider a search service (OpenSearch) for production full-text search.">
        <Field label="keyword">
          <input style={inputStyle} value={containsKw} onChange={e => setContainsKw(e.target.value)} placeholder="bug" />
        </Field>
        <button style={btnStyle('#f43f5e')} onClick={handleContains}>Run Scan</button>
      </QuerySection>

      {/* attribute_exists */}
      <QuerySection colour={{ bg: '#f0fdfa', border: '#0d9488', badge: '#0d9488', label: 'attr_exists' }}
        title="attribute_exists / not_exists (FilterExpression)" result={attrResult} loading={attrLoading}
        description="DynamoDB allows sparse attributes — items can omit fields entirely. attribute_exists/not_exists let you query on presence. Items without due_date simply don't have that key at all.">
        <Field label="user_id">
          <input style={inputStyle} value={attrUser} onChange={e => setAttrUser(e.target.value)} />
        </Field>
        <Field label="filter">
          <select style={inputStyle} value={String(attrMustExist)} onChange={e => setAttrMustExist(e.target.value === 'true')}>
            <option value="true">due_date exists</option>
            <option value="false">due_date NOT exists</option>
          </select>
        </Field>
        <button style={btnStyle('#0d9488')} onClick={handleAttributeExists}>Run Query</button>
      </QuerySection>

      {/* Divider */}
      <div style={{ borderTop: '2px solid #e2e8f0', margin: '1.5rem 0', paddingTop: '1rem' }}>
        <h2 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem' }}>Service Layer — Business Logic</h2>
        <p style={{ margin: '0 0 1rem', fontSize: '0.82rem', color: '#64748b' }}>
          These endpoints are handled by <code>DemoTaskService</code>, not the repository directly.
          The controller calls the service; the service applies business rules, orchestration, and aggregation.
        </p>
      </div>

      {/* Shared user input */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'flex-end' }}>
        <Field label="user_id (shared for both sections below)">
          <input style={inputStyle} value={svcUser} onChange={e => setSvcUser(e.target.value)} placeholder="alice" />
        </Field>
      </div>

      {/* Overdue — orchestration */}
      <div style={{ border: '1px solid #7c3aed', borderRadius: '0.5rem', background: '#f5f3ff', padding: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
          <Badge color="#7c3aed" label="Orchestration" />
          <strong>get_overdue(user_id)</strong>
        </div>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: '#475569' }}>
          Service calls LSI (sorted by due_date), then filters where <code>due_date &lt; now</code> in Python.
          The repository has no concept of "overdue" — that is <strong>domain/business logic</strong> that belongs in the service.
        </p>
        <button style={btnStyle('#7c3aed')} onClick={handleOverdue}>Get Overdue Tasks</button>
        {overdueLoading && <p style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.82rem' }}>Loading…</p>}
        {overdueItems !== null && (
          <div style={{ marginTop: '0.5rem' }}>
            <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', color: '#475569' }}><strong>{overdueItems.length}</strong> overdue tasks</p>
            <ResultTable items={overdueItems} />
          </div>
        )}
      </div>

      {/* Summary — aggregation */}
      <div style={{ border: '1px solid #0891b2', borderRadius: '0.5rem', background: '#ecfeff', padding: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
          <Badge color="#0891b2" label="Aggregation" />
          <strong>get_summary(user_id)</strong>
        </div>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: '#475569' }}>
          Service makes one repo call, then computes counts in Python. The controller receives a clean summary dict —
          it never needs to know how it was computed.
        </p>
        <button style={btnStyle('#0891b2')} onClick={handleSummary}>Get Summary</button>
        {summaryLoading && <p style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.82rem' }}>Loading…</p>}
        {summary && (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            {[
              { label: 'Total',     value: summary.total,     color: '#0f172a' },
              { label: 'Pending',   value: summary.pending,   color: '#f59e0b' },
              { label: 'Completed', value: summary.completed, color: '#16a34a' },
              { label: 'High Pri',  value: summary.high,      color: '#ef4444' },
              { label: 'Overdue',   value: summary.overdue,   color: '#dc2626' },
            ].map(s => (
              <div key={s.label} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.375rem', padding: '0.5rem 1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
