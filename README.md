# Intern E-Commerce App

A small full-stack e-commerce web application built as part of the intern assignment. Supports user registration/login, browsing products, cart management, checkout, and order history.

## Tech Stack

- **Frontend:** Next.js + TypeScript + Tailwind CSS
- **Backend:** NestJS + TypeScript
- **Database:** PostgreSQL (via Docker)
- **ORM:** Prisma
- **Auth:** JWT + bcrypt
- **Package Manager:** pnpm

## Prerequisites

- Node.js (v20+)
- pnpm (`npm install -g pnpm`)
- Docker Desktop (with WSL2 integration if on Windows)

## How to Run Locally

1. Clone the repository and `cd` into it

2. Start the database:
```bash
   docker compose up -d
```

3. Set up the backend:
```bash
   cd backend
   pnpm install
```
   Create a `.env` file in `backend/` with:

   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce"
JWT_SECRET="your-secret-key-here"

Then run:
```bash
   npx prisma migrate dev
   npx tsx prisma/seed.ts
   pnpm run start:dev
```
   Backend runs on **http://localhost:3000**

4. Set up the frontend (in a new terminal):
```bash
   cd frontend
   pnpm install
```
   Create a `.env.local` file in `frontend/` with:

   NEXT_PUBLIC_API_URL="http://localhost:3000"

   Then run:
```bash
   pnpm dev -p 3001
```
   Frontend runs on **http://localhost:3001**

5. Open **http://localhost:3001/register** to create an account and start using the app

## Note on Product Data

Products are seeded into the database from [dummyjson.com](https://dummyjson.com/products) at setup time, rather than fetched live on each request. This keeps browsing fast and means cart/checkout/stock logic operates against our own database instead of an external API.

## Features

- User registration and login (JWT-based auth, bcrypt password hashing)
- Browse products (seeded from dummyjson.com), with client-side search
- Product detail pages
- Shopping cart: add, update quantity, remove items
- Checkout: converts cart into a permanent order, clears the cart
- Order history

## API Routes

| Method | Route | Description |
|---|---|---|
| POST | `/auth/register` | Create a new account |
| POST | `/auth/login` | Log in, returns JWT |
| GET | `/products` | List all products |
| GET | `/products/:id` | Get single product details |
| GET | `/cart` | Get current user's cart |
| POST | `/cart/items` | Add item to cart |
| PATCH | `/cart/items/:productId` | Update item quantity |
| DELETE | `/cart/items/:productId` | Remove item from cart |
| POST | `/orders/checkout` | Convert cart into an order |
| GET | `/orders` | Get order history |

## Known Issues / Incomplete Features

- No pagination on the products list (all products load at once)
- Search is client-side only (filters already-loaded products, not a backend query)
- No stock validation on checkout (can order more than available stock)
- No unit tests yet
- Redis caching not implemented (optional bonus)
- No refresh token — JWT expires after a fixed duration and requires re-login