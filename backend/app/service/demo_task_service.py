"""
DemoTaskService — demonstrates what the SERVICE LAYER does in MVC:

  Controller  →  Service  →  Repository  →  Database

The SERVICE is responsible for:
  1. Business rules    — enforce domain constraints (e.g. HIGH priority needs a due_date)
  2. Validation        — guard input before it reaches the DB
  3. Orchestration     — combine multiple repo calls into one operation
  4. Transformation    — shape/sort/aggregate data before returning to the controller
  5. Abstraction       — controller never knows which DB is behind the repo interface
"""

from datetime import datetime
from typing import Dict, List, Optional
from ..model.demo_task import DemoTask, Priority
from ..repository.interfaces import TasksDemoRepositoryInterface

_PRIORITY_ORDER = {Priority.HIGH: 0, Priority.MEDIUM: 1, Priority.LOW: 2}


class DemoTaskService:
    def __init__(self, repo: TasksDemoRepositoryInterface):
        self.repo = repo

    # ── 1. Business rule: HIGH priority tasks must have a due_date ────────────
    def create(self, user_id: str, title: str, category: str, priority: str,
               due_date: Optional[str]) -> DemoTask:
        """Service-layer validation + business rule enforcement."""
        if not title.strip():
            raise ValueError("Title cannot be empty")

        # Business rule: HIGH priority tasks must have a deadline
        if priority == Priority.HIGH and not due_date:
            raise ValueError("HIGH priority tasks must have a due_date")

        task = DemoTask(
            user_id=user_id,
            created_at=datetime.utcnow().isoformat(),
            title=title.strip(),
            category=category,
            priority=priority,
            due_date=due_date,
        )
        return self.repo.create(task)

    # ── 2. Transformation: sort by priority order at service level ────────────
    def query_by_pk(self, user_id: str) -> List[DemoTask]:
        """Repo returns tasks in created_at order; service re-sorts by priority."""
        tasks = self.repo.query_by_pk(user_id)
        return sorted(tasks, key=lambda t: _PRIORITY_ORDER.get(t.priority, 99))

    # ── 3. Orchestration: combine LSI + date filter into one service method ───
    def get_overdue(self, user_id: str) -> List[DemoTask]:
        """Service orchestrates: fetch via LSI (sorted by due_date), then
        applies business logic (is the due_date in the past?) in Python.
        The repository has no concept of 'overdue' — that is domain knowledge."""
        now = datetime.utcnow().isoformat()
        tasks = self.repo.query_by_lsi_due_date(user_id)
        return [t for t in tasks if t.due_date and t.due_date < now]

    # ── 4. Aggregation: compute a summary across multiple repo calls ──────────
    def get_summary(self, user_id: str) -> Dict:
        """Service aggregates stats from one repo call — controller gets a
        ready-to-use dict without needing to know how it was computed."""
        tasks = self.repo.query_by_pk(user_id)
        total = len(tasks)
        return {
            "total":     total,
            "pending":   sum(1 for t in tasks if t.status == "PENDING"),
            "completed": sum(1 for t in tasks if t.status == "COMPLETED"),
            "high":      sum(1 for t in tasks if t.priority == Priority.HIGH),
            "overdue":   sum(1 for t in tasks if t.due_date and t.due_date < datetime.utcnow().isoformat()),
        }

    # ── Thin delegates (no extra logic needed here) ───────────────────────────
    def query_by_pk_sk_range(self, user_id: str, from_dt: str, to_dt: str) -> List[DemoTask]:
        return self.repo.query_by_pk_sk_range(user_id, from_dt, to_dt)

    def query_by_gsi(self, category: str, priority: str = "") -> List[DemoTask]:
        return self.repo.query_by_gsi(category, priority)

    def query_by_lsi_due_date(self, user_id: str) -> List[DemoTask]:
        return self.repo.query_by_lsi_due_date(user_id)

    def query_begins_with(self, user_id: str, prefix: str) -> List[DemoTask]:
        return self.repo.query_begins_with(user_id, prefix)

    def scan_contains(self, keyword: str) -> List[DemoTask]:
        return self.repo.scan_contains(keyword)

    def query_attribute_exists(self, user_id: str) -> List[DemoTask]:
        return self.repo.query_attribute_exists(user_id)

    def query_attribute_not_exists(self, user_id: str) -> List[DemoTask]:
        return self.repo.query_attribute_not_exists(user_id)

    def count(self) -> int:
        return self.repo.count()

    def seed(self) -> int:
        return self.repo.seed()

    def bulk_seed(self, count: int) -> int:
        return self.repo.bulk_seed(count)

