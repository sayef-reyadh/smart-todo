# Smart ToDo - Test Cases

| TC-ID | Title | Preconditions | Steps | Expected Result |
|---|---|---|---|---|
| TC-001 | Register with valid data | User not registered | 1. Open register 2. Submit valid form | Account created (201) |
| TC-002 | Register with duplicate email | Existing account email | 1. Submit register with existing email | Conflict error (409) |
| TC-003 | Register with weak password | User on register page | 1. Enter weak password 2. Submit | Validation error returned |
| TC-004 | Login with valid credentials | Existing active account | 1. Submit email/password | Access + refresh tokens issued |
| TC-005 | Login with invalid password | Existing account | 1. Submit wrong password | Unauthorized (401) |
| TC-006 | Refresh token success | Valid refresh token | 1. Call refresh endpoint | New access token returned |
| TC-007 | Refresh token expired | Expired refresh token | 1. Call refresh endpoint | Unauthorized response |
| TC-008 | Logout success | Logged-in user | 1. Call logout | Token revoked and success returned |
| TC-009 | Access protected API without token | None | 1. Call `/tasks` GET | Unauthorized response |
| TC-010 | Profile update success | Logged-in user | 1. Submit profile change | Profile updated |
| TC-011 | Password reset request | Existing email | 1. Request reset link | Reset token issuance response |
| TC-012 | Password reset confirm | Valid reset token | 1. Submit new password | Password updated successfully |
| TC-013 | Create task minimal fields | Logged-in user | 1. POST task with title | Task created with default status |
| TC-014 | Create task with full metadata | Logged-in user + category | 1. POST task with due/priority/category | Task persisted with all fields |
| TC-015 | Create task missing title | Logged-in user | 1. POST task without title | Validation failure (400/422) |
| TC-016 | Edit task title | Existing task | 1. PATCH task title | Updated title returned |
| TC-017 | Edit task due date | Existing task | 1. PATCH due date | Due date updated |
| TC-018 | Edit task category | Existing task + category | 1. PATCH category_id | Category assignment updated |
| TC-019 | Edit task not owned | Task owned by another user | 1. PATCH task | Forbidden (403) |
| TC-020 | Delete task soft delete | Existing task | 1. DELETE task | Task removed from default list |
| TC-021 | Delete non-existing task | No matching task | 1. DELETE unknown ID | Not found (404) |
| TC-022 | Complete task | Pending task | 1. POST complete endpoint | Status becomes COMPLETED |
| TC-023 | Complete already completed task | Completed task | 1. POST complete endpoint | Idempotent success |
| TC-024 | Reopen completed task | Completed task | 1. POST reopen endpoint | Status becomes PENDING |
| TC-025 | Create subtask | Parent task exists | 1. POST task with parent_task_id | Subtask linked to parent |
| TC-026 | Create dependency | Two tasks exist | 1. Set blocked-by relation | Dependency persisted |
| TC-027 | Bulk update priority | Multiple tasks selected | 1. PATCH `/tasks/bulk` | All selected tasks updated |
| TC-028 | Bulk complete tasks | Multiple pending tasks | 1. POST `/tasks/bulk/complete` | All selected tasks completed |
| TC-029 | Recurring task creation | Logged-in user | 1. Create recurring template | Recurrence rule stored |
| TC-030 | Calendar view rendering | Tasks with due dates | 1. Open calendar view | Tasks appear on correct dates |
| TC-031 | Search by keyword in title | Existing tasks | 1. Query tasks with `q` | Matching tasks returned |
| TC-032 | Search by keyword in description | Existing tasks | 1. Query tasks with text from description | Matching tasks returned |
| TC-033 | Filter by status | Tasks with mixed status | 1. Apply status filter | Only selected status shown |
| TC-034 | Filter by category | Tasks in multiple categories | 1. Apply category filter | Only category tasks shown |
| TC-035 | Filter by due date range | Tasks across dates | 1. Apply due_from/due_to | Only in-range tasks shown |
| TC-036 | Sort by due date asc | Multiple due dates | 1. sort_by=due_at asc | Ordered ascending by due date |
| TC-037 | Sort by priority desc | Mixed priorities | 1. sort_by=priority desc | Ordered by priority rule |
| TC-038 | Pagination first page | > page_size tasks | 1. Request page=1 | Correct page items + metadata |
| TC-039 | Pagination out-of-range page | Limited records | 1. Request high page number | Empty items with valid metadata |
| TC-040 | Combined search + filter | Task dataset | 1. Apply q + status + category | Intersection result returned |
| TC-041 | Create in-app reminder | Existing task | 1. Create reminder channel IN_APP | Reminder saved and scheduled |
| TC-042 | Create email reminder | Existing task | 1. Create reminder channel EMAIL | Reminder saved and queued |
| TC-043 | Create reminder in past | Existing task | 1. Set past remind_at | Validation error |
| TC-044 | Edit reminder time | Existing reminder | 1. PATCH reminder | New schedule persisted |
| TC-045 | Cancel reminder | Existing reminder | 1. DELETE reminder | Reminder disabled/removed |
| TC-046 | Reminder trigger in-app | Scheduled reminder due | 1. Wait trigger 2. Check notification center | In-app notification created |
| TC-047 | Reminder trigger email | Scheduled email reminder | 1. Wait trigger 2. Check delivery status | Email sent/queued status recorded |
| TC-048 | Mark notification read | Existing unread notification | 1. POST read endpoint | Status changes to READ |
| TC-049 | Mark all notifications read | Multiple unread notifications | 1. POST mark-all-read | All user notifications set READ |
| TC-050 | Notification list pagination | Many notifications | 1. GET notifications with page params | Correct paginated notifications |
| TC-051 | Timezone-aware reminder schedule | User timezone set | 1. Schedule reminder in local time | Trigger aligns with timezone |
| TC-052 | Reminder retry on transient failure | Provider intermittent failure | 1. Simulate send failure | Retry policy executes, status tracked |
| TC-053 | Dashboard summary counts | Mixed task statuses | 1. Open dashboard | Pending/completed/overdue counts accurate |
| TC-054 | Completion trend weekly chart | Historical task data | 1. Open trend tab | Weekly trend plotted correctly |
| TC-055 | Overdue report endpoint | Tasks overdue exist | 1. GET overdue report | Overdue tasks listed |
| TC-056 | Dashboard refresh after completion | One task pending | 1. Complete task 2. Refresh dashboard | Metrics update immediately |
| TC-057 | Empty-state dashboard | No tasks for user | 1. Open dashboard | Empty state guidance shown |
| TC-058 | Analytics endpoint unauthorized | No token | 1. Call dashboard API | Unauthorized response |
| TC-059 | Export tasks CSV success | Tasks exist | 1. Call export endpoint | CSV file generated/downloadable |
| TC-060 | Import tasks valid CSV | Valid template file | 1. Upload CSV | Tasks imported successfully |
| TC-061 | Import tasks invalid CSV | Malformed file | 1. Upload invalid CSV | Validation errors, no partial import |
| TC-062 | Audit log on task update | Existing task | 1. Update task 2. Query audit logs | Audit entry created |
| TC-063 | Audit log on login failure | Invalid login attempt | 1. Attempt invalid login | Security audit event captured |
| TC-064 | Category create/list | Logged-in user | 1. Create category 2. List categories | Category appears in list |
| TC-065 | Category delete with linked tasks | Category in use | 1. Delete category | Tasks set category null or blocked per rule |
| TC-066 | ICS calendar export | Due-dated tasks exist | 1. Request ICS export | Valid ICS feed returned |
| TC-067 | API rate limiting | High request burst | 1. Rapidly call API | Rate limit response (429) after threshold |
| TC-068 | JWT expiration handling | Expired access token | 1. Call protected API | 401 with token-expired error |
| TC-069 | Password hash security check | Existing user record | 1. Inspect stored password field | Password not stored in plaintext |
| TC-070 | SQL injection resistance | Authenticated user | 1. Submit injection pattern in search | No injection effect, sanitized behavior |
| TC-071 | XSS input handling | Authenticated user | 1. Save script-like task title 2. Render UI | Script not executed; output escaped |
| TC-072 | P95 list API latency check | Load test environment | 1. Run standard load profile | P95 <= 400 ms |
| TC-073 | Availability failover check | Staging failover setup | 1. Simulate instance failure | Service remains available per SLO |
| TC-074 | Accessibility keyboard navigation | UI loaded | 1. Navigate core flows via keyboard | All actions operable without mouse |
| TC-075 | Accessibility contrast/labels | UI loaded | 1. Run accessibility checks | WCAG AA criteria met for core pages |

## Coverage Note
Test cases are mapped to requirements in [25-traceability-matrix.md](25-traceability-matrix.md).
