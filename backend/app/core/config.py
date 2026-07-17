# Compatible import for BaseSettings across pydantic v1/v2
try:
    from pydantic_settings import BaseSettings
except Exception:
    from pydantic import BaseSettings

from typing import Optional


class Settings(BaseSettings):
    # ── DynamoDB ──────────────────────────────────────────────────────────────
    # Injected by CDK as Lambda environment variables at deploy time
    AWS_REGION: str = "us-east-2"
    DYNAMODB_TABLE_NAME: str = "TASKS"
    DYNAMODB_USERS_TABLE_NAME: str = "USERS"

    # ── JWT ───────────────────────────────────────────────────────────────────
    # Must come from GitHub Actions secret → CDK → Lambda env (via SSM / Secrets Manager)
    # GitHub Actions: Settings → Secrets → JWT_SECRET_KEY
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 10   # 10 minutes — short-lived for security

    # ── Password pepper ───────────────────────────────────────────────────────
    # Must come from GitHub Actions secret → CDK → Lambda env (via SSM / Secrets Manager)
    # GitHub Actions: Settings → Secrets → PASSWORD_PEPPER
    PASSWORD_PEPPER: str

    class Config:
        env_file = (".env", ".env.local")
        extra = "ignore"


settings = Settings()
