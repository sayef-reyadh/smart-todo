# Smart Todo App - Traceability Matrix

> **API Path Note:** API routes in this matrix are relative paths.  
> Full endpoint format is `/api/v1/{route}` as defined in [22-api-design.md](22-api-design.md).

## Matrix A - User Story -> Functional Requirement -> Design -> API -> Test Case
| User Story | Requirement | Design Component | API | Test Case |
|---|---|---|---|---|
| US-001 | FR-001 | Auth Controller/Service | POST /auth/register | TC-001 |
| US-001 | FR-002 | User Repository | POST /auth/register | TC-002 |
| US-001 | FR-003 | Auth Validation | POST /auth/register | TC-003 |
| US-002 | FR-004 | Auth Controller | POST /auth/login | TC-004, TC-005 |
| US-003 | FR-005 | Token Service | POST /auth/refresh | TC-006, TC-007 |
| US-004 | FR-006 | Session Service | POST /auth/logout | TC-008 |
| US-002 | FR-007 | JWT Guard Middleware | All protected APIs | TC-009 |
| US-005 | FR-008 | User Profile Service | PATCH /users/me | TC-010 |
| US-009 | FR-009 | Task Controller/Service | POST /tasks | TC-013, TC-014 |
| US-010 | FR-010 | Task Service | PATCH /tasks/{task_id} | TC-016, TC-017, TC-018 |
| US-011 | FR-011 | Task Service | DELETE /tasks/{task_id} | TC-020, TC-021 |
| US-012 | FR-012 | Task Lifecycle Service | POST /tasks/{task_id}/complete | TC-022, TC-023 |
| US-013 | FR-013 | Task Lifecycle Service | POST /tasks/{task_id}/reopen | TC-024 |
| US-014 | FR-014 | Task Validation Layer | POST/PATCH /tasks | TC-014, TC-017 |
| US-015 | FR-015 | Task Domain Rules | POST/PATCH /tasks | TC-014, TC-037 |
| US-016 | FR-016 | Task-Category Link | POST/PATCH /tasks | TC-014, TC-018 |
| US-019 | FR-017 | Category Service | POST /categories | TC-064 |
| US-020 | FR-018 | Category Query Service | GET /categories | TC-064 |
| US-021 | FR-019 | Recurrence Service | POST /tasks (repeat_rule) | TC-029 |
| US-017 | FR-020 | Subtask Relation Model | POST /tasks | TC-025 |
| US-017 | FR-021 | Attachment Metadata Service | PATCH /tasks/{task_id} | TC-016 |
| US-022 | FR-022 | Search Query Service | GET /tasks?q= | TC-031, TC-032 |
| US-023 | FR-023 | Filter Engine | GET /tasks?status= | TC-033 |
| US-024 | FR-024 | Filter Engine | GET /tasks?category_id= | TC-034 |
| US-025 | FR-025 | Date Filter Engine | GET /tasks?due_from=&due_to= | TC-035 |
| US-026 | FR-026 | Sort Engine | GET /tasks?sort_by= | TC-036, TC-037 |
| US-026 | FR-027 | Bulk Task Service | PATCH /tasks/bulk | TC-027 |
| US-012 | FR-028 | Bulk Task Service | POST /tasks/bulk/complete | TC-028 |
| US-027 | FR-029 | Reminder Service | POST /tasks/{task_id}/reminders | TC-041, TC-042 |
| US-028 | FR-030 | Reminder Service | PATCH /reminders/{reminder_id} | TC-044 |
| US-029 | FR-031 | Reminder Service | DELETE /reminders/{reminder_id} | TC-045 |
| US-030 | FR-032 | Notification Service | Worker -> in-app store | TC-046 |
| US-031 | FR-033 | Email Adapter Service | Worker -> email provider | TC-047 |
| US-034 | FR-034 | Analytics Service | GET /analytics/dashboard | TC-053, TC-056 |
| US-035 | FR-035 | Analytics Service | GET /analytics/dashboard | TC-054 |
| US-032 | FR-036 | Overdue Analyzer | GET /analytics/overdue | TC-055 |
| US-036 | FR-037 | Audit Logging Module | Internal logging endpoints | TC-062, TC-063 |
| US-037 | FR-038 | Export Service | GET /analytics/export/tasks | TC-059 |
| US-038 | FR-039 | Import Service | POST /analytics/import/tasks | TC-060, TC-061 |
| US-039 | FR-040 | Frontend State Sync | Task action APIs | TC-056 |
| US-039 | FR-041 | Pagination Module | GET /tasks?page= | TC-038, TC-039 |
| US-033 | FR-042 | Timezone Scheduler | Reminder APIs | TC-051 |
| US-033 | FR-043 | Locale Formatting Module | Profile + UI settings APIs | TC-010 |
| US-006 | FR-044 | Password Reset Service | POST /auth/password-reset/* | TC-011, TC-012 |
| US-007 | FR-045 | Account Lifecycle Service | PATCH /users/me/deactivate | TC-010 |
| US-008 | FR-046 | Admin User Service | PATCH /admin/users/{user_id}/status | TC-009 |
| US-008 | FR-047 | Rate Limit Middleware | All APIs | TC-067 |
| US-040 | FR-048 | ICS Export Service | GET /calendar/feed.ics | TC-066 |
| US-040 | FR-049 | Calendar View Module | GET /tasks + calendar UI | TC-030 |
| US-018 | FR-050 | Dependency Service | PATCH /tasks/{task_id}/dependencies | TC-026 |

## Matrix B - Non-Functional Requirement -> Validation -> Test Case
| NFR | Validation Method | Test Case |
|---|---|---|
| NFR-001 | Concurrency load test | TC-072 |
| NFR-002 | P95 latency check | TC-072 |
| NFR-003 | Reminder drift measurement | TC-051 |
| NFR-004 | Uptime monitoring report | TC-073 |
| NFR-005 | Maintenance window review | TC-073 |
| NFR-006 | Retry behavior simulation | TC-052 |
| NFR-007 | Durability and transaction checks | TC-062 |
| NFR-008 | Backup restore drill | TC-073 |
| NFR-009 | Horizontal scale test | TC-072 |
| NFR-010 | Auth guard validation | TC-009 |
| NFR-011 | Token expiry policy test | TC-068 |
| NFR-012 | Transport/password protection checks | TC-069 |
| NFR-013 | Security logging verification | TC-063 |
| NFR-014 | Vulnerability gating | TC-070, TC-071 |
| NFR-015 | Accessibility conformance review | TC-074, TC-075 |
| NFR-016 | Keyboard-only flow test | TC-074 |
| NFR-017 | Unit coverage reporting | TC-072 |
| NFR-018 | API compatibility tests | TC-038 |
| NFR-019 | Static quality gate | TC-072 |
| NFR-020 | Telemetry completeness check | TC-063 |
| NFR-021 | Alert response timing validation | TC-073 |
| NFR-022 | Container portability verification | TC-073 |
| NFR-023 | AWS reproducible deployment check | TC-073 |
| NFR-024 | Deactivation/deletion process validation | TC-010 |
| NFR-025 | Usability first-task-time test | TC-013 |

## Coverage Statement
1. Every user story maps to one or more FR entries.
2. Every FR (FR-001..FR-050) maps to at least one test case.
3. Every NFR (NFR-001..NFR-025) maps to a validation test.
