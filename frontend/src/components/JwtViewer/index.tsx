/**
 * JwtViewer — shows the raw token, decoded header/payload, and the
 * Authorization header that will be sent on every API request.
 *
 * Teaching goal: make JWT visible so students can see exactly what
 * "Bearer token" means in practice.
 */
import type { AuthTokenResponse } from '../../services/api'

function decodeJwtPart(part: string): object {
  try {
    return JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return {}
  }
}

export function JwtViewer({ token: data }: { token: AuthTokenResponse }) {
  const parts = data.access_token.split('.')
  const header  = parts[0] ? decodeJwtPart(parts[0]) : {}
  const payload = parts[1] ? decodeJwtPart(parts[1]) : {}

  return (
    <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>

      {/* Raw token */}
      <Section title="Raw JWT (sent as Authorization header)">
        <code style={{ ...codeStyle, wordBreak: 'break-all', color: '#f8fafc', fontSize: '0.72rem' }}>
          <span style={{ color: '#f87171' }}>{parts[0]}</span>
          <span style={{ color: '#94a3b8' }}>.</span>
          <span style={{ color: '#34d399' }}>{parts[1]}</span>
          <span style={{ color: '#94a3b8' }}>.</span>
          <span style={{ color: '#60a5fa' }}>{parts[2]}</span>
        </code>
        <p style={{ margin: '0.4rem 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
          <span style={{ color: '#f87171' }}>■ header</span>
          {'  '}
          <span style={{ color: '#34d399' }}>■ payload</span>
          {'  '}
          <span style={{ color: '#60a5fa' }}>■ signature</span>
        </p>
      </Section>

      {/* Decoded header */}
      <Section title="Decoded Header (algorithm + token type)">
        <Json data={header} />
      </Section>

      {/* Decoded payload */}
      <Section title="Decoded Payload (claims — visible to anyone who has the token)">
        <Json data={payload} />
      </Section>

      {/* Authorization header */}
      <Section title="How it's sent on every API request">
        <code style={{ ...codeStyle, color: '#fde68a', fontSize: '0.8rem' }}>
          Authorization: Bearer {data.access_token.slice(0, 40)}…
        </code>
      </Section>

      {/* Expiry */}
      <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
        Token expires in <strong>{data.expires_in_minutes / 60} hours</strong>.
        After expiry the server returns <code>401 Unauthorized</code> and the user must log in again.
      </p>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ margin: '0 0 0.3rem', fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </p>
      {children}
    </div>
  )
}

function Json({ data }: { data: object }) {
  return (
    <pre style={{ ...codeStyle, color: '#a5f3fc', fontSize: '0.8rem', margin: 0 }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}

const codeStyle: React.CSSProperties = {
  background: '#1e293b',
  padding: '0.6rem 0.75rem',
  borderRadius: '0.375rem',
  display: 'block',
  overflowX: 'auto',
}
