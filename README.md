# Todo App

A full-stack todo application built with React (Vite + Redux) on the frontend and Express + TypeScript + PostgreSQL on the backend.

## Prerequisites

- [Docker](https://www.docker.com/) — everything runs inside containers, no local Node.js required

---

## 1. First-time setup

Copy the example env file and set a strong JWT secret:

```bash
cp server/.env.example server/.env
```

Generate a secure `JWT_SECRET` and paste it into `server/.env`:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

> The DB credentials in `.env` are not used when running via Docker — the `docker-compose.yml` overrides them automatically. You only need the `.env` file to exist so the server starts without errors.

---

## 2. Start the project

```bash
docker compose up --build
```

Drop `--build` on subsequent starts (only needed when dependencies change or Dockerfiles change):

```bash
docker compose up
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

| Service             | URL                   |
| ------------------- | --------------------- |
| React client (Vite) | http://localhost:5173 |
| Express API         | http://localhost:3000 |
| PostgreSQL          | localhost:5432        |

---

## 3. Day-to-day workflow

**Start everything:**

```bash
docker compose up
```

**Stop everything:**

```bash
docker compose down
```

**Rebuild after installing a new npm package:**

```bash
docker compose up --build
```

**View logs for a specific service:**

```bash
docker compose logs -f server
docker compose logs -f client
```

**Run a command inside a container (e.g. check DB):**

```bash
docker compose exec db psql -U todo_user -d todo_db
```

Hot reload is enabled for both services — saving a file in `server/src/` or `client/src/` will reflect in the browser automatically without restarting containers.

---

## 4. Adding npm packages

Install the package inside the container so it goes into the correct `node_modules` volume, then rebuild:

```bash
# Server example
docker compose exec server npm install <package>

# Client example
docker compose exec client npm install <package>

# Rebuild to bake the updated package.json into the image
docker compose up --build
```

---

## 5. Reset the database

To wipe all data and re-apply the schema from scratch:

```bash
docker compose down -v   # removes volumes including postgres_data
docker compose up
```

---

## 6. Running without Docker (optional)

If you prefer to run services locally:

**Prerequisites:** Node.js v18+, a running PostgreSQL instance

```bash
# Start only the DB via Docker
docker compose up db -d

# Install dependencies
cd server && npm install
cd ../client && npm install

# Run in separate terminals
cd server && npm run dev      # API on port 3000
cd client && npm run dev      # Client on port 5173
```

Note: update `DB_HOST` to `localhost` in `server/.env` when running the server outside Docker.
