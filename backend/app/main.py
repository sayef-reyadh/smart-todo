from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controllers.task_controller import router as task_router
from .controllers.auth_controller import router as auth_router
from .core.config import settings

app = FastAPI(title="Smart Todo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # tightened to specific domains in production via CDK env var
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(task_router, prefix="/api", tags=["tasks"])
