# smart-todo

Industry-grade and university-ready software engineering repository for the Smart Todo App.

## Overview
This repo contains a React (Vite + TypeScript) frontend and a FastAPI backend following an MVC-style layout. Persistence is backed by **AWS DynamoDB** — locally emulated via [LocalStack](https://www.localstack.cloud/) running in Docker.

## Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for LocalStack)
- Git

---

## 1. Start LocalStack (DynamoDB)

From the repository root:

```powershell
docker compose up -d
```

This starts LocalStack on `http://localhost:4566` with DynamoDB, S3, and SQS available. The DynamoDB `TASKS` table is created automatically on first backend startup.

To stop:
```powershell
docker compose down
```

---

## 2. Backend (FastAPI) — Setup & Run

```powershell
cd backend

# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\Activate.ps1       # PowerShell
# .venv\Scripts\activate.bat     # CMD

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Copy local config
cp .env.example .env.local
# .env.local is pre-configured for LocalStack — no changes needed for local dev

# Run
fastapi dev main.py
```

API available at: **http://localhost:8000/api/tasks**

> **Note:** Make sure `docker compose up -d` is running before starting the backend, otherwise the DynamoDB connection will fail.

---

## 3. Frontend (React + Vite) — Setup & Run

```powershell
cd frontend
npm install
```

Optionally set the API base URL — create `frontend/.env`:

```
VITE_API_BASE_URL="http://localhost:8000/api"
```

Start the dev server:

```powershell
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## Running all three services together

| Service | Command | URL |
|---|---|---|
| LocalStack | `docker compose up -d` (root) | `http://localhost:4566` |
| Backend | `fastapi dev main.py` (backend/) | `http://localhost:8000` |
| Frontend | `npm run dev` (frontend/) | `http://localhost:5173` |

The frontend sends an `X-User-Id` header (default `frontend-user`) to simulate per-user task ownership.

---

## Environment config

| File | Purpose |
|---|---|
| `backend/.env.example` | Committed template — documents all variables |
| `backend/.env.local` | Local dev values (gitignored) — points to LocalStack |

Key variables:

| Variable | Local value | Production |
|---|---|---|
| `AWS_ENDPOINT_URL` | `http://localhost:4566` | unset (real AWS) |
| `AWS_REGION` | `us-east-1` | your AWS region |
| `DYNAMODB_TABLE_NAME` | `TASKS` | `TASKS` (or env-specific) |

In production, leave `AWS_ENDPOINT_URL` unset and provide credentials via IAM role or `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` environment variables.

---

## API summary

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/tasks` | Create task `{ title, description?, due_date? }` |
| `GET` | `/api/tasks` | List tasks for current user (`X-User-Id` header) |
| `GET` | `/api/tasks/{id}` | Get single task |
| `PATCH` | `/api/tasks/{id}` | Partial update e.g. `{ status: "COMPLETED" }` |
| `DELETE` | `/api/tasks/{id}` | Delete task |

Status values: `PENDING` or `COMPLETED`.

---

## Quick start recap

```powershell
# Terminal 1 — infrastructure
docker compose up -d

# Terminal 2 — backend
cd backend; .venv\Scripts\Activate.ps1; fastapi dev main.py

# Terminal 3 — frontend
cd frontend; npm run dev
```

