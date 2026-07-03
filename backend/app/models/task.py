from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field
from typing import Optional
import uuid

class Status(str, Enum):
    PENDING = "PENDING"
    COMPLETED = "COMPLETED"

class Task(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    title: str
    description: Optional[str] = None
    status: Status = Status.PENDING
    due_date: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        use_enum_values = True
        orm_mode = True
