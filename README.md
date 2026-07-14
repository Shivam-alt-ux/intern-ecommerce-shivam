# Intern E-Commerce App

A small full-stack e-commerce web application built as part of the intern assignment. Supports user registration/login, browsing products, cart management, checkout, and order history.

## Tech Stack

- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: NestJS + TypeScript
- Database: PostgreSQL (via Docker)
- ORM: Prisma
- Auth: JWT + bcrypt
- Package Manager: pnpm

## Prerequisites

- Node.js (v20+)
- pnpm (npm install -g pnpm)
- Docker Desktop (with WSL2 integration if on Windows)

## How to Run Locally

1. Clone the repository and cd into it
2. Start the database: `docker compose up -d`
3. Set up the backend:
   - `cd backend`
   - `pnpm install`
   - Create a `.env` file with `DATABASE_URL` and `JWT_SECRET`
   - `npx prisma migrate dev`
   - `npx tsx prisma/seed.ts`
   - `pnpm run start:dev` (runs on http://localhost:3000)
4. Set up the frontend (in a new terminal):
   - `cd frontend`
   - `pnpm install`
   - `pnpm dev -p 3001` (runs on http://localhost:3001)
5. Open http://localhost:3001/register to create an account and start using the app

## Features

- User registration and login (JWT-based auth, bcrypt password hashing)
- Browse products (seeded from dummyjson.com), with client-side search
- Product detail pages
- Shopping cart: add, update quantity, remove items
- Checkout: converts cart into a permanent order, clears the cart
- Order history

## Known Issues / Incomplete Features

- No pagination on the products list (all products load at once)
- Search is client-side only (filters already-loaded products, not a backend query)
- No stock validation on checkout (can order more than available stock)
- No unit tests yet
- Redis caching not implemented (optional bonus)
