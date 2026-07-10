from datetime import datetime
from typing import List, Optional
import uuid

from fastapi import APIRouter, Depends, Header, Query

from ..model.demo_task import DemoTask
from ..dto.demo_task import DemoTaskCreate, DemoTaskResponse
from ..repositories.tasks_demo_repository import DemoRepository
from ..core.config import settings

router = APIRouter()


def get_current_user(x_user_id: Optional[str] = Header(None)) -> str:
    return x_user_id or "frontend-user"


_repo = DemoRepository(settings.AWS_REGION, settings.DYNAMODB_DEMO_TABLE_NAME)


class DemoTaskCreate(BaseModel):
    title: str
    category: str = "WORK"
    priority: str = "MEDIUM"
    due_date: Optional[str] = None


# ── Seed / Bulk ───────────────────────────────────────────────────────────────

@router.post("/seed", status_code=201)
def seed_demo():
    count = _repo.seed()
    total = _repo.count()
    return {"seeded": count, "total_in_table": total}

@router.post("/bulk-seed", status_code=201)
def bulk_seed(count: int = Query(default=1000, ge=1, le=5000)):
    inserted = _repo.bulk_seed(count)
    total    = _repo.count()
    return {
        "inserted": inserted,
        "total_in_table": total,
        "note": "PAY_PER_REQUEST absorbed this spike automatically — no capacity planning needed",
    }

@router.get("/count")
def get_count():
    return {"total": _repo.count()}


# ── Create ────────────────────────────────────────────────────────────────────

@router.post("/tasks", response_model=DemoTaskResponse, status_code=201)
def create_demo_task(payload: DemoTaskCreate, user_id: str = Depends(get_current_user)):
    task = DemoTask(
        user_id=user_id,
        created_at=datetime.utcnow().isoformat(),
        title=payload.title,
        category=payload.category,
        priority=payload.priority,
        due_date=payload.due_date,
    )
    return _repo.create(task).dict()


# ── Pattern 1: PK ─────────────────────────────────────────────────────────────

@router.get("/pk")
def query_pk(user_id: str = Query(default="frontend-user")):
    items = _repo.query_by_pk(user_id)
    return {
        "pattern": "Partition Key (PK)",
        "key_used": "user_id (HASH)",
        "description": "Retrieves ALL tasks for one user. O(1) partition lookup — DynamoDB routes directly, no scan.",
        "dynamo_call": f"table.query(KeyConditionExpression=Key('user_id').eq('{user_id}'))",
        "count": len(items), "items": items,
    }


# ── Pattern 2: PK + SK range ─────────────────────────────────────────────────

@router.get("/pk-sk-range")
def query_pk_sk_range(
    user_id: str = Query(default="alice"),
    from_dt: str = Query(default=""),
    to_dt:   str = Query(default=""),
):
    if not from_dt:
        from_dt = (datetime.utcnow() - timedelta(days=90)).isoformat()
    if not to_dt:
        to_dt = datetime.utcnow().isoformat()
    items = _repo.query_by_pk_sk_range(user_id, from_dt, to_dt)
    return {
        "pattern": "Composite Key Range (PK + SK)",
        "key_used": "user_id (HASH) + created_at (RANGE) BETWEEN",
        "description": "Reads only the date-range slice within the user's partition. Efficient even with millions of tasks.",
        "dynamo_call": f"Key('user_id').eq('{user_id}') & Key('created_at').between('{from_dt[:10]}', '{to_dt[:10]}')",
        "count": len(items), "items": items,
    }


# ── Pattern 3: GSI ────────────────────────────────────────────────────────────

@router.get("/gsi")
def query_gsi(
    category: str = Query(default="WORK"),
    priority: str = Query(default=""),
):
    items = _repo.query_by_gsi(category, priority)
    sk_part = f" & priority='{priority}'" if priority else ""
    return {
        "pattern": "Global Secondary Index (GSI)",
        "key_used": "category (GSI HASH) + priority (GSI RANGE)",
        "description": "category-priority-index spans ALL user partitions. Impossible with base table keys. Eventually consistent.",
        "dynamo_call": f"IndexName='category-priority-index', Key('category').eq('{category}'){sk_part}",
        "count": len(items), "items": items,
    }


# ── Pattern 4: LSI ────────────────────────────────────────────────────────────

@router.get("/lsi")
def query_lsi(user_id: str = Query(default="alice")):
    items = _repo.query_by_lsi_due_date(user_id)
    return {
        "pattern": "Local Secondary Index (LSI)",
        "key_used": "user_id (same HASH) + due_date (alternate RANGE)",
        "description": "due_date-index — same partition as base table, strongly consistent. Items without due_date are excluded.",
        "dynamo_call": f"IndexName='due_date-index', Key('user_id').eq('{user_id}')",
        "count": len(items), "items": items,
    }


# ── String / Condition Functions ──────────────────────────────────────────────

@router.get("/begins-with")
def query_begins_with(
    user_id: str = Query(default="alice"),
    prefix:  str = Query(default="2026-07"),
):
    items = _repo.query_begins_with(user_id, prefix)
    return {
        "pattern": "begins_with on Sort Key",
        "key_used": "user_id (HASH) + created_at.begins_with(prefix)",
        "description": "KeyConditionExpression begins_with — index-aware, no scan. e.g. prefix='2026-07' returns all July 2026 tasks.",
        "dynamo_call": f"Key('user_id').eq('{user_id}') & Key('created_at').begins_with('{prefix}')",
        "count": len(items), "items": items,
    }

@router.get("/contains")
def query_contains(keyword: str = Query(default="bug")):
    items = _repo.scan_contains(keyword)
    return {
        "pattern": "contains (FilterExpression)",
        "key_used": "Attr('title').contains(keyword)",
        "description": "Scans ALL partitions then filters. Simple but reads every item — use sparingly on large tables.",
        "dynamo_call": f"table.scan(FilterExpression=Attr('title').contains('{keyword}'))",
        "count": len(items), "items": items,
    }

@router.get("/attribute-exists")
def query_attribute_exists(
    user_id:    str  = Query(default="frontend-user"),
    must_exist: bool = Query(default=True),
):
    items = (_repo.query_attribute_exists(user_id) if must_exist
             else _repo.query_attribute_not_exists(user_id))
    fn = "exists()" if must_exist else "not_exists()"
    return {
        "pattern": f"attribute_{fn} (FilterExpression)",
        "key_used": f"Attr('due_date').{fn}",
        "description": ("DynamoDB supports sparse attributes — items can omit fields entirely. "
                        "attribute_exists / not_exists let you filter on presence."),
        "dynamo_call": f"FilterExpression=Attr('due_date').{fn}",
        "count": len(items), "items": items,
    }
