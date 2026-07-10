# Compatible import for BaseSettings across pydantic v1/v2
try:
    # pydantic v2 moved BaseSettings into pydantic-settings
    from pydantic_settings import BaseSettings
except Exception:
    # fallback for older pydantic versions
    from pydantic import BaseSettings

class Settings(BaseSettings):
    AWS_REGION: str = "us-east-1"
    DYNAMODB_TABLE_NAME: str = "TASKS"
    DYNAMODB_DEMO_TABLE_NAME: str = "TASKS_DEMO"

    class Config:
        env_file = (".env", ".env.local")  # .env.local overrides .env
        extra = "ignore"  # ignore unknown vars like LOCALSTACK_AUTH_TOKEN

settings = Settings()
