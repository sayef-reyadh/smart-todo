# smart-todo

Industry-grade and university-ready software engineering repository for the Smart Todo App.

## Overview
This repo contains a React (Vite + TypeScript) frontend and a FastAPI backend following an MVC-style layout. Persistence is backed by **AWS DynamoDB** (real AWS — no local emulator needed).

## Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- AWS CLI configured (`aws configure`) with a user that has DynamoDB permissions
- Git

---

## 1. Create DynamoDB tables (AWS CLI)

Run once before starting the backend. Tables are created in your configured AWS region.

### TASKS table (main app)
```powershell
aws dynamodb create-table `
  --table-name TASKS `
  --attribute-definitions `
    AttributeName=id,AttributeType=S `
    AttributeName=user_id,AttributeType=S `
  --key-schema AttributeName=id,KeyType=HASH `
  --billing-mode PAY_PER_REQUEST `
  --global-secondary-indexes '[{"IndexName":"user_id-index","KeySchema":[{"AttributeName":"user_id","KeyType":"HASH"}],"Projection":{"ProjectionType":"ALL"}}]' `
  --region us-east-1
```

### TASKS_DEMO table (DynamoDB key patterns demo — PK, PK+SK, GSI, LSI)
```powershell
aws dynamodb create-table `
  --table-name TASKS_DEMO `
  --attribute-definitions `
    AttributeName=user_id,AttributeType=S `
    AttributeName=created_at,AttributeType=S `
    AttributeName=status,AttributeType=S `
    AttributeName=due_date,AttributeType=S `
  --key-schema `
    AttributeName=user_id,KeyType=HASH `
    AttributeName=created_at,KeyType=RANGE `
  --billing-mode PAY_PER_REQUEST `
  --global-secondary-indexes '[{"IndexName":"status-created_at-index","KeySchema":[{"AttributeName":"status","KeyType":"HASH"},{"AttributeName":"created_at","KeyType":"RANGE"}],"Projection":{"ProjectionType":"ALL"}}]' `
  --local-secondary-indexes '[{"IndexName":"due_date-index","KeySchema":[{"AttributeName":"user_id","KeyType":"HASH"},{"AttributeName":"due_date","KeyType":"RANGE"}],"Projection":{"ProjectionType":"ALL"}}]' `
  --region us-east-1
```

### Verify tables are ACTIVE
```powershell
aws dynamodb list-tables --region us-east-1
aws dynamodb describe-table --table-name TASKS      --region us-east-1 --query "Table.TableStatus"
aws dynamodb describe-table --table-name TASKS_DEMO --region us-east-1 --query "Table.TableStatus"
```

### Delete tables (cleanup)
```powershell
aws dynamodb delete-table --table-name TASKS      --region us-east-1
aws dynamodb delete-table --table-name TASKS_DEMO --region us-east-1
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
# Edit .env.local and set AWS_REGION to match your configured region

# Run
fastapi dev main.py
```

API available at: **http://localhost:8000/api/tasks**

Swagger docs at: **http://localhost:8000/docs**

---

## 3. Frontend (React + Vite) — Setup & Run

```powershell
cd frontend
npm install
```

Optionally create `frontend/.env`:
```
VITE_API_BASE_URL="http://localhost:8000/api"
```

```powershell
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## Running both services

| Service | Command | URL |
|---|---|---|
| Backend | `fastapi dev main.py` (backend/) | `http://localhost:8000` |
| Frontend | `npm run dev` (frontend/) | `http://localhost:5173` |

---

## Environment config

| File | Purpose |
|---|---|
| `backend/.env.example` | Committed template |
| `backend/.env.local` | Local overrides (gitignored) |

Key variables:

| Variable | Default | Notes |
|---|---|---|
| `AWS_REGION` | `us-east-1` | Must match where you created the tables |
| `DYNAMODB_TABLE_NAME` | `TASKS` | Main app table |
| `DYNAMODB_DEMO_TABLE_NAME` | `TASKS_DEMO` | Key patterns demo table |

Credentials are picked up from `~/.aws/credentials` (AWS CLI) or IAM role automatically — never hardcoded.

---

## API summary

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/tasks` | Create task `{ title, description?, due_date? }` |
| `GET` | `/api/tasks` | List tasks for current user (`X-User-Id` header) |
| `GET` | `/api/tasks/{id}` | Get single task |
| `PATCH` | `/api/tasks/{id}` | Partial update e.g. `{ status: "COMPLETED" }` |
| `DELETE` | `/api/tasks/{id}` | Delete task |
| `POST` | `/api/demo/seed` | Insert 10 sample tasks into TASKS_DEMO |
| `GET` | `/api/demo/pk` | Query by partition key |
| `GET` | `/api/demo/pk-sk-range` | Query by composite key range |
| `GET` | `/api/demo/gsi` | Query via GSI (by status) |
| `GET` | `/api/demo/lsi` | Query via LSI (by due date) |

Status values: `PENDING` or `COMPLETED`.

---

## DynamoDB Demo page

Navigate to **http://localhost:5173/dynamo-demo** to interactively showcase:
- Partition Key query
- Composite Key (PK + SK) range query
- Global Secondary Index (GSI) query
- Local Secondary Index (LSI) query

---

## Quick start recap

```powershell
# One-time: create tables
aws dynamodb create-table --table-name TASKS ...      (see above)
aws dynamodb create-table --table-name TASKS_DEMO ... (see above)

# Terminal 1 — backend
cd backend; .venv\Scripts\Activate.ps1; fastapi dev main.py

# Terminal 2 — frontend
cd frontend; npm run dev
```


