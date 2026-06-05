# Smart Todo App - Documentation Repository

This repository section contains a complete end-to-end Requirements Engineering and **Software Development Life Cycle (SDLC)** documentation set for **Smart Todo App**, designed for both industry delivery and university teaching.

## Purpose
1. Provide production-grade project documentation with traceability.
2. Demonstrate full SDLC flow from discovery to release readiness.
3. Serve as a reusable teaching artifact for software engineering courses.

## Software Development Life Cycle (SDLC) Flow
```mermaid
flowchart TD
  A[Problem Discovery] --> B[Requirement Elicitation]
  B --> C[Product Requirements Document]
  C --> D[User Stories]
  D --> E[Requirements]
  E --> F[Software Requirements Specification]
  F --> G[Design]
  G --> H[Technical Design Document]
  H --> I[Database]
  I --> J[Application Programming Interface]
  J --> K[Implementation]
  K --> L[Testing]
  L --> M[Release]
```

## Technology Baseline
| Layer | Technology |
|---|---|
| Frontend | React (TypeScript) |
| Backend | Python FastAPI |
| Database | AWS DynamoDB (NoSQL: Not Only SQL) |
| Authentication | JSON Web Token (JWT) |
| Deployment | Docker on AWS |

## Repository Navigation
| # | Document | Focus Area |
|---|---|---|
| 01 | [Project Overview](01-project-overview.md) | Executive context, scope, value |
| 02 | [Problem Statement](02-problem-statement.md) | Current vs future state |
| 03 | [Stakeholder Analysis](03-stakeholder-analysis.md) | Influence-interest, RACI |
| 04 | [Information Gathering](04-information-gathering.md) | Elicitation methodology |
| 05 | [Interviews](05-interviews.md) | Qualitative findings |
| 06 | [Surveys](06-surveys.md) | Quantitative insights |
| 07 | [Feasibility Analysis](07-feasibility-analysis.md) | Technical/economic/operational feasibility |
| 08 | [Product Requirements Document (PRD)](08-prd.md) | Product requirements baseline |
| 09 | [User Personas](09-user-personas.md) | Persona definitions |
| 10 | [User Journey](10-user-journey.md) | End-to-end user flow |
| 11 | [User Stories](11-user-stories.md) | Epics and stories |
| 12 | [Acceptance Criteria](12-acceptance-criteria.md) | Gherkin-style criteria |
| 13 | [Functional Requirements](13-functional-requirements.md) | Functional Requirement IDs (FR-001..FR-050) |
| 14 | [Non-Functional Requirements](14-non-functional-requirements.md) | Non-Functional Requirement IDs (NFR-001..NFR-025) |
| 15 | [Use Cases](15-use-cases.md) | Use Case IDs (UC-01..UC-09) |
| 16 | [Data Flow Diagram (DFD)](16-dfd.md) | Context, Level 0, Level 1 |
| 17 | [Software Requirements Specification (SRS)](17-srs.md) | Institute of Electrical and Electronics Engineers style SRS |
| 18 | [Entity Relationship Diagram (ERD)](18-erd.md) | Entity relationships |
| 19 | [System Design](19-system-design.md) | Architecture and deployment |
| 20 | [Technical Design Document (TDD)](20-tdd.md) | Technical implementation design |
| 21 | [Database Design](21-database-design.md) | Schema, constraints, indexes |
| 22 | [Application Programming Interface (API) Design](22-api-design.md) | Representational State Transfer contracts |
| 23 | [Test Plan](23-test-plan.md) | Quality Assurance (QA) strategy |
| 24 | [Test Cases](24-test-cases.md) | Test Case IDs (TC-001..TC-077) |
| 25 | [Traceability Matrix](25-traceability-matrix.md) | User Story (US) -> Functional Requirement/Non-Functional Requirement (FR/NFR) -> Application Programming Interface (API) -> Test Case (TC) |
| 26 | [Risk Analysis](26-risk-analysis.md) | Risk register and mitigations |
| 27 | [Project Roadmap](27-project-roadmap.md) | Multi-phase timeline |
| 28 | [Signoff Document](28-signoff-document.md) | Formal approval template |

## Traceability Promise
- Every user story maps to functional requirements.
- Every requirement maps to verification tests.
- All requirements are represented in the traceability matrix.
