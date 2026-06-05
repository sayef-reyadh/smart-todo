# Smart ToDo - System Design

## High-Level Design
Smart ToDo follows a layered, API-first architecture:
1. **Presentation Layer:** React (TypeScript) SPA.
2. **Application Layer:** FastAPI services (auth, tasks, reminders, notifications, analytics).
3. **Data Layer:** MySQL for transactional storage.
4. **Platform Layer:** Dockerized deployment on AWS with observability.

## Architecture Diagram
```mermaid
flowchart LR
  U[Web User] --> FE[React TypeScript SPA]
  FE --> API[FastAPI Backend]
  API --> DB[(MySQL)]
  API --> Q[Reminder Scheduler/Worker]
  Q --> NS[Notification Service]
  NS --> EMAIL[Email Provider]
  API --> OBS[Logs/Metrics/Tracing]
  API --> AUTH[JWT Auth Module]
```

## Component Diagram
```mermaid
flowchart TD
  subgraph Frontend
    C1[Auth Module]
    C2[Task Board]
    C3[Filters/Search]
    C4[Dashboard]
    C5[Notification Center]
  end

  subgraph Backend_FastAPI
    B1[Auth Controller]
    B2[Task Controller]
    B3[Reminder Controller]
    B4[Notification Controller]
    B5[Analytics Controller]
    S1[Task Service]
    S2[Reminder Service]
    S3[Notification Service]
    S4[Analytics Service]
    R1[Repositories]
  end

  C1 --> B1
  C2 --> B2
  C3 --> B2
  C4 --> B5
  C5 --> B4
  B2 --> S1 --> R1
  B3 --> S2 --> R1
  B4 --> S3 --> R1
  B5 --> S4 --> R1
```

## Data Flow
```mermaid
sequenceDiagram
  participant User
  participant UI as React UI
  participant API as FastAPI
  participant DB as MySQL
  participant Worker as Reminder Worker
  participant Notif as Notification Service

  User->>UI: Create task with due date
  UI->>API: POST /api/v1/tasks
  API->>DB: Insert task
  DB-->>API: Task ID
  API-->>UI: 201 Created
  API->>Worker: Schedule reminder job
  Worker->>Notif: Trigger alert at remind_at
  Notif-->>UI: In-app notification
```

## Security Architecture
| Layer | Control |
|---|---|
| Identity | JWT access + refresh tokens |
| API | Route-level authorization and input validation |
| Data | Encryption in transit (TLS), hashed passwords |
| Audit | Auth and critical action logging with trace IDs |
| Platform | Secret management via AWS services and restricted IAM roles |

## Deployment Architecture
```mermaid
flowchart TD
  subgraph AWS
    ALB[Application Load Balancer]
    ECS[ECS/Fargate Service]
    RDS[(Amazon RDS MySQL)]
    CW[CloudWatch]
    S3[S3 Backups/Artifacts]
  end
  Client[Browser] --> ALB --> ECS --> RDS
  ECS --> CW
  RDS --> S3
```
