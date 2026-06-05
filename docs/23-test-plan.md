# Smart ToDo - Test Plan

## QA Strategy
Adopt risk-based, requirement-traceable testing across API, UI, integration, security, and performance to validate release readiness for Smart ToDo.

## Test Objectives
| Objective ID | Objective |
|---|---|
| TPO-01 | Validate all functional requirements (FR-001..FR-050) |
| TPO-02 | Validate key non-functional requirements (NFR-001..NFR-025) |
| TPO-03 | Prevent high-severity defects from reaching production |
| TPO-04 | Ensure end-to-end flow from registration to completion works reliably |

## Scope
### In Scope
- Authentication and account lifecycle
- Task management and organization
- Reminder and notification flows
- Dashboard and analytics
- Import/export and audit features

### Out of Scope
- Native mobile apps
- Collaboration features planned for later phases

## Entry Criteria
1. Requirements baseline approved.
2. API contracts available.
3. Test environment provisioned on AWS staging.
4. Build deployed with known configuration.

## Exit Criteria
1. 100% High-priority FR tests passed.
2. No open Critical/High defects.
3. NFR baseline met for performance, security, and availability gates.
4. Traceability matrix updated and complete.

## Test Types
| Test Type | Purpose | Sample Coverage |
|---|---|---|
| Unit Testing | Validate isolated logic | Token utilities, service rules |
| API Testing | Validate endpoints and contracts | Auth, task, reminder, notification APIs |
| Integration Testing | Validate service interactions | Reminder trigger -> notification delivery |
| UI Testing | Validate user workflows | Registration, task CRUD, dashboard |
| Regression Testing | Prevent feature breakage | Full smoke + critical path |
| Security Testing | Validate auth and data protection | JWT misuse, unauthorized access |
| Performance Testing | Validate latency/throughput | Task list search/filter under load |
| Accessibility Testing | Validate WCAG alignment | Keyboard navigation and labels |

## Test Environment
| Layer | Environment |
|---|---|
| Frontend | React (TypeScript) build on staging |
| Backend | FastAPI service (Docker) |
| Database | MySQL staging instance |
| Infra | AWS (ALB, containers, monitoring) |
| Tooling | API test runner, UI automation, load test tools |

## Defect Management
| Severity | Definition | SLA |
|---|---|---|
| Critical | Production blocker/security exploit | Fix before release |
| High | Major feature unusable | Fix in current cycle |
| Medium | Partial impact with workaround | Fix in next planned sprint |
| Low | Minor issue/no major impact | Backlog prioritization |

## Risk Management in QA
| Risk | Impact | Mitigation |
|---|---|---|
| Incomplete requirement coverage | Escaped defects | Strict traceability gate |
| Environment instability | Delayed testing | Environment health checks and fallback windows |
| Flaky automation | False signals | Stabilize tests and quarantine policy |
| Notification provider variance | Intermittent failures | Mock + real provider contract tests |

## Deliverables
1. Test cases and execution report
2. Defect log and triage summary
3. Regression results
4. Release quality recommendation
