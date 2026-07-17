from pydantic import BaseModel, Field
from datetime import datetime
import uuid


class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    name: str
    hashed_password: str          # bcrypt hash (salt embedded) of  password+pepper
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

    model_config = {"from_attributes": True}
