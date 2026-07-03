from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class Status(str, Enum):
    PENDING = "PENDING"
    COMPLETED = "COMPLETED"

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1)
    description: Optional[str] = None
    due_date: Optional[datetime] = None

class TaskUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    due_date: Optional[datetime]
    status: Optional[Status]

class TaskResponse(BaseModel):
    id: str
    user_id: str
    title: str
    description: Optional[str]
    status: Status
    due_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
