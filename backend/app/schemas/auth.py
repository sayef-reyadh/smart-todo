from pydantic import BaseModel, EmailStr
from typing import Optional


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    name: str
    # Included so the frontend can show JWT in action
    expires_in_minutes: int
