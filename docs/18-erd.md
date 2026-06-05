# Smart ToDo - Entity Relationship Diagram (ERD)

## Entity Overview
| Entity | Purpose |
|---|---|
| User | Stores account, identity, and timezone preferences |
| Category | Organizes user tasks by domain/context |
| Task | Core work item with status, due date, and priority |
| Reminder | Defines reminder schedules and channels for tasks |
| Notification | Stores generated in-app/email notification events |
| AuditLog | Captures security and task lifecycle audit events |

## Entity Attributes
### User
`id, full_name, email, password_hash, role, timezone, is_active, created_at, updated_at`

### Category
`id, user_id, name, color, created_at, updated_at`

### Task
`id, user_id, category_id, title, description, status, priority, due_at, completed_at, parent_task_id, created_at, updated_at`

### Reminder
`id, task_id, remind_at, channel, repeat_rule, is_enabled, created_at, updated_at`

### Notification
`id, user_id, task_id, reminder_id, channel, title, message, status, sent_at, read_at, created_at`

### AuditLog
`id, user_id, entity_type, entity_id, action, metadata_json, ip_address, user_agent, created_at`

## Relationship Rules
1. One **User** has many **Tasks**, **Categories**, **Notifications**, and **AuditLogs**.
2. One **Category** has many **Tasks**.
3. One **Task** has many **Reminders** and **Notifications**.
4. **Task.parent_task_id** creates self-referencing hierarchy for subtasks.
5. One **Reminder** may trigger multiple **Notifications** (retries/channels).

## Mermaid ER Diagram
```mermaid
erDiagram
    USER ||--o{ CATEGORY : owns
    USER ||--o{ TASK : owns
    USER ||--o{ NOTIFICATION : receives
    USER ||--o{ AUDIT_LOG : generates
    CATEGORY ||--o{ TASK : classifies
    TASK ||--o{ REMINDER : schedules
    TASK ||--o{ NOTIFICATION : triggers
    REMINDER ||--o{ NOTIFICATION : creates
    TASK ||--o{ TASK : parent_of

    USER {
      bigint id PK
      varchar full_name
      varchar email UK
      varchar password_hash
      varchar role
      varchar timezone
      boolean is_active
      datetime created_at
      datetime updated_at
    }
    CATEGORY {
      bigint id PK
      bigint user_id FK
      varchar name
      varchar color
      datetime created_at
      datetime updated_at
    }
    TASK {
      bigint id PK
      bigint user_id FK
      bigint category_id FK
      bigint parent_task_id FK
      varchar title
      text description
      varchar status
      varchar priority
      datetime due_at
      datetime completed_at
      datetime created_at
      datetime updated_at
    }
    REMINDER {
      bigint id PK
      bigint task_id FK
      datetime remind_at
      varchar channel
      varchar repeat_rule
      boolean is_enabled
      datetime created_at
      datetime updated_at
    }
    NOTIFICATION {
      bigint id PK
      bigint user_id FK
      bigint task_id FK
      bigint reminder_id FK
      varchar channel
      varchar title
      text message
      varchar status
      datetime sent_at
      datetime read_at
      datetime created_at
    }
    AUDIT_LOG {
      bigint id PK
      bigint user_id FK
      varchar entity_type
      bigint entity_id
      varchar action
      json metadata_json
      varchar ip_address
      varchar user_agent
      datetime created_at
    }
```
