# Smart ToDo - Functional Requirements

| FR ID | Description | Priority | Business Justification | Related User Story |
|---|---|---|---|---|
| FR-001 | System shall allow user registration with name, unique email, and password. | High | Enables secure onboarding | US-001 |
| FR-002 | System shall enforce unique email constraint during account creation. | High | Prevents identity conflicts | US-001 |
| FR-003 | System shall enforce password policy (length, complexity). | High | Reduces account compromise risk | US-001 |
| FR-004 | System shall authenticate users with email/password and issue JWT access token. | High | Enables secure access | US-002 |
| FR-005 | System shall provide refresh-token endpoint for renewing access token. | High | Maintains secure session continuity | US-003 |
| FR-006 | System shall revoke/blacklist refresh token on logout. | High | Prevents session misuse | US-004 |
| FR-007 | System shall restrict access to protected APIs using JWT validation. | High | Protects user data | US-002 |
| FR-008 | System shall allow authenticated users to update profile details. | Medium | Improves account maintainability | US-005 |
| FR-009 | System shall allow users to create tasks with title and optional description. | High | Core value delivery | US-009 |
| FR-010 | System shall allow users to edit task fields (title, description, due date, priority, category). | High | Keeps plans accurate | US-010 |
| FR-011 | System shall allow users to soft-delete tasks. | Medium | Reduces clutter while preserving auditability | US-011 |
| FR-012 | System shall allow users to mark tasks as completed. | High | Enables progress tracking | US-012 |
| FR-013 | System shall allow users to reopen completed tasks. | Medium | Supports correction workflows | US-013 |
| FR-014 | System shall support due date assignment for tasks. | High | Enables deadline management | US-014 |
| FR-015 | System shall support priority levels (Low/Medium/High/Urgent). | High | Enables prioritization | US-015 |
| FR-016 | System shall allow assignment of tasks to categories. | High | Improves organization | US-016 |
| FR-017 | System shall allow users to create custom categories. | Medium | Supports user-specific workflows | US-019 |
| FR-018 | System shall list category metadata and usage counts. | Medium | Improves category governance | US-020 |
| FR-019 | System shall support recurring task templates (daily/weekly/monthly). | Medium | Reduces repetitive setup effort | US-021 |
| FR-020 | System shall support subtasks linked to parent task. | Medium | Enables breakdown of complex work | US-017 |
| FR-021 | System shall support task attachment metadata (link/filename). | Low | Preserves context references | US-017 |
| FR-022 | System shall provide keyword search across task title and description. | High | Improves retrieval efficiency | US-022 |
| FR-023 | System shall provide filter by task status. | High | Focuses execution view | US-023 |
| FR-024 | System shall provide filter by category. | High | Supports domain-based planning | US-024 |
| FR-025 | System shall provide filter by due date range. | High | Supports short-term planning | US-025 |
| FR-026 | System shall provide sorting by due date, priority, and created date. | Medium | Improves decision ordering | US-026 |
| FR-027 | System shall support bulk update of selected tasks (category/priority). | Medium | Saves operational effort | US-026 |
| FR-028 | System shall support bulk completion of selected tasks. | Medium | Accelerates task closure | US-012 |
| FR-029 | System shall allow users to create reminders for tasks. | High | Prevents deadline misses | US-027 |
| FR-030 | System shall allow users to edit reminder schedule and channel settings. | High | Maintains relevance of alerts | US-028 |
| FR-031 | System shall allow users to cancel reminders. | Medium | Reduces noise and confusion | US-029 |
| FR-032 | System shall create in-app notifications from triggered reminders. | High | Ensures real-time awareness | US-030 |
| FR-033 | System shall send email notifications for enabled reminders. | High | Extends reach outside app session | US-031 |
| FR-034 | System shall provide dashboard summary (pending, completed, overdue). | High | Gives operational visibility | US-034 |
| FR-035 | System shall provide completion trend charts by week/month. | Medium | Enables behavior improvement | US-035 |
| FR-036 | System shall highlight overdue tasks and provide recovery list. | High | Supports remediation of delays | US-032 |
| FR-037 | System shall record audit log for task and account critical events. | Medium | Supports traceability and compliance | US-036 |
| FR-038 | System shall export user tasks to CSV file. | Medium | Enables reporting and backup | US-037 |
| FR-039 | System shall import tasks from validated CSV template. | Low | Eases migration from other tools | US-038 |
| FR-040 | System shall support optimistic UI update reconciliation for task actions. | Low | Improves perceived responsiveness | US-039 |
| FR-041 | System shall support paginated task listing with total count metadata. | Medium | Preserves performance at scale | US-039 |
| FR-042 | System shall schedule reminders using user-configured timezone. | High | Prevents timing errors | US-033 |
| FR-043 | System shall support configurable language locale for date/time formats. | Low | Improves global usability | US-033 |
| FR-044 | System shall provide password reset request and token-based reset flow. | High | Enables account recovery | US-006 |
| FR-045 | System shall support user account deactivation with data retention policy. | Low | Supports lifecycle and compliance | US-007 |
| FR-046 | System shall provide admin API to suspend/reactivate user accounts. | Medium | Enables abuse and policy control | US-008 |
| FR-047 | System shall apply per-user API rate limiting policy for auth and task endpoints. | Medium | Protects system stability | US-008 |
| FR-048 | System shall support external calendar event export (ICS feed). | Low | Improves interoperability | US-040 |
| FR-049 | System shall provide calendar view of due-dated tasks. | Medium | Enhances temporal planning | US-040 |
| FR-050 | System shall support task dependency mapping (blocked by / blocks). | Medium | Prevents invalid execution order | US-018 |

## Requirement Notes
1. FR IDs are baseline-controlled and referenced in use cases, API design, test cases, and traceability matrix.
2. Implementation prioritizes High requirements for MVP, then Medium/Low by roadmap phase.
