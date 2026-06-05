# Smart ToDo - Data Flow Diagrams (DFD)

## Context Diagram
```mermaid
flowchart LR
  U[User] -->|Auth, Task, Reminder Requests| S[Smart ToDo System]
  S -->|Task Views, Notifications, Dashboards| U
  S -->|Store/Retrieve Data| DB[(MySQL Database)]
  S -->|Send Email Alerts| ES[Email Service]
  S -->|Deployment/Monitoring| AWS[AWS Services]
```

## Level 0 DFD
```mermaid
flowchart TD
  U[User]
  P1[1.0 User Management]
  P2[2.0 Task Management]
  P3[3.0 Reminder Management]
  P4[4.0 Notification Management]
  D1[(D1 Users)]
  D2[(D2 Tasks/Categories)]
  D3[(D3 Reminders)]
  D4[(D4 Notifications/Audit)]
  E1[Email Provider]

  U --> P1
  U --> P2
  U --> P3
  U --> P4

  P1 <--> D1
  P2 <--> D2
  P3 <--> D3
  P4 <--> D4

  P3 --> P4
  P4 --> E1
  P4 --> U
  P2 --> U
  P1 --> U
```

## Level 1 DFD - Process Decomposition
```mermaid
flowchart TD
  subgraph UM[1.0 User Management]
    UM1[1.1 Register]
    UM2[1.2 Authenticate]
    UM3[1.3 Token Refresh]
    UM4[1.4 Profile/Account Update]
  end

  subgraph TM[2.0 Task Management]
    TM1[2.1 Create/Update/Delete Task]
    TM2[2.2 Search/Filter/Sort]
    TM3[2.3 Complete/Reopen]
    TM4[2.4 Dashboard Aggregation]
  end

  subgraph RM[3.0 Reminder Management]
    RM1[3.1 Create/Edit/Cancel Reminder]
    RM2[3.2 Scheduler Trigger]
    RM3[3.3 Timezone Resolution]
  end

  subgraph NM[4.0 Notification Management]
    NM1[4.1 In-App Notification]
    NM2[4.2 Email Notification]
    NM3[4.3 Delivery Status Logging]
  end

  DBU[(Users)]:::db
  DBT[(Tasks/Categories)]:::db
  DBR[(Reminders)]:::db
  DBN[(Notifications/Audit)]:::db
  EP[Email Provider]

  UM1 --> DBU
  UM2 --> DBU
  UM3 --> DBU
  UM4 --> DBU
  TM1 --> DBT
  TM2 --> DBT
  TM3 --> DBT
  TM4 --> DBT
  RM1 --> DBR
  RM2 --> DBR
  RM3 --> DBU
  RM2 --> NM1
  RM2 --> NM2
  NM1 --> DBN
  NM2 --> EP
  NM2 --> DBN
  NM3 --> DBN

  classDef db fill:#f2f2f2,stroke:#777,stroke-width:1px;
```
