from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="DEPTDASH_")

    app_name: str = "Department Analytics Platform"
    database_url: str = "postgresql+psycopg2://deptdash:deptdash@localhost:5432/deptdash"
    jwt_secret: str = "dev-secret-change-me"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24

    cors_origins: list[str] = ["http://localhost:5173"]


settings = Settings()
