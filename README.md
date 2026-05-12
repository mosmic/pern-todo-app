# Todo App

A full-stack todo application built with React (Vite + Redux) on the frontend and Express + TypeScript + PostgreSQL on the backend.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Docker](https://www.docker.com/) (for the database)

---

## 1. Start the database

```bash
docker-compose up -d
```

This starts a PostgreSQL container with the schema already applied. No manual SQL commands needed.

---

## 2. Server environment variables

```bash
cp server/.env.example server/.env
```

The defaults in `.env.example` match the Docker Compose configuration, so the server will connect without any changes. The only value you should update before deploying is `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 3. Install dependencies

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

---

## 4. Run the project

Open two terminals.

**Terminal 1 — API server** (runs on port 3000):

```bash
cd server
npm run dev
```

**Terminal 2 — React client** (runs on port 5173):

```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

The client proxies all `/api/*` requests to `http://localhost:3000`, so both must be running at the same time.

---

## 5. Build for production

```bash
# Build the server
cd server
npm run build        # outputs to server/dist/

# Build the client
cd ../client
npm run build        # outputs to client/dist/
```

To run the compiled server:

```bash
cd server
npm start
```
