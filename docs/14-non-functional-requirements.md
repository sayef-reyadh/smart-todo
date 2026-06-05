# Smart Todo App - Non-Functional Requirements

| NFR ID | Category | Requirement (Measurable Target) |
|---|---|---|
| NFR-001 | Performance | System shall support >= 2,000 concurrent users with no critical degradation. |
| NFR-002 | Performance | P95 latency for task list/search/filter APIs shall be <= 400 ms under normal load. |
| NFR-003 | Performance | Reminder scheduling drift shall be <= 60 seconds for 99% of reminders. |
| NFR-004 | Availability | Monthly service availability shall be >= 99.9%. |
| NFR-005 | Availability | Planned maintenance downtime shall not exceed 2 hours/month. |
| NFR-006 | Reliability | Failed background jobs shall be retried automatically up to 3 times with backoff. |
| NFR-007 | Reliability | Data durability shall ensure no acknowledged write loss (RPO = 0 for primary DB). |
| NFR-008 | Reliability | Production backup restoration test shall pass at least once per month. |
| NFR-009 | Scalability | Horizontal scale-out shall support 3x baseline load within 15 minutes. |
| NFR-010 | Security | All API endpoints (except public auth flows) shall require valid JWT. |
| NFR-011 | Security | Access tokens shall expire in <= 15 minutes; refresh tokens in <= 7 days. |
| NFR-012 | Security | Sensitive data in transit shall use TLS 1.2+; passwords stored with bcrypt/argon2. |
| NFR-013 | Security | System shall log authentication and authorization failures with trace IDs. |
| NFR-014 | Security | Critical vulnerabilities (CVSS >= 9) shall be remediated before release. |
| NFR-015 | Accessibility | UI shall conform to WCAG 2.1 AA for core user flows. |
| NFR-016 | Accessibility | All interactive UI controls shall be keyboard accessible. |
| NFR-017 | Maintainability | Backend modules shall maintain unit test coverage >= 80%. |
| NFR-018 | Maintainability | API changes shall be backward compatible within minor version releases. |
| NFR-019 | Maintainability | Static code analysis shall pass with no blocker/critical issues in CI. |
| NFR-020 | Observability | System shall provide metrics, logs, and traces for all critical services. |
| NFR-021 | Observability | P1 incidents shall trigger alerting within 2 minutes of threshold breach. |
| NFR-022 | Portability | Application shall run consistently in Docker across dev, staging, and prod. |
| NFR-023 | Portability | Infrastructure provisioning shall be scriptable and reproducible on AWS. |
| NFR-024 | Compliance | User deletion/deactivation requests shall be processed within 30 days. |
| NFR-025 | Usability | First-time user shall create first task within <= 3 minutes in usability tests. |

## NFR Verification Approach
| Category | Verification Method |
|---|---|
| Performance/Scalability | Load and stress testing |
| Availability/Reliability | Chaos drills, failover and restore tests |
| Security | SAST/DAST, penetration testing, auth abuse tests |
| Accessibility | Automated scans + manual keyboard/screen-reader testing |
| Maintainability | CI quality gates, test coverage reporting |
| Observability | Alert validation and telemetry completeness checks |

