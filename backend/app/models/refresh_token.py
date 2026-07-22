from pydantic import BaseModel, Field
from datetime import datetime, timezone, timedelta
from typing import Optional
import uuid


class RefreshToken(BaseModel):
    # id is the opaque random value stored in the browser cookie (not a JWT).
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str

    # All tokens issued from the same login share a family_id.
    # On reuse detection, the entire family (= all sessions from that login) is revoked.
    # Optional for backwards compatibility with tokens created before this field existed.
    family_id: Optional[str] = None

    # Sliding expiry window — reset on each rotation.
    expires_at: str

    # Hard ceiling — never extended, forces re-login after 90 days.
    absolute_max: str

    # Set to True on logout, rotation, or detected reuse.
    revoked: bool = False

    created_at: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )

    # Unix timestamp — DynamoDB TTL auto-deletes expired rows.
    ttl: int

    @classmethod
    def create(cls, user_id: str, expire_days: int, absolute_max_days: int, family_id: Optional[str] = None) -> "RefreshToken":
        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(days=expire_days)
        absolute_max = now + timedelta(days=absolute_max_days)
        return cls(
            user_id=user_id,
            family_id=family_id or str(uuid.uuid4()),
            expires_at=expires_at.isoformat(),
            absolute_max=absolute_max.isoformat(),
            ttl=int(expires_at.timestamp()),
        )
