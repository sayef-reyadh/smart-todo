from fastapi import APIRouter, status, Response, Request, HTTPException
from ..schemas.auth import SignupRequest, LoginRequest, TokenResponse, RefreshResponse
from ..repositories.user_repository import UserRepository
from ..repositories.refresh_token_repository import RefreshTokenRepository
from ..services.auth_service import AuthService
from ..core.config import settings

router = APIRouter()

_user_repo = UserRepository(settings.AWS_REGION, settings.DYNAMODB_USERS_TABLE_NAME)
_rt_repo   = RefreshTokenRepository()
_service   = AuthService(_user_repo, _rt_repo)

# Cookie name used for the refresh token
_RT_COOKIE = "refresh_token"


def _set_refresh_cookie(response: Response, token_id: str) -> None:
    """
    Store the refresh token in an httpOnly cookie.

    httpOnly  — JS cannot read this cookie (protects against XSS)
    secure    — sent over HTTPS only
    samesite  — "none" required for cross-origin (Vercel → API Gateway)
    max_age   — matches REFRESH_TOKEN_EXPIRE_DAYS so browser auto-clears it
    """
    response.set_cookie(
        key=_RT_COOKIE,
        value=token_id,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
        path="/api/auth",   # cookie only sent to auth endpoints
    )


def _clear_refresh_cookie(response: Response) -> None:
    response.delete_cookie(key=_RT_COOKIE, path="/api/auth", samesite="none", secure=True)


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest, response: Response):
    user = _service.register(payload.name, payload.email, payload.password)
    user, access_token, refresh_token = _service.login(payload.email, payload.password)
    _set_refresh_cookie(response, refresh_token.id)
    return TokenResponse(
        access_token=access_token,
        user_id=user.id,
        email=user.email,
        name=user.name,
        expires_in_minutes=settings.JWT_EXPIRE_MINUTES,
    )


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, response: Response):
    user, access_token, refresh_token = _service.login(payload.email, payload.password)
    _set_refresh_cookie(response, refresh_token.id)
    return TokenResponse(
        access_token=access_token,
        user_id=user.id,
        email=user.email,
        name=user.name,
        expires_in_minutes=settings.JWT_EXPIRE_MINUTES,
    )


@router.post("/refresh", response_model=RefreshResponse)
def refresh(request: Request, response: Response):
    """
    Silent token refresh — called automatically by the frontend axios interceptor
    when a 401 is received. The browser sends the httpOnly cookie automatically.

    Returns a new access_token. Slides the refresh token expiry forward.
    """
    token_id = request.cookies.get(_RT_COOKIE)
    if not token_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No refresh token cookie",
        )
    access_token, new_token = _service.refresh(token_id)
    # Rotation: cookie must carry the NEW token id, not the old one
    _set_refresh_cookie(response, new_token.id)
    return RefreshResponse(
        access_token=access_token,
        expires_in_minutes=settings.JWT_EXPIRE_MINUTES,
    )


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(request: Request, response: Response):
    """
    Revoke the refresh token in DB and clear the cookie.
    The access_token expires on its own within 10 minutes.
    """
    token_id = request.cookies.get(_RT_COOKIE)
    if token_id:
        _service.logout(token_id)
    _clear_refresh_cookie(response)

