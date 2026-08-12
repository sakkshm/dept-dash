# dept-dash

Department Analytics Platform — React + FastAPI + PostgreSQL.

## Structure

- `client/` — React (Vite + TypeScript) SPA
- `server/` — FastAPI backend
- `docker-compose.yml` — PostgreSQL

## Quick start

```sh
docker compose up -d db          # start PostgreSQL

cd server && uv venv && uv pip install -r requirements.txt
uv run alembic upgrade head
uv run uvicorn app.main:app --reload

cd client && npm install && npm run dev
```

- API: http://localhost:8000 (docs at `/docs`)
- Client: http://localhost:5173
