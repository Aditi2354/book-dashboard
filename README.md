# 📚 Book Management Dashboard (React + Vite + TS)

A beautiful, responsive dashboard for managing books. Includes:
- List, Search, Filter, Pagination (10 per page)
- Add / Edit (modal), Delete with confirmation
- Form validation (react-hook-form + zod)
- React Query for data fetching & caching
- React Router
- Loading skeletons + toasts
- TailwindCSS styling (clean, modern UI)
- Mock API via `json-server`, or plug your own base URL (e.g., crudcrud)

## ⚙️ Setup

```bash
# 1) Install deps
npm i

# 2) Copy env
cp .env.example .env

# 3) Start mock API (JSON Server on http://localhost:5174)
npm run server

# 4) Start app (Vite on http://localhost:5173)
npm run dev
```

> To use crudcrud.com, set `VITE_API_BASE_URL` in `.env` to your unique endpoint and ensure it exposes `/books` resources.

## 📁 API

- `GET    /books`
- `POST   /books`
- `PUT    /books/:id`
- `DELETE /books/:id`

`json-server` stores data in `db.json`.

## 🧱 Tech

React, Vite, TypeScript, Tailwind, React Router, React Query, Axios, RHF + Zod, Headless UI, Sonner (toasts), Lucide icons.

## 📝 Notes

- Pagination is server-aware if `_page` & `_limit` are supported (json-server). Falls back to client pagination otherwise.
- Clean, reusable components and hooks (`useBooks`) for clarity.
