from abc import ABC, abstractmethod
from typing import List, Optional
from ..model.task import Task
from ..model.demo_task import DemoTask


class TaskRepositoryInterface(ABC):

    @abstractmethod
    def list_by_user(self, user_id: str) -> List[Task]: ...

    @abstractmethod
    def get(self, task_id: str) -> Optional[Task]: ...

    @abstractmethod
    def create(self, task: Task) -> Task: ...

    @abstractmethod
    def update(self, task_id: str, patch: dict) -> Optional[Task]: ...

    @abstractmethod
    def delete(self, task_id: str) -> bool: ...


class TasksDemoRepositoryInterface(ABC):

    @abstractmethod
    def create(self, task: DemoTask) -> DemoTask: ...

    @abstractmethod
    def query_by_pk(self, user_id: str) -> List[DemoTask]: ...

    @abstractmethod
    def query_by_pk_sk_range(self, user_id: str, from_dt: str, to_dt: str) -> List[DemoTask]: ...

    @abstractmethod
    def query_by_gsi(self, category: str, priority: str) -> List[DemoTask]: ...

    @abstractmethod
    def query_by_lsi_due_date(self, user_id: str) -> List[DemoTask]: ...

    @abstractmethod
    def query_begins_with(self, user_id: str, prefix: str) -> List[DemoTask]: ...

    @abstractmethod
    def scan_contains(self, keyword: str) -> List[DemoTask]: ...

    @abstractmethod
    def query_attribute_exists(self, user_id: str) -> List[DemoTask]: ...

    @abstractmethod
    def query_attribute_not_exists(self, user_id: str) -> List[DemoTask]: ...

    @abstractmethod
    def count(self) -> int: ...

    @abstractmethod
    def seed(self) -> int: ...

    @abstractmethod
    def bulk_seed(self, count: int) -> int: ...
