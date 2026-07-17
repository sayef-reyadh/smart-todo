from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controllers.task_controller import router as task_router
from .controllers.auth_controller import router as auth_router
from .core.config import settings

app = FastAPI(title="Smart Todo API")

# ── CORS configuration ────────────────────────────────────────────────────────
# CORS_ORIGINS_RAW is a comma-separated string injected by CDK from the
# CORS_ORIGINS_RAW GitHub Actions secret, e.g.:
#   "https://smart-todo-ruby.vercel.app,http://localhost:5173"
#
# Rules:
#   - allow_origins cannot be ["*"] when allow_credentials=True
#     (browsers reject it — required for the httpOnly refresh-token cookie)
#   - So we parse the raw string here explicitly
#   - If not set, we fall back to localhost only (safe default)
_cors_origins = [
    origin.strip()
    for origin in settings.CORS_ORIGINS_RAW.split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Set-Cookie"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(task_router, prefix="/api", tags=["tasks"])
