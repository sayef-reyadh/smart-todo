# Smart Todo App - API Design

## API Standards
| Item | Standard |
|---|---|
| Base URL | `/api/v1` |
| Format | JSON |
| Auth | Bearer JWT |
| Error Model | `error_code`, `message`, `trace_id`, `details` |
| Time Format | ISO-8601 UTC |

> **Path Convention:** Endpoints listed below are relative to `/api/v1`.  
> Example: `POST /auth/register` means `POST /api/v1/auth/register`.

## Authentication APIs
| Endpoint | Method | Description | Auth |
|---|---|---|---|
| `/auth/register` | POST | Register user | Public |
| `/auth/login` | POST | Login and issue tokens | Public |
| `/auth/refresh` | POST | Refresh access token | Public (refresh token) |
| `/auth/logout` | POST | Revoke refresh token | Bearer |
| `/auth/password-reset/request` | POST | Request reset token | Public |
| `/auth/password-reset/confirm` | POST | Reset password using token | Public |

### Example: POST `/auth/register`
**Request**
```json
{
  "full_name": "Aisha Rahman",
  "email": "aisha@example.com",
  "password": "StrongPass!123",
  "timezone": "Asia/Dhaka"
}
```
**Response 201**
```json
{
  "user_id": "u_101",
  "email": "aisha@example.com",
  "message": "Registration successful"
}
```

## User and Account Lifecycle APIs
| Endpoint | Method | Description | Auth |
|---|---|---|---|
| `/users/me` | PATCH | Update current user profile | Bearer |
| `/users/me/deactivate` | PATCH | Deactivate current user account | Bearer |
| `/admin/users/{user_id}/status` | PATCH | Suspend/reactivate user account | Bearer (admin) |

## Task APIs
| Endpoint | Method | Description | Auth |
|---|---|---|---|
| `/tasks` | POST | Create task | Bearer |
| `/tasks` | GET | List tasks (search/filter/sort/pagination) | Bearer |
| `/tasks/{task_id}` | GET | Get task details | Bearer |
| `/tasks/{task_id}` | PATCH | Update task | Bearer |
| `/tasks/{task_id}` | DELETE | Soft-delete task | Bearer |
| `/tasks/{task_id}/complete` | POST | Mark completed | Bearer |
| `/tasks/{task_id}/reopen` | POST | Reopen task | Bearer |
| `/tasks/bulk` | PATCH | Bulk update tasks | Bearer |
| `/tasks/bulk/complete` | POST | Bulk complete tasks | Bearer |

### List Tasks Query Parameters
`q, status, category_id, due_from, due_to, priority, sort_by, sort_dir, page, page_size`

### Example: POST `/tasks`
**Request**
```json
{
  "title": "Complete SRS draft",
  "description": "Finalize section 3 and 4",
  "priority": "HIGH",
  "category_id": "c_12",
  "due_at": "2026-06-20T18:00:00Z"
}
```
**Response 201**
```json
{
  "id": "t_5001",
  "status": "PENDING",
  "created_at": "2026-06-05T10:22:00Z"
}
```

## Category APIs
| Endpoint | Method | Description | Auth |
|---|---|---|---|
| `/categories` | POST | Create category | Bearer |
| `/categories` | GET | List categories | Bearer |
| `/categories/{category_id}` | PATCH | Update category | Bearer |
| `/categories/{category_id}` | DELETE | Delete category | Bearer |

## Reminder APIs
| Endpoint | Method | Description | Auth |
|---|---|---|---|
| `/tasks/{task_id}/reminders` | POST | Create reminder for task | Bearer |
| `/reminders/{reminder_id}` | PATCH | Edit reminder | Bearer |
| `/reminders/{reminder_id}` | DELETE | Cancel reminder | Bearer |
| `/reminders` | GET | List reminders | Bearer |

### Example: POST `/tasks/{task_id}/reminders`
**Request**
```json
{
  "remind_at": "2026-06-19T18:00:00Z",
  "channel": "EMAIL",
  "repeat_rule": "NONE"
}
```
**Response 201**
```json
{
  "id": "r_9001",
  "task_id": "t_5001",
  "is_enabled": true
}
```

## Notification APIs
| Endpoint | Method | Description | Auth |
|---|---|---|---|
| `/notifications` | GET | List user notifications | Bearer |
| `/notifications/{notification_id}/read` | POST | Mark as read | Bearer |
| `/notifications/mark-all-read` | POST | Mark all as read | Bearer |

## Analytics APIs
| Endpoint | Method | Description | Auth |
|---|---|---|---|
| `/analytics/dashboard` | GET | Summary metrics and trends | Bearer |
| `/analytics/overdue` | GET | Overdue task report | Bearer |
| `/analytics/export/tasks` | GET | Export task CSV | Bearer |
| `/analytics/import/tasks` | POST | Import task CSV | Bearer |

## Validation Rules
| Area | Rule |
|---|---|
| Auth | Email format validation; password complexity policy |
| Task | Title required, max lengths, valid enum for status/priority |
| Reminder | `remind_at` must be future timestamp; valid channel enum |
| Pagination | `page >= 1`, `1 <= page_size <= 100` |

## Status Codes
| Code | Meaning | Typical Usage |
|---|---|---|
| 200 | OK | Successful reads/updates |
| 201 | Created | Resource created |
| 204 | No Content | Deletion success |
| 400 | Bad Request | Validation failure |
| 401 | Unauthorized | Invalid/expired token |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Resource missing |
| 409 | Conflict | Duplicate or state conflict |
| 422 | Unprocessable Entity | Semantic validation failure |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unhandled server failure |

## Error Response Contract
```json
{
  "error_code": "VALIDATION_ERROR",
  "message": "Input validation failed",
  "trace_id": "9f8c2a61-5c0a-4dbd-9d6b-3f7f9f112233",
  "details": [
    {"field": "title", "issue": "must not be empty"}
  ]
}
```

## API-to-Requirement Mapping Snapshot
| API Domain | Requirement IDs |
|---|---|
| Auth | FR-001..FR-008, FR-044..FR-047 |
| Tasks | FR-009..FR-028, FR-041, FR-049, FR-050 |
| Reminders/Notifications | FR-029..FR-033, FR-042 |
| Analytics/Utility | FR-034..FR-039, FR-043, FR-048 |
