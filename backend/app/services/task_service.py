from datetime import datetime
from typing import List, Optional
from ..models.task import Task, Status
from ..repositories.json_repository import JSONTaskRepository

class TaskService:
    def __init__(self, repo: JSONTaskRepository):
        self.repo = repo

    def list_tasks(self, user_id: str) -> List[Task]:
        return sorted(self.repo.list_by_user(user_id), key=lambda t: (t.created_at), reverse=True)

    def create_task(self, user_id: str, title: str, description: Optional[str]=None, due_date: Optional[datetime]=None) -> Task:
        task = Task(user_id=user_id, title=title, description=description, due_date=due_date)
        return self.repo.create(task)

    def get_task(self, task_id: str) -> Optional[Task]:
        return self.repo.get(task_id)

    def update_task(self, task_id: str, patch: dict, user_id: str) -> Optional[Task]:
        task = self.repo.get(task_id)
        if not task:
            return None
        if task.user_id != user_id:
            raise PermissionError("not owner")
        patch["updated_at"] = datetime.utcnow()
        return self.repo.update(task_id, patch)

    def delete_task(self, task_id: str, user_id: str) -> bool:
        task = self.repo.get(task_id)
        if not task:
            return False
        if task.user_id != user_id:
            raise PermissionError("not owner")
        return self.repo.delete(task_id)

