# smart-todo

Industry-grade and university-ready software engineering repository for the Smart Todo App.

## Overview
This repo contains a React (Vite + TypeScript) frontend and a FastAPI backend following an MVC-style layout. The current implementation uses a lightweight JSON-backed repository (backend/data/tasks.json) for local development. A database will be integrated later.

## Prerequisites
- Node.js (18+ recommended) and npm
- Python 3.10+ (Windows)
- Git

## Backend (FastAPI) — Setup & Run (Windows)
1. From repository root, open PowerShell or CMD.

2. Create and activate a virtual environment (PowerShell):

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1   # PowerShell
# or for CMD:
# .venv\Scripts\activate.bat
```

3. Install Python dependencies:

```powershell
pip install --upgrade pip
pip install -r requirements.txt
```

4. Run the app with fastapi dev (recommended):

```powershell
# from repository root
cd backend
fastapi dev main.py
```


The API base will be available at: http://localhost:8000/api/tasks

Notes:
- If you get "No module named uvicorn", ensure requirements were installed into the active virtualenv.
- Data file used for persistence: `backend/data/tasks.json` (JSON storage for development only).

## Frontend (React + Vite) — Setup & Run
1. From repository root:

```bash
cd frontend
npm install
```

2. (Optional) Set the API base URL for local development. Create `frontend/.env` with:

```
VITE_API_BASE_URL="http://localhost:8000/api"
```

If not set, the frontend uses relative paths and you should configure a Vite proxy in `vite.config.ts` to forward `/api` to the backend.

3. Start the dev server:

```bash
npm run dev
```

Vite dev server typically runs at http://localhost:5173.

## Running both services together
- Start the backend (step above) on port 8000.
- Start the frontend (step above) on port 5173.
- The frontend hooks expect the backend API at `<VITE_API_BASE_URL>/tasks` or at `/api/tasks` if using proxy.
- The frontend supplies a header `X-User-Id` (default `frontend-user`) to simulate auth/ownership.

## API summary (development)
- POST   /api/tasks           -> create task (body: { title, description?, due_date? })
- GET    /api/tasks           -> list tasks for current user (X-User-Id header)
- PATCH  /api/tasks/{id}      -> partial update (e.g., { status: 'COMPLETED' })
- DELETE /api/tasks/{id}      -> delete task

Status values: `PENDING` or `COMPLETED`.

## Frontend examples
- fetch example (useTodosFetch): uses native fetch to call the API and demonstrates load/add/toggle/delete operations.
- axios example (useTodosAxios): same functionality implemented with axios. The dependency was added to `frontend/package.json`.

## Development notes & next steps
- The JSON repository is for development only and is not safe for concurrent production use.
- Replace repository with a real DB (SQLModel/SQLAlchemy + migrations) before production.
- Replace header-based auth with real authentication (JWT/OAuth2) for multi-user security.
- Consider adding tests, OpenAPI documentation examples, and a Vite proxy to simplify dev runs.

## Quick start recap
1. Backend: `cd backend` -> create venv -> `pip install -r requirements.txt` -> `fastapi dev main.py`
2. Frontend: `cd frontend` -> `npm install` -> optionally set `VITE_API_BASE_URL` -> `npm run dev`

Enjoy developing! If you want, I can add a Vite proxy snippet to `vite.config.ts` and a .env.example file.  
