# Smart ToDo Application - Project Overview

## Executive Summary
Smart ToDo is a web-based productivity platform for students and professionals to plan, prioritize, and complete work reliably. The product combines task management, reminders, smart filtering, and progress analytics to reduce missed deadlines and improve execution consistency.

## Project Background
User research across academic and professional groups showed fragmented productivity workflows: notes apps for capture, calendars for deadlines, messaging apps for reminders, and spreadsheets for reporting. This fragmentation creates context-switching costs and missed commitments.

## Business Problem
Current users lose time and trust because:
1. Tasks are captured but not structured.
2. Deadlines exist but reminders are inconsistent.
3. Progress is not visible, so planning quality degrades.

## Proposed Solution
Deliver a centralized productivity system with:
- Task lifecycle management (create, update, complete, delete)
- Categories, priorities, due dates, and search/filter
- Reminder and notification engine
- Dashboard insights and completion trends
- JWT-secured FastAPI backend, React (TypeScript) frontend, MySQL persistence, Dockerized AWS deployment

## Project Scope
| In Scope | Description |
|---|---|
| User account lifecycle | Register, login, JWT sessions, profile, password reset |
| Core task management | CRUD, status transitions, due dates, priorities |
| Organization | Categories, filters, search, sorting |
| Time management | Reminders and notification delivery |
| Analytics | Dashboard KPIs, completion progress, overdue visibility |
| Platform delivery | REST APIs, responsive UI, containerized deployment |

## Stakeholders
| Stakeholder Group | Primary Interest |
|---|---|
| End Users (students/professionals/freelancers) | Productivity, reliability, ease of use |
| Product Management | Adoption, retention, outcome metrics |
| Engineering | Build quality, maintainability, scalability |
| QA | Reliability, traceability, release confidence |
| Operations/DevOps | Availability, deployment automation, observability |
| Compliance/Security | Data protection, access control, auditability |

## Business Value
| Value Driver | Expected Outcome |
|---|---|
| Deadline adherence | Lower missed commitments |
| Productivity uplift | Higher task completion rates |
| Reduced planning friction | Faster daily and weekly planning |
| Better decision support | Data-driven improvement loops |

## Success Metrics
| Metric ID | Metric | Target (6 months) |
|---|---|---|
| SM-01 | 30-day active user retention | >= 45% |
| SM-02 | Weekly task completion ratio | >= 78% |
| SM-03 | Overdue task reduction (per active user) | >= 35% reduction |
| SM-04 | Reminder delivery success rate | >= 99.5% |
| SM-05 | P95 task list API latency | <= 400 ms |

## Assumptions
1. Users have reliable internet and modern browsers.
2. Email and in-app notification channels are available.
3. MVP focuses on single-user productivity before team collaboration.

## Constraints
| Constraint | Impact |
|---|---|
| Fixed semester timeline | Strict prioritization required |
| Limited initial engineering capacity | Scope disciplined to MVP |
| Regulatory/privacy expectations | Security-by-design required |

## Out Of Scope
1. Real-time multi-user collaboration on shared tasks (Phase 3).
2. Native mobile apps (web responsive first).
3. Third-party marketplace integrations beyond baseline calendar sync.
