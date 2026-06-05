# Smart ToDo - Use Cases

## UC-01 Register
| Field | Details |
|---|---|
| Actor | Guest User |
| Preconditions | User is not authenticated; email not registered |
| Primary Flow | 1) User opens register page 2) Enters profile and password 3) Submits form 4) System validates and creates account 5) Success response returned |
| Alternative Flow | A1: Email already exists -> show conflict error. A2: Invalid password -> show policy guidance. |
| Post Conditions | Account persisted; user can login |
| Related FR | FR-001, FR-002, FR-003 |

## UC-02 Login
| Field | Details |
|---|---|
| Actor | Registered User |
| Preconditions | Valid account exists |
| Primary Flow | 1) User enters credentials 2) System authenticates 3) JWT tokens issued 4) User redirected to dashboard |
| Alternative Flow | A1: Invalid credentials -> `401`. A2: Suspended account -> access denied. |
| Post Conditions | Authenticated session established |
| Related FR | FR-004, FR-005, FR-007, FR-046 |

## UC-03 Create Task
| Field | Details |
|---|---|
| Actor | Authenticated User |
| Preconditions | User logged in |
| Primary Flow | 1) User clicks create task 2) Enters title/details/due date/priority/category 3) Saves 4) Task appears in list |
| Alternative Flow | A1: Missing title -> validation error. A2: Invalid due date -> error response. |
| Post Conditions | New task stored and visible |
| Related FR | FR-009, FR-014, FR-015, FR-016 |

## UC-04 Edit Task
| Field | Details |
|---|---|
| Actor | Authenticated User |
| Preconditions | Task exists and owned by actor |
| Primary Flow | 1) User opens task 2) Updates fields 3) Saves 4) System records update and returns latest state |
| Alternative Flow | A1: Task not found -> `404`. A2: Unauthorized task -> `403`. |
| Post Conditions | Task updated; audit record added |
| Related FR | FR-010, FR-037 |

## UC-05 Delete Task
| Field | Details |
|---|---|
| Actor | Authenticated User |
| Preconditions | Task exists and owned by actor |
| Primary Flow | 1) User selects delete 2) Confirms 3) System soft-deletes task |
| Alternative Flow | A1: Already deleted -> idempotent success. |
| Post Conditions | Task hidden from default views; recoverable via audit/governance |
| Related FR | FR-011, FR-037 |

## UC-06 Search Task
| Field | Details |
|---|---|
| Actor | Authenticated User |
| Preconditions | User has task data |
| Primary Flow | 1) User enters keyword 2) System queries title/description 3) Matching tasks returned |
| Alternative Flow | A1: Empty query -> return default list. |
| Post Conditions | Filtered result set displayed |
| Related FR | FR-022, FR-041 |

## UC-07 Filter Task
| Field | Details |
|---|---|
| Actor | Authenticated User |
| Preconditions | User has tasks with metadata |
| Primary Flow | 1) User selects filters (status/category/date) 2) System applies criteria 3) Results sorted/paginated |
| Alternative Flow | A1: Invalid filter value -> `400`. |
| Post Conditions | User sees scoped planning view |
| Related FR | FR-023, FR-024, FR-025, FR-026, FR-041 |

## UC-08 Create Reminder
| Field | Details |
|---|---|
| Actor | Authenticated User |
| Preconditions | Task exists with due date or target time |
| Primary Flow | 1) User adds reminder rule 2) System validates schedule/timezone 3) Reminder stored 4) Trigger job scheduled |
| Alternative Flow | A1: Schedule in past -> validation error. |
| Post Conditions | Reminder ready for notification delivery |
| Related FR | FR-029, FR-030, FR-032, FR-033, FR-042 |

## UC-09 Complete Task
| Field | Details |
|---|---|
| Actor | Authenticated User |
| Preconditions | Task status is pending/in-progress |
| Primary Flow | 1) User marks complete 2) System updates task status 3) Dashboard metrics refresh 4) Audit event recorded |
| Alternative Flow | A1: Task already complete -> idempotent success. |
| Post Conditions | Task in completed state; analytics updated |
| Related FR | FR-012, FR-034, FR-035, FR-037 |
