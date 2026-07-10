# Compatible import for BaseSettings across pydantic v1/v2
try:
    # pydantic v2 moved BaseSettings into pydantic-settings
    from pydantic_settings import BaseSettings
except Exception:
    # fallback for older pydantic versions
    from pydantic import BaseSettings

from typing import Optional

class Settings(BaseSettings):
    AWS_REGION: str = "us-east-1"
    # Set only for local development (LocalStack). Leave unset in production.
    AWS_ENDPOINT_URL: Optional[str] = None
    DYNAMODB_TABLE_NAME: str = "TASKS"

    class Config:
        env_file = (".env", ".env.local")  # .env.local overrides .env
        extra = "ignore"  # ignore unknown vars like LOCALSTACK_AUTH_TOKEN

settings = Settings()
