from datetime import datetime, timedelta
from typing import Optional
import uuid

from fastapi import APIRouter, Depends, Header, Query
from pydantic import BaseModel

from ..repositories.demo_repository import DemoRepository, create_demo_table_if_not_exists
from ..core.config import settings

router = APIRouter()


def get_current_user(x_user_id: Optional[str] = Header(None)) -> str:
    return x_user_id or "frontend-user"


create_demo_table_if_not_exists(settings.AWS_REGION, settings.DYNAMODB_DEMO_TABLE_NAME)
_repo = DemoRepository(settings.AWS_REGION, settings.DYNAMODB_DEMO_TABLE_NAME)


class DemoTaskCreate(BaseModel):
    title: str
    due_date: Optional[str] = None


# ── Seed ──────────────────────────────────────────────────────────────────────

@router.post("/seed", status_code=201)
def seed_demo():
    count = _repo.seed()
    return {"seeded": count, "message": f"Inserted {count} sample tasks across alice, bob, frontend-user"}


# ── Create ────────────────────────────────────────────────────────────────────

@router.post("/tasks", status_code=201)
def create_demo_task(payload: DemoTaskCreate, user_id: str = Depends(get_current_user)):
    item = {
        "user_id":    user_id,
        "created_at": datetime.utcnow().isoformat(),
        "id":         str(uuid.uuid4()),
        "title":      payload.title,
        "status":     "PENDING",
    }
    if payload.due_date:
        item["due_date"] = payload.due_date
    return _repo.create(item)


# ── Pattern 1: Simple Partition Key ───────────────────────────────────────────

@router.get("/pk")
def query_pk(user_id: str = Query(default="frontend-user")):
    items = _repo.query_by_pk(user_id)
    return {
        "pattern":     "Partition Key (PK)",
        "key_used":    "user_id",
        "description": "Returns every task for this user. DynamoDB routes directly to the user's partition — O(1) partition lookup.",
        "dynamo_call": f"table.query(KeyConditionExpression=Key('user_id').eq('{user_id}'))",
        "count":       len(items),
        "items":       items,
    }


# ── Pattern 2: Composite PK + SK range ────────────────────────────────────────

@router.get("/pk-sk-range")
def query_pk_sk_range(
    user_id: str = Query(default="alice"),
    from_dt: str = Query(default=""),
    to_dt:   str = Query(default=""),
):
    if not from_dt:
        from_dt = (datetime.utcnow() - timedelta(days=7)).isoformat()
    if not to_dt:
        to_dt = datetime.utcnow().isoformat()

    items = _repo.query_by_pk_sk_range(user_id, from_dt, to_dt)
    return {
        "pattern":     "Composite Key Range (PK + SK)",
        "key_used":    "user_id + created_at BETWEEN",
        "description": "Reads only the slice of the user's partition within the date range. Efficient even with millions of tasks.",
        "dynamo_call": f"table.query(KeyConditionExpression=Key('user_id').eq('{user_id}') & Key('created_at').between('{from_dt[:10]}', '{to_dt[:10]}'))",
        "count":       len(items),
        "items":       items,
    }


# ── Pattern 3: GSI ────────────────────────────────────────────────────────────

@router.get("/gsi")
def query_gsi(status: str = Query(default="PENDING")):
    items = _repo.query_by_gsi_status(status)
    return {
        "pattern":     "Global Secondary Index (GSI)",
        "key_used":    "status (GSI partition key)",
        "description": "Queries status-created_at-index which spans ALL user partitions. Impossible with base table keys alone. GSI is eventually consistent.",
        "dynamo_call": f"table.query(IndexName='status-created_at-index', KeyConditionExpression=Key('status').eq('{status}'))",
        "count":       len(items),
        "items":       items,
    }


# ── Pattern 4: LSI ────────────────────────────────────────────────────────────

@router.get("/lsi")
def query_lsi(user_id: str = Query(default="alice")):
    items = _repo.query_by_lsi_due_date(user_id)
    return {
        "pattern":     "Local Secondary Index (LSI)",
        "key_used":    "user_id (same PK) + due_date (alternate SK)",
        "description": "Queries due_date-index — same partition as base table (strongly consistent). Only items WITH a due_date appear. LSI must be defined at table creation time.",
        "dynamo_call": f"table.query(IndexName='due_date-index', KeyConditionExpression=Key('user_id').eq('{user_id}'))",
        "count":       len(items),
        "items":       items,
    }
