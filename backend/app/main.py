from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controllers.task_controller import router as task_router
from .core.config import settings

app = FastAPI(title="Smart Todo (MVC)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_router, prefix="/api", tags=["tasks"])
