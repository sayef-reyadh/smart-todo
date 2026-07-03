# Compatible import for BaseSettings across pydantic v1/v2
try:
    # pydantic v2 moved BaseSettings into pydantic-settings
    from pydantic_settings import BaseSettings
except Exception:
    # fallback for older pydantic versions
    from pydantic import BaseSettings

from pathlib import Path

class Settings(BaseSettings):
    DATA_DIR: Path = Path(__file__).resolve().parents[2] / "data"
    TASKS_FILE: Path = DATA_DIR / "tasks.json"

    class Config:
        env_file = ".env"

settings = Settings()
