import boto3
import uuid
from boto3.dynamodb.conditions import Key
from datetime import datetime, timedelta
from typing import Any, Dict, List


def _build_resource(region: str):
    # boto3 credential chain: AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY env vars, or IAM role
    return boto3.resource("dynamodb", region_name=region)


def create_demo_table_if_not_exists(region: str, table_name: str) -> None:
    """
    TASKS_DEMO table design (teaching all 4 key patterns):
      PK  = user_id    (partition key)   → groups tasks by user
      SK  = created_at (sort key)        → enables date-range queries within a user
      GSI = status-created_at-index      → query any status ACROSS all users
      LSI = due_date-index               → query a user's tasks sorted by due_date
    """
    dynamodb = _build_resource(region)
    existing = [t.name for t in dynamodb.tables.all()]
    if table_name in existing:
        return

    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[
            {"AttributeName": "user_id",    "KeyType": "HASH"},
            {"AttributeName": "created_at", "KeyType": "RANGE"},
        ],
        AttributeDefinitions=[
            {"AttributeName": "user_id",    "AttributeType": "S"},
            {"AttributeName": "created_at", "AttributeType": "S"},
            {"AttributeName": "status",     "AttributeType": "S"},
            {"AttributeName": "due_date",   "AttributeType": "S"},
        ],
        BillingMode="PAY_PER_REQUEST",
        GlobalSecondaryIndexes=[
            {
                "IndexName": "status-created_at-index",
                "KeySchema": [
                    {"AttributeName": "status",     "KeyType": "HASH"},
                    {"AttributeName": "created_at", "KeyType": "RANGE"},
                ],
                "Projection": {"ProjectionType": "ALL"},
            }
        ],
        LocalSecondaryIndexes=[
            {
                "IndexName": "due_date-index",
                "KeySchema": [
                    {"AttributeName": "user_id",  "KeyType": "HASH"},
                    {"AttributeName": "due_date", "KeyType": "RANGE"},
                ],
                "Projection": {"ProjectionType": "ALL"},
            }
        ],
    ).wait_until_exists()


class DemoRepository:
    def __init__(self, region: str, table_name: str):
        self.table = _build_resource(region).Table(table_name)

    # ── Create ────────────────────────────────────────────────────────────────

    def create(self, item: Dict[str, Any]) -> Dict[str, Any]:
        self.table.put_item(Item=item)
        return item

    # ── Pattern 1: Simple Partition Key ──────────────────────────────────────

    def query_by_pk(self, user_id: str) -> List[Dict]:
        """GetItem / Query using ONLY the partition key (user_id).
        Returns every task belonging to this user, in created_at order."""
        response = self.table.query(
            KeyConditionExpression=Key("user_id").eq(user_id)
        )
        return response.get("Items", [])

    # ── Pattern 2: Composite PK + SK range ───────────────────────────────────

    def query_by_pk_sk_range(self, user_id: str, from_dt: str, to_dt: str) -> List[Dict]:
        """Composite key range query: PK=user_id AND SK BETWEEN from_dt AND to_dt.
        DynamoDB only reads the matching partition slice — no full-table scan."""
        response = self.table.query(
            KeyConditionExpression=Key("user_id").eq(user_id)
            & Key("created_at").between(from_dt, to_dt)
        )
        return response.get("Items", [])

    # ── Pattern 3: Global Secondary Index (GSI) ───────────────────────────────

    def query_by_gsi_status(self, status: str) -> List[Dict]:
        """GSI query on status-created_at-index.
        Spans ALL user partitions — not possible with base table keys alone."""
        response = self.table.query(
            IndexName="status-created_at-index",
            KeyConditionExpression=Key("status").eq(status),
        )
        return response.get("Items", [])

    # ── Pattern 4: Local Secondary Index (LSI) ────────────────────────────────

    def query_by_lsi_due_date(self, user_id: str) -> List[Dict]:
        """LSI query on due_date-index (same partition as base table).
        Returns this user's tasks sorted by due_date instead of created_at.
        Only items that have a due_date attribute appear in this index."""
        response = self.table.query(
            IndexName="due_date-index",
            KeyConditionExpression=Key("user_id").eq(user_id),
        )
        return response.get("Items", [])

    # ── Seed ──────────────────────────────────────────────────────────────────

    def seed(self) -> int:
        """Insert sample tasks spread across 3 users with varied dates/statuses."""
        now = datetime.utcnow()

        def _task(user, days_ago, title, status, due_days):
            return {
                "user_id":    user,
                "created_at": (now - timedelta(days=days_ago)).isoformat(),
                "id":         str(uuid.uuid4()),
                "title":      title,
                "status":     status,
                "due_date":   (now + timedelta(days=due_days)).isoformat(),
            }

        items = [
            _task("alice", 5, "Submit project report",   "PENDING",   2),
            _task("alice", 4, "Review pull requests",    "COMPLETED", -1),
            _task("alice", 3, "Write unit tests",        "PENDING",   5),
            _task("alice", 1, "Deploy to staging",       "PENDING",   1),
            _task("bob",   6, "Update API docs",         "PENDING",   3),
            _task("bob",   3, "Fix login bug",           "COMPLETED", -2),
            _task("bob",   2, "Code review session",     "PENDING",   4),
            _task("frontend-user", 2, "Learn DynamoDB",  "PENDING",   1),
            _task("frontend-user", 1, "Build demo page", "COMPLETED", 0),
            _task("frontend-user", 0, "Present to class","PENDING",   7),
        ]
        for item in items:
            self.table.put_item(Item=item)
        return len(items)
