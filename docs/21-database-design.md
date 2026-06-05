# Smart Todo App - Database Design

## Database Overview
- Engine: **Amazon DynamoDB**
- Model: **NoSQL key-value/document**
- Table strategy: **Single-table design** for core application entities
- Time handling: UTC timestamps (ISO-8601), timezone conversion in application layer

## Table Design
### Primary Table: `smart_todo_app`
| Key | Type | Purpose |
|---|---|---|
| `PK` | String | Partition key (tenant/user centered access) |
| `SK` | String | Sort key (entity type + time/order patterns) |

### Item Types in Single Table
| Entity | PK Pattern | SK Pattern | Notes |
|---|---|---|---|
| User Profile | `USER#{user_id}` | `PROFILE` | One profile item per user |
| Category | `USER#{user_id}` | `CATEGORY#{category_id}` | Category list by user |
| Task | `USER#{user_id}` | `TASK#{task_id}` | Core task record |
| Reminder | `USER#{user_id}` | `REMINDER#{task_id}#{reminder_id}` | Reminder records grouped by user |
| Notification | `USER#{user_id}` | `NOTIF#{created_at}#{notification_id}` | Notification center queries |
| Audit Log | `USER#{user_id}` | `AUDIT#{created_at}#{audit_id}` | Time-ordered activity log |
| Task Dependency | `USER#{user_id}` | `TASKDEP#{task_id}#{blocked_by_task_id}` | Dependency edges |

## Attribute Dictionary
| Attribute | Type | Used By |
|---|---|---|
| `entity_type` | String | All items (`USER`, `TASK`, `REMINDER`, etc.) |
| `user_id` | String | Partitioning and authorization scope |
| `task_id` | String | Task, reminder, notification references |
| `category_id` | String | Task/category linkage |
| `status` | String | Task and notification status |
| `priority` | String | Task ordering/filter |
| `due_at` | String (ISO datetime) | Due date filtering |
| `remind_at` | String (ISO datetime) | Reminder scheduler queries |
| `created_at` | String (ISO datetime) | Ordering and analytics |
| `updated_at` | String (ISO datetime) | Change tracking |
| `ttl_epoch` | Number | Optional TTL expiry for selected items |
| `gsi1pk`, `gsi1sk` | String | GSI-1 access pattern |
| `gsi2pk`, `gsi2sk` | String | GSI-2 access pattern |
| `gsi3pk`, `gsi3sk` | String | GSI-3 access pattern |

## Global Secondary Indexes (GSI)
| Index | Partition Key | Sort Key | Access Pattern |
|---|---|---|---|
| GSI-1 (`gsi1pk-gsi1sk`) | `USER#{user_id}#TASKS` | `STATUS#{status}#DUE#{due_at}` | Task list by status and due date |
| GSI-2 (`gsi2pk-gsi2sk`) | `USER#{user_id}#TASKS` | `CATEGORY#{category_id}#DUE#{due_at}` | Category-based planning views |
| GSI-3 (`gsi3pk-gsi3sk`) | `REMINDER#DUE` | `REMIND_AT#{remind_at}#USER#{user_id}#TASK#{task_id}` | Scheduler scans for upcoming reminders |
| GSI-4 (`gsi4pk-gsi4sk`) | `USER#{user_id}#NOTIF` | `STATUS#{status}#CREATED#{created_at}` | Notification center unread/read ordering |

## Data Integrity Strategy (NoSQL)
1. **Conditional writes** prevent overwrites and enforce uniqueness constraints where needed.
2. **TransactWriteItems** used for multi-item invariants (for example, complete task + audit record).
3. **Application-level referential integrity** manages relationships (category/task/reminder links).
4. **Soft delete flags** preserve auditability and enable restore workflows.

## Sample Item (Task)
```json
{
  "PK": "USER#u_101",
  "SK": "TASK#t_5001",
  "entity_type": "TASK",
  "user_id": "u_101",
  "task_id": "t_5001",
  "title": "Complete SRS review",
  "description": "Review sections 3 and 4",
  "status": "PENDING",
  "priority": "HIGH",
  "category_id": "c_12",
  "due_at": "2026-06-20T18:00:00Z",
  "created_at": "2026-06-05T10:20:00Z",
  "updated_at": "2026-06-05T10:20:00Z",
  "gsi1pk": "USER#u_101#TASKS",
  "gsi1sk": "STATUS#PENDING#DUE#2026-06-20T18:00:00Z",
  "gsi2pk": "USER#u_101#TASKS",
  "gsi2sk": "CATEGORY#c_12#DUE#2026-06-20T18:00:00Z"
}
```

## Capacity and Performance
| Area | Strategy |
|---|---|
| Read/Write Mode | On-demand for variable load (or provisioned with auto scaling for predictable traffic) |
| Hot Partition Mitigation | Balanced key design; avoid monotonic partition concentration |
| Large Queries | Query by PK + SK/GSI prefixes; avoid full table scans in runtime APIs |
| Pagination | Use DynamoDB `LastEvaluatedKey` for cursor-based pagination |

## Backup, Recovery, and Security
| Control | Approach |
|---|---|
| Backup | Point-in-time recovery (PITR) enabled |
| Disaster Recovery | AWS Backup policies + cross-region strategy (if required) |
| Encryption | Server-side encryption (AWS managed KMS keys) |
| Access Control | Least-privilege IAM roles for API and worker services |
| Auditing | CloudTrail + application audit records in `AUDIT` items |

## NoSQL Modeling Discussion
- The design is optimized around **access patterns**, not normalized joins.
- Denormalization is intentional for low-latency reads on task lists, reminders, and notifications.
- Derived dashboard metrics are computed in service layer and optionally cached.

