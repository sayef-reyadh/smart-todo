# smart-todo

Industry-grade and university-ready software engineering documentation repository for the **Smart Todo App**.

## Repository Purpose
This repository demonstrates a complete **Software Development Life Cycle (SDLC)** and Requirements Engineering journey:

Problem Discovery -> Requirement Elicitation -> Product Requirements Document (PRD) -> User Stories -> Requirements -> Software Requirements Specification (SRS) -> Design -> Technical Design Document (TDD) -> Database -> Application Programming Interface (API) -> Testing -> Release

## Technology Stack
| Layer | Technology |
|---|---|
| Frontend | React (TypeScript) |
| Backend | Python FastAPI |
| Database | AWS DynamoDB (NoSQL: Not Only SQL) |
| Authentication | JSON Web Token (JWT) |
| Deployment | Docker on AWS |

## Documentation
All detailed artifacts are under [`docs/`](docs), with full navigation in:

- [`docs/README.md`](docs/README.md)

Key documents include project overview, elicitation artifacts, Product Requirements Document (PRD), Software Requirements Specification (SRS), design, Application Programming Interface (API)/database specifications, testing, traceability matrix, risk register, roadmap, and signoff template.

## Initial Phase
The frontend application was bootstrapped with Vite + React + TypeScript:

```bash
npx create-vite frontend --template react-ts
```

This created the `frontend/` project and installed the initial npm dependencies.

## Run Frontend App
Use the following commands from the repository root:

```bash
cd frontend
npm install
npm run dev
```

The app will start on the Vite development server (typically `http://localhost:5173`).
