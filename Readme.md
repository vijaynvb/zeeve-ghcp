# Todo Application

- Secure Express API with MongoDB, JWT authentication, validation, rate limiting, and structured logging.
- React + Vite frontend styled with Bootstrap, featuring registration, login, task CRUD, and status filtering.

## Prerequisites
- Node.js 18+
- MongoDB instance (Atlas or self-hosted)

## Backend Setup
1. Navigate to backend: `cd backend`
2. Install dependencies: `npm install`
3. Copy environment template: `cp .env.example .env`
4. Update `.env`
	- `MONGODB_URI` with your MongoDB connection string
	- `JWT_SECRET` to a 32+ char random string
	- `CLIENT_ORIGIN` to allowed frontend origin(s), comma-separated if multiple
5. Start development server: `npm run dev`

### Useful Backend Scripts
- Build: `npm run build`
- Production start: `npm run start`

## Frontend Setup
1. Navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Copy environment template: `cp .env.example .env`
4. Update `VITE_API_BASE_URL` to backend URL (default `http://localhost:4000/api`)
5. Start development server: `npm run dev`

## API Overview
- `POST /api/auth/register` — create user account and receive JWT
- `POST /api/auth/login` — authenticate existing account
- `GET /api/tasks` — list tasks (optional `status` query)
- `POST /api/tasks` — create task
- `PUT /api/tasks/:taskId` — update task
- `DELETE /api/tasks/:taskId` — remove task
- `GET /api/categories` — list categories
- `POST /api/categories` — create category
- `PUT /api/categories/:categoryId` — update category
- `DELETE /api/categories/:categoryId` — delete category

Every request must include the `x-correlation-id` header. The frontend handles this automatically; external clients should add a UUID per request for traceability.