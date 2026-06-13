# Smart Todo App - Software Requirements Specification (SRS)

## 1. Introduction
### 1.1 Purpose
This SRS defines functional and non-functional requirements for Smart Todo App, a web application for task planning, reminders, and productivity analytics.

### 1.2 Scope
The system supports secure user access, task lifecycle management, reminders, notifications, dashboards, and operational governance using React (TypeScript), Python FastAPI, AWS DynamoDB (NoSQL), JWT, Docker, and AWS.

### 1.3 Definitions and Acronyms
| Term | Meaning |
|---|---|
| FR | Functional Requirement |
| NFR | Non-Functional Requirement |
| JWT | JSON Web Token |
| SRS | Software Requirements Specification |
| PRD | Product Requirements Document |

### 1.4 References
- PRD: [08-prd.md](08-prd.md)
- Functional Requirements: [13-functional-requirements.md](13-functional-requirements.md)
- Non-Functional Requirements: [14-non-functional-requirements.md](14-non-functional-requirements.md)
- Traceability: [25-traceability-matrix.md](25-traceability-matrix.md)

## 2. Overall Description
### 2.1 Product Perspective
Smart Todo App is a three-tier web system:
1. React (TypeScript) frontend for user interaction.
2. Python FastAPI backend for APIs/business logic.
3. AWS DynamoDB (NoSQL) for persistent storage.

### 2.2 Product Functions
- Account registration, login, token lifecycle, profile management
- Task CRUD, completion lifecycle, metadata organization
- Search/filter/sort/pagination
- Reminder scheduling and multi-channel notification
- Dashboard analytics, export/import, audit logging

### 2.3 User Classes
Students, professionals, freelancers, administrators.

### 2.4 Operating Environment
- Modern browsers (Chrome, Firefox, Edge, Safari)
- Backend in containerized Linux runtime on AWS
- AWS DynamoDB

### 2.5 Constraints
- JWT-based auth is mandatory.
- MVP schedule is constrained to academic timeline.
- Privacy and security controls are release gates.

### 2.6 Assumptions and Dependencies
- Email provider availability for outbound reminders.
- Reliable cloud networking and managed observability stack.

## 3. Functional Requirements
Complete baseline in [13-functional-requirements.md](13-functional-requirements.md).

### 3.1 Summary by Domain
| Domain | FR Range |
|---|---|
| Authentication & Account | FR-001..FR-008, FR-044..FR-047 |
| Task Lifecycle & Organization | FR-009..FR-021, FR-050 |
| Search/Planning Views | FR-022..FR-028, FR-041, FR-049 |
| Reminder/Notification | FR-029..FR-033, FR-042..FR-043 |
| Analytics/Governance | FR-034..FR-040, FR-048 |

## 4. Non-Functional Requirements
Complete baseline in [14-non-functional-requirements.md](14-non-functional-requirements.md).

### 4.1 Quality Attribute Summary
| Attribute | NFR IDs |
|---|---|
| Performance & Scalability | NFR-001..NFR-003, NFR-009 |
| Availability & Reliability | NFR-004..NFR-008 |
| Security & Compliance | NFR-010..NFR-014, NFR-024 |
| Accessibility & Usability | NFR-015, NFR-016, NFR-025 |
| Maintainability & Observability | NFR-017..NFR-023 |

## 5. External Interface Requirements
### 5.1 User Interfaces
Responsive web UI with keyboard support and accessible controls.

### 5.2 Software Interfaces
- GraphQL gateway over HTTPS.
- OAuth2-based authentication integration.
- SMTP relay provider integration.
- REST APIs over HTTPS with `/api/v1` versioning.
- JWT auth with short-lived access tokens.
- Email provider integration through transactional API endpoints.

### 5.3 Hardware Interfaces
No special hardware dependencies.

### 5.4 Communication Interfaces
HTTPS/TLS 1.2+, JSON payloads, SMTP/API for email service.

## 6. Assumptions and Constraints
1. Single-tenant user domain for MVP.
2. Team collaboration features are roadmap items, not MVP scope.
3. Monitoring and incident response procedures are mandatory before production.

## 7. Appendices
### Appendix A - Use Cases
See [15-use-cases.md](15-use-cases.md).

### Appendix B - DFD and ERD
See [16-dfd.md](16-dfd.md), [18-erd.md](18-erd.md).

### Appendix C - Verification
See [23-test-plan.md](23-test-plan.md), [24-test-cases.md](24-test-cases.md).
