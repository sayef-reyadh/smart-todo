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
    DYNAMODB_REFRESH_TOKENS_TABLE_NAME: str = "REFRESH_TOKENS"

    # ── JWT ──────────────────────────────────────────────────────────────────────────────────
    # Must come from GitHub Actions secret → CDK → Lambda env (via SSM / Secrets Manager)
    # GitHub Actions: Settings → Secrets → JWT_SECRET_KEY
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 10   # 10 minutes — short-lived for security

    # ── Refresh token ─────────────────────────────────────────────────────────────────────
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7    # sliding window resets on every use
    REFRESH_TOKEN_ABSOLUTE_MAX_DAYS: int = 90  # hard limit — never extended

    # ── Password pepper ───────────────────────────────────────────────────────
    # Must come from GitHub Actions secret → CDK → Lambda env (via SSM / Secrets Manager)
    # GitHub Actions: Settings → Secrets → PASSWORD_PEPPER
    PASSWORD_PEPPER: str

    # ── CORS ──────────────────────────────────────────────────────────────────
    # Comma-separated list of allowed origins, e.g.:
    #   "https://smart-todo-ruby.vercel.app,http://localhost:5173"
    # Cannot be "*" when allow_credentials=True (required for httpOnly cookies).
    CORS_ORIGINS_RAW: str = "http://localhost:5173"

    @property
    def CORS_ORIGINS(self) -> list[str]:
        return [o.strip() for o in self.CORS_ORIGINS_RAW.split(",") if o.strip()]

    class Config:
        env_file = (".env", ".env.local")
        extra = "ignore"


settings = Settings()
