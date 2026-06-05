# Smart ToDo - Acceptance Criteria

## Feature-Level Gherkin Acceptance Criteria

### AC-01 Registration (FR-001..FR-003)
- **Given** a new user on registration page, **when** valid name/email/password are submitted, **then** the account is created and success response is returned.
- **Given** an existing email, **when** user attempts registration, **then** system returns `409 CONFLICT` with actionable error.
- **Given** invalid password policy input, **when** user submits registration, **then** system rejects request with validation details.

### AC-02 Login and JWT Session (FR-004..FR-007)
- **Given** valid credentials, **when** user logs in, **then** access and refresh tokens are issued.
- **Given** invalid credentials, **when** login is attempted, **then** system returns `401 UNAUTHORIZED`.
- **Given** expired access token and valid refresh token, **when** refresh endpoint is called, **then** new access token is issued.

### AC-03 Task Creation and Editing (FR-009, FR-010, FR-014..FR-016)
- **Given** authenticated user, **when** required task fields are submitted, **then** task is persisted and returned with ID.
- **Given** existing task, **when** user edits title/due date/priority/category, **then** updates are saved and audit event is recorded.

### AC-04 Task Completion Lifecycle (FR-012, FR-013)
- **Given** pending task, **when** user marks complete, **then** status becomes `COMPLETED` and dashboard counters update.
- **Given** completed task, **when** user reopens it, **then** status becomes `PENDING` and completion metrics recalculate.

### AC-05 Search/Filter/Sort (FR-022..FR-026, FR-041)
- **Given** task dataset, **when** user applies status/category/date filters, **then** only matching tasks are returned.
- **Given** search keyword, **when** user searches title/description, **then** matching tasks are returned ranked by recency.
- **Given** dataset > page size, **when** user requests page N, **then** paginated metadata and page content are returned.

### AC-06 Reminder and Notification (FR-029..FR-033, FR-042)
- **Given** reminder configured before due date, **when** trigger time is reached, **then** reminder event is generated.
- **Given** in-app channel enabled, **when** reminder triggers, **then** notification appears in notification center.
- **Given** email channel enabled, **when** reminder triggers, **then** email notification is queued and delivery status recorded.
- **Given** user timezone is set, **when** reminder is scheduled, **then** trigger time is calculated in that timezone.

### AC-07 Dashboard and Overdue Analytics (FR-034..FR-036)
- **Given** user has tasks in mixed states, **when** dashboard loads, **then** summary metrics and trend graph are displayed.
- **Given** overdue tasks exist, **when** dashboard refreshes, **then** overdue count and recovery list are shown.

### AC-08 Data Governance and Utility (FR-037..FR-039, FR-049, FR-050)
- **Given** task status change occurs, **when** event is committed, **then** audit log entry is created.
- **Given** export requested, **when** user triggers CSV export, **then** system provides downloadable file with selected fields.
- **Given** import file format is invalid, **when** upload occurs, **then** system returns validation errors and no partial commit.
- **Given** calendar view selected, **when** tasks include due dates, **then** they appear on corresponding calendar cells.
- **Given** dependency set between tasks, **when** blocked task is selected, **then** blocker relationship is visible.
