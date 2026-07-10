from datetime import datetime
from typing import List, Optional
from ..model.demo_task import DemoTask
from ..repository.interfaces import TasksDemoRepositoryInterface


class DemoTaskService:
    def __init__(self, repo: TasksDemoRepositoryInterface):
        self.repo = repo

    def create(self, user_id: str, title: str, category: str, priority: str, due_date: Optional[str]) -> DemoTask:
        task = DemoTask(
            user_id=user_id,
            created_at=datetime.utcnow().isoformat(),
            title=title,
            category=category,
            priority=priority,
            due_date=due_date,
        )
        return self.repo.create(task)

    def query_by_pk(self, user_id: str) -> List[DemoTask]:
        return self.repo.query_by_pk(user_id)

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
