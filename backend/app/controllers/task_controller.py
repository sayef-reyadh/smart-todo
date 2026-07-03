from fastapi import APIRouter, Depends, Header, HTTPException, status
from typing import Optional, List
from ..schemas.task import TaskCreate, TaskUpdate, TaskResponse
from ..repositories.json_repository import JSONTaskRepository
from ..services.task_service import TaskService
from ..core.config import settings

router = APIRouter()

# simple dependency to provide user id (placeholder for auth)
def get_current_user(x_user_id: Optional[str] = Header(None)) -> str:
    return x_user_id or "anonymous"

# instantiate repository and service (module-level simple DI)
_repo = JSONTaskRepository(settings.TASKS_FILE)
_service = TaskService(_repo)

@router.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate, user_id: str = Depends(get_current_user)):
    if not payload.title:
        raise HTTPException(status_code=400, detail="title required")
    task = _service.create_task(user_id=user_id, title=payload.title, description=payload.description, due_date=payload.due_date)
    return TaskResponse.from_orm(task)

@router.get("/tasks", response_model=List[TaskResponse])
def list_tasks(user_id: str = Depends(get_current_user)):
    tasks = _service.list_tasks(user_id)
    return [TaskResponse.from_orm(t) for t in tasks]

@router.patch("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: str, payload: TaskUpdate, user_id: str = Depends(get_current_user)):
    patch = {k: v for k, v in payload.dict(exclude_unset=True).items()}
    try:
        updated = _service.update_task(task_id, patch, user_id)
    except PermissionError:
        raise HTTPException(status_code=403, detail="forbidden")
    if not updated:
        raise HTTPException(status_code=404, detail="task not found")
    return TaskResponse.from_orm(updated)

@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: str, user_id: str = Depends(get_current_user)):
    try:
        ok = _service.delete_task(task_id, user_id)
    except PermissionError:
        raise HTTPException(status_code=403, detail="forbidden")
    if not ok:
        raise HTTPException(status_code=404, detail="task not found")
    return None

