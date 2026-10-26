# CapabilityFlow — merged hackathon build

**Product:** Evidence-based capability intelligence from learning claims, public work evidence and market context.

This build merges:
- the polished CapabilityFlow landing/auth + Recruiter + University frontend from the teammate UI package;
- the student Resume → GitHub/LeetCode evidence flow;
- the 50-role capability taxonomy;
- SAS-derived market-demand / capability-flow data;
- a FastAPI backend that exposes real-time resume, GitHub and LeetCode evidence plus market APIs.

## Architecture

`React/Vite frontend` → `FastAPI backend` → `Resume extraction + GitHub public REST + LeetCode public GraphQL + SAS market datasets`

The product deliberately does **not** claim that an AI can prove mastery. Evidence states are:
- **SUPPORTED** — multiple independent signals support the capability.
- **PARTIAL** — at least one observable signal exists.
- **UNVERIFIED** — claimed in the resume but not independently observed.
- **NOT CLAIMED** — evidence exists but the resume does not claim the skill.

Market percentages are aggregate dataset signals, not personal capability scores.

## Run locally

### 1. Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Frontend

Copy `.env.example` to `.env` and fill the Supabase values.

```powershell
npm install
npm run dev
```

Open `http://localhost:5173`.

## Deploy

### Backend — Render

Deploy the repository using `render.yaml`, or create a Python web service with:
- Root directory: `backend`
- Build: `pip install -r requirements.txt`
- Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`

Set `CORS_ORIGINS` to the deployed frontend origin.

### Frontend — Vercel

Import the repository into Vercel. The Vite app is in the repository root.

Set:
- `VITE_API_URL=https://YOUR-BACKEND.onrender.com`
- `VITE_SUPABASE_URL=...`
- `VITE_SUPABASE_PUBLISHABLE_KEY=...`

`vercel.json` rewrites SPA routes to `index.html`.

## Important

Do not commit `.env`, access tokens, private GitHub tokens, or other secrets.

GitHub public repository analysis uses public REST endpoints. LinkedIn is intentionally claim-only in this build; it is not scraped. A future LinkedIn connection should use an official OAuth integration.
