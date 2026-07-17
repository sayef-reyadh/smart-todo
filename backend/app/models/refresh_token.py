from pydantic import BaseModel, Field
from datetime import datetime, timezone, timedelta
import uuid


class RefreshToken(BaseModel):
    # id is the opaque token value stored in the browser cookie.
    # It's a random UUID — not a JWT — so it reveals nothing about the user.
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str

    # Sliding expiry — reset to +7 days on every successful refresh.
    expires_at: str

    # Hard limit — never extended, forces re-login after 90 days regardless.
    absolute_max: str

    # Set to True on logout or password change to immediately invalidate.
    revoked: bool = False

    created_at: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )

    # Unix timestamp (seconds) — DynamoDB TTL uses this to auto-delete expired rows.
    ttl: int

    @classmethod
    def create(cls, user_id: str, expire_days: int, absolute_max_days: int) -> "RefreshToken":
        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(days=expire_days)
        absolute_max = now + timedelta(days=absolute_max_days)
        return cls(
            user_id=user_id,
            expires_at=expires_at.isoformat(),
            absolute_max=absolute_max.isoformat(),
            ttl=int(expires_at.timestamp()),
        )
