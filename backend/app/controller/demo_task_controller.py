from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import APIRouter, Depends, Header, Query

from ..dto.demo_task import DemoTaskCreate, DemoTaskResponse
from ..repository.demo_task_repository import DemoTaskRepository
from ..service.demo_task_service import DemoTaskService
from ..config.config import settings

router = APIRouter()


def get_current_user(x_user_id: Optional[str] = Header(None)) -> str:
    return x_user_id or "frontend-user"


_service = DemoTaskService(DemoTaskRepository(settings.AWS_REGION, settings.DYNAMODB_DEMO_TABLE_NAME))


# ── Seed / Bulk ───────────────────────────────────────────────────────────────

@router.post("/seed", status_code=201)
def seed_demo():
    count = _service.seed()
    total = _service.count()
    return {"seeded": count, "total_in_table": total}

@router.post("/bulk-seed", status_code=201)
def bulk_seed(count: int = Query(default=1000, ge=1, le=5000)):
    inserted = _service.bulk_seed(count)
    total    = _service.count()
    return {
        "inserted": inserted,
        "total_in_table": total,
        "note": "PAY_PER_REQUEST absorbed this spike automatically — no capacity planning needed",
    }

@router.get("/count")
def get_count():
    return {"total": _service.count()}


# ── Create ────────────────────────────────────────────────────────────────────

@router.post("/tasks", response_model=DemoTaskResponse, status_code=201)
def create_demo_task(payload: DemoTaskCreate, user_id: str = Depends(get_current_user)):
    try:
        return _service.create(user_id, payload.title, payload.category, payload.priority, payload.due_date).dict()
    except ValueError as e:
        from fastapi import HTTPException
        raise HTTPException(status_code=422, detail=str(e))


# ── Service-layer business logic demos ───────────────────────────────────────

@router.get("/overdue")
def get_overdue(user_id: str = Query(default="alice")):
    """Service orchestrates: LSI query + overdue filter applied in Python.
    The repo has no concept of 'overdue' — that is domain/business logic."""
    items = _service.get_overdue(user_id)
    return {"user_id": user_id, "overdue_count": len(items), "items": [t.dict() for t in items]}

@router.get("/summary")
def get_summary(user_id: str = Query(default="alice")):
    """Service aggregates stats across tasks — controller gets a ready dict."""
    return _service.get_summary(user_id)


# ── Pattern 1: PK ─────────────────────────────────────────────────────────────

@router.get("/pk")
def query_pk(user_id: str = Query(default="frontend-user")):
    items = _service.query_by_pk(user_id)
    return {
        "pattern": "Partition Key (PK)",
        "key_used": "user_id (HASH)",
        "description": "Retrieves ALL tasks for one user. O(1) partition lookup — DynamoDB routes directly, no scan.",
        "dynamo_call": f"table.query(KeyConditionExpression=Key('user_id').eq('{user_id}'))",
        "count": len(items), "items": [t.dict() for t in items],
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
    items = _service.query_by_pk_sk_range(user_id, from_dt, to_dt)
    return {
        "pattern": "Composite Key Range (PK + SK)",
        "key_used": "user_id (HASH) + created_at (RANGE) BETWEEN",
        "description": "Reads only the date-range slice within the user's partition. Efficient even with millions of tasks.",
        "dynamo_call": f"Key('user_id').eq('{user_id}') & Key('created_at').between('{from_dt[:10]}', '{to_dt[:10]}')",
        "count": len(items), "items": [t.dict() for t in items],
    }


# ── Pattern 3: GSI ────────────────────────────────────────────────────────────

@router.get("/gsi")
def query_gsi(
    category: str = Query(default="WORK"),
    priority: str = Query(default=""),
):
    items = _service.query_by_gsi(category, priority)
    sk_part = f" & priority='{priority}'" if priority else ""
    return {
        "pattern": "Global Secondary Index (GSI)",
        "key_used": "category (GSI HASH) + priority (GSI RANGE)",
        "description": "category-priority-index spans ALL user partitions. Impossible with base table keys. Eventually consistent.",
        "dynamo_call": f"IndexName='category-priority-index', Key('category').eq('{category}'){sk_part}",
        "count": len(items), "items": [t.dict() for t in items],
    }


# ── Pattern 4: LSI ────────────────────────────────────────────────────────────

@router.get("/lsi")
def query_lsi(user_id: str = Query(default="alice")):
    items = _service.query_by_lsi_due_date(user_id)
    return {
        "pattern": "Local Secondary Index (LSI)",
        "key_used": "user_id (same HASH) + due_date (alternate RANGE)",
        "description": "due_date-index — same partition as base table, strongly consistent. Items without due_date are excluded.",
        "dynamo_call": f"IndexName='due_date-index', Key('user_id').eq('{user_id}')",
        "count": len(items), "items": [t.dict() for t in items],
    }


# ── String / Condition Functions ──────────────────────────────────────────────

@router.get("/begins-with")
def query_begins_with(
    user_id: str = Query(default="alice"),
    prefix:  str = Query(default="2026-07"),
):
    items = _service.query_begins_with(user_id, prefix)
    return {
        "pattern": "begins_with on Sort Key",
        "key_used": "user_id (HASH) + created_at.begins_with(prefix)",
        "description": "KeyConditionExpression begins_with — index-aware, no scan. e.g. prefix='2026-07' returns all July 2026 tasks.",
        "dynamo_call": f"Key('user_id').eq('{user_id}') & Key('created_at').begins_with('{prefix}')",
        "count": len(items), "items": [t.dict() for t in items],
    }

@router.get("/contains")
def query_contains(keyword: str = Query(default="bug")):
    items = _service.scan_contains(keyword)
    return {
        "pattern": "contains (FilterExpression)",
        "key_used": "Attr('title').contains(keyword)",
        "description": "Scans ALL partitions then filters. Simple but reads every item — use sparingly on large tables.",
        "dynamo_call": f"table.scan(FilterExpression=Attr('title').contains('{keyword}'))",
        "count": len(items), "items": [t.dict() for t in items],
    }

@router.get("/attribute-exists")
def query_attribute_exists(
    user_id:    str  = Query(default="frontend-user"),
    must_exist: bool = Query(default=True),
):
    items = (_service.query_attribute_exists(user_id) if must_exist
             else _service.query_attribute_not_exists(user_id))
    fn = "exists()" if must_exist else "not_exists()"
    return {
        "pattern": f"attribute_{fn} (FilterExpression)",
        "key_used": f"Attr('due_date').{fn}",
        "description": ("DynamoDB supports sparse attributes — items can omit fields entirely. "
                        "attribute_exists / not_exists let you filter on presence."),
        "dynamo_call": f"FilterExpression=Attr('due_date').{fn}",
        "count": len(items), "items": [t.dict() for t in items],
    }
