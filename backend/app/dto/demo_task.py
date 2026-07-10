from pydantic import BaseModel
from typing import Optional
from ..model.demo_task import Category, Priority


class DemoTaskCreate(BaseModel):
    title:    str
    category: Category = Category.WORK
    priority: Priority = Priority.MEDIUM
    due_date: Optional[str] = None


class DemoTaskResponse(BaseModel):
    user_id:    str
    created_at: str
    id:         str
    title:      str
    status:     str
    category:   str
    priority:   str
    due_date:   Optional[str] = None
