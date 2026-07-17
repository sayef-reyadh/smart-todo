from fastapi import APIRouter, status
from ..schemas.auth import SignupRequest, LoginRequest, TokenResponse
from ..repositories.user_repository import UserRepository
from ..services.auth_service import AuthService
from ..core.config import settings

router = APIRouter()

_repo = UserRepository(settings.AWS_REGION, settings.DYNAMODB_USERS_TABLE_NAME)
_service = AuthService(_repo)


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest):
    user = _service.register(payload.name, payload.email, payload.password)
    _, token = _service.login(payload.email, payload.password)
    return TokenResponse(
        access_token=token,
        user_id=user.id,
        email=user.email,
        name=user.name,
        expires_in_minutes=settings.JWT_EXPIRE_MINUTES,
    )


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    user, token = _service.login(payload.email, payload.password)
    return TokenResponse(
        access_token=token,
        user_id=user.id,
        email=user.email,
        name=user.name,
        expires_in_minutes=settings.JWT_EXPIRE_MINUTES,
    )
