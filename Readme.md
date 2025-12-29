# Todo Task Management Platform

Secure MERN solution providing JWT-authenticated task tracking, category management, and structured observability aligned with project guidelines.

## Highlights
- Layered Express API with JWT auth, rate limiting, and Zod validation
- MongoDB persistence for users, tasks, and categories
- Correlation-aware logging via pino for end-to-end tracing
- React + Vite frontend with Bootstrap styling and session handling

## Prerequisites
- Node.js 18 or newer (npm 10 bundled)
- MongoDB database (Atlas or self-hosted)
- Environment variables (see `.env.example`, `backend/.env.example`, `frontend/.env.example`)
  - Backend: `PORT`, `MONGODB_URI`, `JWT_SECRET` (32+ chars), `CLIENT_ORIGIN`, `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX_REQUESTS`, `LOG_LEVEL`
  - Frontend: `VITE_API_BASE_URL`

| Variable | Description |
| --- | --- |
| `PORT` | HTTP port for the backend server |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Symmetric key for signing tokens (≥ 32 chars) |
| `CLIENT_ORIGIN` | Allowed comma-separated frontend origins |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in milliseconds |
| `RATE_LIMIT_MAX_REQUESTS` | Maximum requests per window per IP |
| `LOG_LEVEL` | Pino log level (e.g., `info`, `debug`) |
| `VITE_API_BASE_URL` | Frontend API base URL pointing to backend |

## Folder Structure Overview
```
.
├─ backend
│  ├─ src
│  │  ├─ config
│  │  ├─ controllers
│  │  ├─ middlewares
│  │  ├─ models
│  │  ├─ repositories
│  │  ├─ routes
│  │  ├─ services
│  │  ├─ types
│  │  └─ validators
│  └─ tsconfig.json
├─ frontend
│  ├─ src
│  │  ├─ components
│  │  ├─ context
│  │  ├─ hooks
│  │  ├─ services
│  │  ├─ types
│  │  └─ utils
│  └─ tsconfig.json
├─ .github/instructions
└─ Readme.md
```

## Backend Setup
1. Change directory: `cd backend`
2. Install dependencies: `npm install`
3. Copy env template: `cp .env.example .env`
4. Populate variables (Mongo URI, JWT secret, client origins, rate limits)
5. Start development server: `npm run dev`

### Backend Build & Run
- Build TypeScript: `npm run build`
- Production start: `npm run start`

### Backend Tests
- Unit test skeletons reside in `src/services/__tests__`
- Recommended stack: Jest + ts-jest or Vitest
- Once configured, run `npm test`

## Frontend Setup
1. Change directory: `cd frontend`
2. Install dependencies: `npm install`
3. Copy env template: `cp .env.example .env`
4. Set `VITE_API_BASE_URL` (default `http://localhost:4000/api`)
5. Run Vite dev server: `npm run dev`

### Frontend Build & Preview
- Build bundle: `npm run build`
- Preview bundle: `npm run preview`

### Frontend Tests
- Suggested stack: Vitest + React Testing Library
- After setup, run component tests with `npm test`

## API Endpoints
- `POST /api/auth/register` — create account and receive JWT
- `POST /api/auth/login` — authenticate and obtain JWT
- `GET /api/tasks` — list tasks (supports `status` query)
- `POST /api/tasks` — create task (title, optional description/status/dueDate/categoryId)
- `PUT /api/tasks/:taskId` — update task fields
- `DELETE /api/tasks/:taskId` — remove task
- `GET /api/categories` — list categories
- `POST /api/categories` — create category
- `PUT /api/categories/:categoryId` — update category
- `DELETE /api/categories/:categoryId` — delete category

Include header `x-correlation-id` for observability. Frontend injects this automatically; external clients should send a UUID per request.

## Coding Standards & References
- Follow shared guidelines in `.github/instructions/` (TypeScript, Express, React, security, observability)
- Enforce layered architecture (controller → service → repository)
- Use Zod validation, structured logging (pino), and avoid unsafe patterns (no eval, no dynamic SQL)

## License & Contact
- License: MIT (update if different)
- Contact: Platform Engineering Team — engineering@company.com