from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controllers.task_controller import router as task_router
from .controllers.auth_controller import router as auth_router
from .core.config import settings

app = FastAPI(title="Smart Todo API")

# CORS: allow_origins cannot be ["*"] when allow_credentials=True.
# CORS_ORIGIN env var must be set to the exact frontend URL (Vercel domain).
# CDK injects this from the GitHub Actions secret CORS_ORIGIN.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,   # required for httpOnly cookie on cross-origin refresh
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(task_router, prefix="/api", tags=["tasks"])
