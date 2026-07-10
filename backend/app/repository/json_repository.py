import json
from pathlib import Path
from threading import Lock
from typing import List, Optional
from ..model.task import Task

class JSONTaskRepository:
    def __init__(self, path: Path):
        self.path = Path(path)
        self.lock = Lock()
        self.path.parent.mkdir(parents=True, exist_ok=True)
        if not self.path.exists():
            self.path.write_text("[]", encoding="utf-8")

    def _read_all(self) -> List[dict]:
        with self.lock:
            with self.path.open("r", encoding="utf-8") as f:
                return json.load(f)

    def _write_all(self, data: List[dict]):
        with self.lock:
            with self.path.open("w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2, default=str)

    def list_by_user(self, user_id: str) -> List[Task]:
        items = self._read_all()
        return [Task(**i) for i in items if i.get("user_id") == user_id]

    def get(self, task_id: str) -> Optional[Task]:
        items = self._read_all()
        for i in items:
            if i.get("id") == task_id:
                return Task(**i)
        return None

    def create(self, task: Task) -> Task:
        items = self._read_all()
        items.append(task.dict())
        self._write_all(items)
        return task

    def update(self, task_id: str, patch: dict) -> Optional[Task]:
        items = self._read_all()
        for idx, i in enumerate(items):
            if i.get("id") == task_id:
                i.update(patch)
                i["updated_at"] = patch.get("updated_at") or i.get("updated_at")
                items[idx] = i
                self._write_all(items)
                return Task(**i)
        return None

    def delete(self, task_id: str) -> bool:
        items = self._read_all()
        new = [i for i in items if i.get("id") != task_id]
        changed = len(new) != len(items)
        if changed:
            self._write_all(new)
        return changed
