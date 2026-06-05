# Smart Todo App - Interview Report

## Interview Framework
- Format: semi-structured, 35-45 minutes per participant
- Focus: planning behavior, deadline failure modes, reminder expectations
- Artifact linkage: findings mapped to US/FR/NFR IDs

## Persona 1 - University Student
### Background
Third-year Computer Science student juggling coursework, labs, and part-time tutoring.

### Questions, Answers, Pain Points, Requirements, Insights
| Question | Interviewee Answer | Pain Point | Requirement Extracted | Insight |
|---|---|---|---|---|
| How do you track assignments now? | Notes app + LMS calendar | Context split across tools | FR-009, FR-014, FR-016 | Centralized capture is mandatory |
| What causes missed submissions? | No reminder until too late | Late awareness | FR-029, FR-036 | Reminder lead-time presets needed |
| What would help in exam weeks? | Filter by high priority + due soon | Overload triage issue | FR-023, FR-025, FR-026 | Time-based filter must be first-class |

## Persona 2 - Software Engineer
### Background
Backend engineer managing sprint tasks, incidents, and learning goals.

| Question | Interviewee Answer | Pain Point | Requirement Extracted | Insight |
|---|---|---|---|---|
| What slows your planning? | Too many low-value tasks in one list | Signal-to-noise problem | FR-015, FR-023, FR-026 | Strong defaults for prioritization |
| How do reminders fail? | Repetitive alerts become noise | Alert fatigue | FR-030, FR-031, NFR-012 | Configurable reminder frequency |
| What metrics matter? | Weekly completion trend | No feedback loop | FR-034, FR-035 | Dashboard must be actionable |

## Persona 3 - Project Manager
### Background
PM coordinating milestones, dependencies, and stakeholder reporting.

| Question | Interviewee Answer | Pain Point | Requirement Extracted | Insight |
|---|---|---|---|---|
| What is hardest during delivery? | Tracking overdue action items | Escalation delay | FR-036, FR-037 | Overdue visibility and audit trail |
| How do you report progress? | Manual spreadsheet export | Reporting overhead | FR-038 | Export capability saves time |
| What quality concerns exist? | Inconsistent data entry | Data quality issues | FR-017, FR-018, NFR-020 | Controlled categories improve consistency |

## Persona 4 - Freelancer
### Background
Independent designer handling multiple clients and billing deadlines.

| Question | Interviewee Answer | Pain Point | Requirement Extracted | Insight |
|---|---|---|---|---|
| What causes stress? | Conflicting client deadlines | Priority conflict | FR-015, FR-024, FR-049 | Calendar + category lens is essential |
| What does "done" mean? | Need closure and logs | Lack of proof/history | FR-012, FR-037 | Completion should generate audit record |
| What feature would save most time? | Reuse recurring tasks | Repeated manual setup | FR-019 | Recurrence has high ROI |

## Consolidated Pain Points
1. Deadline awareness failure.
2. Poor prioritization under high task volume.
3. Lack of reliable reminders and notification controls.
4. Weak progress visibility for self-correction.

## Requirements Extracted (Top 12)
FR-009, FR-012, FR-014, FR-015, FR-019, FR-023, FR-025, FR-029, FR-034, FR-036, FR-037, FR-038.

## Interview Insight Summary
Users do not need more task capture tools; they need a dependable execution system that combines structure, reminders, and feedback loops.

