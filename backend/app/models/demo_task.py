from enum import Enum
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid
from .task import Status


class Priority(str, Enum):
    HIGH   = "HIGH"
    MEDIUM = "MEDIUM"
    LOW    = "LOW"


class Category(str, Enum):
    WORK     = "WORK"
    PERSONAL = "PERSONAL"
    STUDY    = "STUDY"
    HEALTH   = "HEALTH"


class DemoTask(BaseModel):
    user_id:    str                     # PK  (DynamoDB partition key)
    created_at: str                     # SK  (DynamoDB sort key, ISO string)
    id:         str = Field(default_factory=lambda: str(uuid.uuid4()))
    title:      str
    status:     Status   = Status.PENDING
    category:   Category = Category.WORK
    priority:   Priority = Priority.MEDIUM
    due_date:   Optional[str] = None    # present on ~75 % of items (sparse attribute)

    model_config = {"from_attributes": True, "use_enum_values": True}
