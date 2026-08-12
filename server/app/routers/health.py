from fastapi import APIRouter

from ..schemas import Health

router = APIRouter(tags=["health"])


@router.get("/health", response_model=Health)
def health() -> Health:
    return Health(status="ok", app="dept-dash")
