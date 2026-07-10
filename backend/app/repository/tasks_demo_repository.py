import boto3
import random
import uuid
from boto3.dynamodb.conditions import Attr, Key
from datetime import datetime, timedelta
from typing import Any, Dict, List
from ..model.demo_task import DemoTask
from .interfaces import TasksDemoRepositoryInterface


def _build_resource(region: str):
    # boto3 credential chain: AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY env vars, or IAM role
    return boto3.resource("dynamodb", region_name=region)


class DemoRepository(TasksDemoRepositoryInterface):
    _USERS      = ["alice", "bob", "charlie", "diana", "eve",
                   "frank", "grace", "henry", "iris", "jack"]
    _CATEGORIES = ["WORK", "PERSONAL", "STUDY", "HEALTH"]
    _PRIORITIES = ["HIGH", "MEDIUM", "LOW"]
    _STATUSES   = ["PENDING", "PENDING", "PENDING", "COMPLETED"]
    _TITLES     = [
        "Review pull request", "Write unit tests", "Fix login bug",
        "Deploy to staging", "Update API docs", "Refactor auth module",
        "Setup CI pipeline", "Prepare sprint demo", "Code review session",
        "Submit project report", "Learn DynamoDB", "Build demo page",
        "Present to class", "Database migration", "Optimize query",
        "Design system meeting", "Write integration tests", "Release v2.0",
        "Patch security issue", "Monitor production logs",
    ]

    def __init__(self, region: str, table_name: str):
        self.table = _build_resource(region).Table(table_name)

    def create(self, task: DemoTask) -> DemoTask:
        self.table.put_item(Item=task.dict())
        return task

    def query_by_pk(self, user_id: str) -> List[DemoTask]:
        return [DemoTask(**i) for i in self.table.query(
            KeyConditionExpression=Key("user_id").eq(user_id)
        ).get("Items", [])]

    def query_by_pk_sk_range(self, user_id: str, from_dt: str, to_dt: str) -> List[DemoTask]:
        return [DemoTask(**i) for i in self.table.query(
            KeyConditionExpression=Key("user_id").eq(user_id)
            & Key("created_at").between(from_dt, to_dt)
        ).get("Items", [])]

    def query_by_gsi(self, category: str, priority: str = "") -> List[DemoTask]:
        expr = (Key("category").eq(category) & Key("priority").eq(priority)
                if priority else Key("category").eq(category))
        return [DemoTask(**i) for i in self.table.query(
            IndexName="category-priority-index",
            KeyConditionExpression=expr,
        ).get("Items", [])]

    def query_by_lsi_due_date(self, user_id: str) -> List[DemoTask]:
        return [DemoTask(**i) for i in self.table.query(
            IndexName="due_date-index",
            KeyConditionExpression=Key("user_id").eq(user_id),
        ).get("Items", [])]

    def query_begins_with(self, user_id: str, prefix: str) -> List[DemoTask]:
        """begins_with on SK (created_at). e.g. prefix='2026-07' -> July 2026 tasks."""
        return [DemoTask(**i) for i in self.table.query(
            KeyConditionExpression=Key("user_id").eq(user_id)
            & Key("created_at").begins_with(prefix)
        ).get("Items", [])]

    def scan_contains(self, keyword: str) -> List[DemoTask]:
        """FilterExpression: Attr('title').contains(keyword) — scans ALL partitions."""
        return [DemoTask(**i) for i in self.table.scan(
            FilterExpression=Attr("title").contains(keyword)
        ).get("Items", [])]

    def query_attribute_exists(self, user_id: str) -> List[DemoTask]:
        """FilterExpression: attribute_exists(due_date)."""
        return [DemoTask(**i) for i in self.table.query(
            KeyConditionExpression=Key("user_id").eq(user_id),
            FilterExpression=Attr("due_date").exists(),
        ).get("Items", [])]

    def query_attribute_not_exists(self, user_id: str) -> List[DemoTask]:
        """FilterExpression: attribute_not_exists(due_date) — sparse attribute demo."""
        return [DemoTask(**i) for i in self.table.query(
            KeyConditionExpression=Key("user_id").eq(user_id),
            FilterExpression=Attr("due_date").not_exists(),
        ).get("Items", [])]

    def count(self) -> int:
        return self.table.scan(Select="COUNT").get("Count", 0)

    def seed(self) -> int:
        now = datetime.utcnow()
        def _t(user, days_ago, title, status, category, priority, due_days=None):
            item = {
                "user_id": user,
                "created_at": (now - timedelta(days=days_ago)).isoformat(),
                "id": str(uuid.uuid4()),
                "title": title, "status": status,
                "category": category, "priority": priority,
            }
            if due_days is not None:
                item["due_date"] = (now + timedelta(days=due_days)).isoformat()
            return item
        items = [
            _t("alice", 5, "Submit project report",   "PENDING",   "WORK",  "HIGH",   2),
            _t("alice", 4, "Review pull requests",    "COMPLETED", "WORK",  "MEDIUM", -1),
            _t("alice", 3, "Write unit tests",        "PENDING",   "WORK",  "HIGH",   5),
            _t("alice", 1, "Deploy to staging",       "PENDING",   "WORK",  "LOW",    1),
            _t("bob",   6, "Update API docs",         "PENDING",   "WORK",  "MEDIUM", 3),
            _t("bob",   3, "Fix login bug",           "COMPLETED", "WORK",  "HIGH",   -2),
            _t("bob",   2, "Code review session",     "PENDING",   "WORK",  "LOW",    4),
            _t("frontend-user", 2, "Learn DynamoDB",  "PENDING",   "STUDY", "HIGH",   1),
            _t("frontend-user", 1, "Build demo page", "COMPLETED", "STUDY", "MEDIUM"),
            _t("frontend-user", 0, "Present to class","PENDING",   "STUDY", "HIGH",   7),
        ]
        with self.table.batch_writer() as bw:
            for item in items:
                bw.put_item(Item=item)
        return len(items)

    def bulk_seed(self, count: int = 1000) -> int:
        """batch_writer auto-chunks into 25-item requests. PAY_PER_REQUEST absorbs the spike."""
        now = datetime.utcnow()
        with self.table.batch_writer() as bw:
            for i in range(count):
                days_ago = random.randint(0, 90)
                item = {
                    "user_id":    random.choice(self._USERS),
                    "created_at": (now - timedelta(days=days_ago, seconds=i)).isoformat(),
                    "id":         str(uuid.uuid4()),
                    "title":      random.choice(self._TITLES),
                    "status":     random.choice(self._STATUSES),
                    "category":   random.choice(self._CATEGORIES),
                    "priority":   random.choice(self._PRIORITIES),
                }
                if random.random() > 0.25:
                    item["due_date"] = (now + timedelta(days=random.randint(-10, 30))).isoformat()
                bw.put_item(Item=item)
        return count
