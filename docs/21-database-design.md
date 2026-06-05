# Smart ToDo - Database Design

## Database Overview
- Engine: MySQL 8.x
- Model: Relational, normalized to 3NF for core transactional entities
- Charset: `utf8mb4`
- Time handling: UTC storage with user timezone conversion at application layer

## Schema Definition (Logical)

### users
| Column | Type | Constraints |
|---|---|---|
| id | BIGINT | PK, auto-increment |
| full_name | VARCHAR(120) | NOT NULL |
| email | VARCHAR(190) | NOT NULL, UNIQUE |
| password_hash | VARCHAR(255) | NOT NULL |
| role | VARCHAR(30) | NOT NULL, default `USER` |
| timezone | VARCHAR(60) | NOT NULL, default `UTC` |
| is_active | BOOLEAN | NOT NULL, default `true` |
| created_at | DATETIME | NOT NULL |
| updated_at | DATETIME | NOT NULL |

### categories
| Column | Type | Constraints |
|---|---|---|
| id | BIGINT | PK, auto-increment |
| user_id | BIGINT | FK -> users.id, NOT NULL |
| name | VARCHAR(80) | NOT NULL |
| color | VARCHAR(20) | NULL |
| created_at | DATETIME | NOT NULL |
| updated_at | DATETIME | NOT NULL |

### tasks
| Column | Type | Constraints |
|---|---|---|
| id | BIGINT | PK, auto-increment |
| user_id | BIGINT | FK -> users.id, NOT NULL |
| category_id | BIGINT | FK -> categories.id, NULL |
| parent_task_id | BIGINT | FK -> tasks.id, NULL |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | NULL |
| status | VARCHAR(20) | NOT NULL |
| priority | VARCHAR(20) | NOT NULL |
| due_at | DATETIME | NULL |
| completed_at | DATETIME | NULL |
| is_deleted | BOOLEAN | NOT NULL, default `false` |
| created_at | DATETIME | NOT NULL |
| updated_at | DATETIME | NOT NULL |

### reminders
| Column | Type | Constraints |
|---|---|---|
| id | BIGINT | PK, auto-increment |
| task_id | BIGINT | FK -> tasks.id, NOT NULL |
| remind_at | DATETIME | NOT NULL |
| channel | VARCHAR(20) | NOT NULL (`IN_APP`, `EMAIL`) |
| repeat_rule | VARCHAR(40) | NULL |
| is_enabled | BOOLEAN | NOT NULL, default `true` |
| created_at | DATETIME | NOT NULL |
| updated_at | DATETIME | NOT NULL |

### notifications
| Column | Type | Constraints |
|---|---|---|
| id | BIGINT | PK, auto-increment |
| user_id | BIGINT | FK -> users.id, NOT NULL |
| task_id | BIGINT | FK -> tasks.id, NULL |
| reminder_id | BIGINT | FK -> reminders.id, NULL |
| channel | VARCHAR(20) | NOT NULL |
| title | VARCHAR(200) | NOT NULL |
| message | TEXT | NOT NULL |
| status | VARCHAR(20) | NOT NULL (`QUEUED`, `SENT`, `FAILED`, `READ`) |
| sent_at | DATETIME | NULL |
| read_at | DATETIME | NULL |
| created_at | DATETIME | NOT NULL |

### audit_logs
| Column | Type | Constraints |
|---|---|---|
| id | BIGINT | PK, auto-increment |
| user_id | BIGINT | FK -> users.id, NOT NULL |
| entity_type | VARCHAR(50) | NOT NULL |
| entity_id | BIGINT | NOT NULL |
| action | VARCHAR(50) | NOT NULL |
| metadata_json | JSON | NULL |
| ip_address | VARCHAR(45) | NULL |
| user_agent | VARCHAR(255) | NULL |
| created_at | DATETIME | NOT NULL |

## Index Strategy
| Table | Index | Purpose |
|---|---|---|
| users | `ux_users_email` | Fast auth lookup, uniqueness |
| tasks | `ix_tasks_user_status_due` | Main list/filter query performance |
| tasks | `ix_tasks_user_category` | Category filter performance |
| tasks | `ix_tasks_user_priority_due` | Priority + date sorting |
| reminders | `ix_reminders_trigger` (`is_enabled`, `remind_at`) | Scheduler scan |
| notifications | `ix_notifications_user_status` | Notification center query |
| audit_logs | `ix_audit_entity_time` | Forensics and traceability |

## Foreign Key Rules
1. `categories.user_id -> users.id` (ON DELETE CASCADE)
2. `tasks.user_id -> users.id` (ON DELETE CASCADE)
3. `tasks.category_id -> categories.id` (ON DELETE SET NULL)
4. `tasks.parent_task_id -> tasks.id` (ON DELETE SET NULL)
5. `reminders.task_id -> tasks.id` (ON DELETE CASCADE)
6. `notifications.user_id -> users.id` (ON DELETE CASCADE)
7. `notifications.task_id -> tasks.id` (ON DELETE SET NULL)
8. `notifications.reminder_id -> reminders.id` (ON DELETE SET NULL)
9. `audit_logs.user_id -> users.id` (ON DELETE RESTRICT)

## Normalization Discussion
- **1NF:** Atomic fields, no repeating groups.
- **2NF:** Non-key attributes depend on full primary keys.
- **3NF:** No transitive dependency in core transactional schema.
- Denormalized aggregates (for dashboard) are computed on read or materialized in analytics layer when required.
