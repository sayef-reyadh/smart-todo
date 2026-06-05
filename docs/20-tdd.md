# Smart ToDo - Technical Design Document (TDD)

## Technical Stack
| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Backend | Python FastAPI |
| Database | AWS DynamoDB (NoSQL) |
| Auth | JWT |
| Deployment | Docker on AWS |

## Backend Design by Layer

### 1. Controller Layer
- FastAPI routers per bounded context:
  - `/auth`
  - `/tasks`
  - `/categories`
  - `/reminders`
  - `/notifications`
  - `/analytics`
- Responsibilities: request parsing, validation, response mapping, status codes.

### 2. Service Layer
- Encapsulates business rules:
  - Task status transitions
  - Reminder scheduling logic
  - Dashboard aggregation logic
  - Dependency validation

### 3. Repository Layer
- Uses DynamoDB data-access repositories (boto3/PynamoDB style adapters).
- Responsibilities:
  - CRUD operations
  - Query composition through partition/sort keys and GSIs
  - Conditional writes and TransactWriteItems for integrity-sensitive operations

### 4. Authentication Layer
- JWT issuance and refresh token rotation.
- Password hashing with bcrypt/argon2.
- Dependency-based auth guards for protected routes.

### 5. Notification Service
- In-app notifications persisted in DB.
- Email notifications dispatched via provider adapter.
- Delivery status and retry policy tracked.

### 6. Error Handling
- Standard error payload:
```json
{
  "error_code": "TASK_NOT_FOUND",
  "message": "Task not found",
  "trace_id": "d3a7..."
}
```
- Central exception handlers for validation, auth, and domain errors.

### 7. Logging
- Structured JSON logs with correlation IDs.
- Key events: auth failures, task updates, reminder triggers, notification outcomes.

### 8. Monitoring
- Metrics: latency, error rate, reminder lag, queue depth.
- Traces: end-to-end API and background job spans.
- Alerts: SLO breach and critical failure thresholds.

### 9. Caching
- Optional Redis caching for dashboard aggregates and frequently used reference data.
- Cache invalidation on task mutation events.

### 10. Scalability Strategy
1. Stateless API instances behind load balancer.
2. Horizontal scaling for API and worker services.
3. DynamoDB key design and GSI optimization for list/filter/search.
4. Background job queue for reminder delivery spikes.

## Frontend Design Highlights
- Type-safe API client generation.
- State management for task list, filters, and notifications.
- Accessible component library with keyboard navigation.
- Optimistic UI for task actions with rollback on failure.

## Design-to-Requirement Mapping
| Design Area | Requirement IDs |
|---|---|
| Auth module | FR-001..FR-008, FR-044..FR-047 |
| Task module | FR-009..FR-028, FR-049..FR-050 |
| Reminder/notification module | FR-029..FR-033, FR-042 |
| Analytics module | FR-034..FR-036 |
| Governance utilities | FR-037..FR-039, FR-043, FR-048 |
