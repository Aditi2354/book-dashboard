Book Management Dashboard — React + Vite + TypeScript

A beautiful, responsive Book Management App with CRUD, search, filters, pagination, premium UI, and a mock API. Built with modern React patterns (React Query, RHF + Zod, React Router), clean architecture, and production-style UX (toasts, skeletons, dialogs).

<p align="left"> <img alt="Stack" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white"> <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white"> <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white"> <img alt="Tailwind" src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white"> <img alt="React Query" src="https://img.shields.io/badge/React%20Query-v5-FF4154"> <img alt="RHF" src="https://img.shields.io/badge/react--hook--form-7-EC5990"> <img alt="Zod" src="https://img.shields.io/badge/Zod-3-3068B7"> <img alt="json-server" src="https://img.shields.io/badge/json--server-mock%20API-orange"> </p>
✨ Highlights

Dashboard (Home): Table & Grid views, search (title/author), filters (genre/status), 10 per page pagination.

Add/Edit Book: Polished form, react-hook-form + Zod validation, create/update via API.

Delete Book: Confirmation dialog & toast feedback.

Premium UI: Tailwind design, glass/gradient cards, rounded pills, responsive layout.

DX & UX: React Query caching + invalidation, loading skeletons, toasts, route-based code organization.

✅ Assignment Coverage
Requirement	Status	Where
List books (table/grid), show Title/Author/Genre/Year/Status	✅	src/components/BookTable.tsx, src/components/BookGrid.tsx
Pagination (10/page)	✅	BookTable.tsx + Pagination.tsx, BookGrid.tsx (prev/next)
Search by title/author	✅	FiltersBar.tsx + useBooks.ts
Filters for genre/status	✅	FiltersBar.tsx + useBooks.ts
Add/Edit book (modal/form or route) + validation	✅ (route pages)	BookForm.tsx (BookFormPage with RHF + Zod)
Delete with confirmation	✅	ConfirmDialog.tsx + useDeleteBook()
Toast notifications	✅	sonner in BookTable.tsx, BookForm.tsx, main.tsx
Styling/Responsive/UX	✅	Tailwind in all components
API Integration (GET/POST/PUT/DELETE)	✅	src/hooks/useBooks.ts using Axios
Bonus: Loading skeletons	✅	SkeletonTable.tsx & skeletons in BookGrid.tsx
Bonus: React Query / SWR	✅	@tanstack/react-query in useBooks.ts
Bonus: Redux/Context (if needed)	➕ Not required (React Query handles server state cleanly; can add if requested)	
Bonus: React Router	✅	App.tsx → /, /books/new, /books/:id/edit
🧩 Tech Stack

Frontend: React 18, Vite 5, TypeScript, React Router 6

Data: React Query v5 (fetching, caching, invalidation), Axios

Forms & Validation: react-hook-form + Zod

Styling: Tailwind CSS (custom theme, gradients, glass), Headless UI (Dialog), Lucide icons, sonner for toasts

Mock API: json-server (local), easily switchable to crudcrud.com/reqres.in

DX: Path alias @/*, modern project structure, .env config

🚀 Quick Start
# 1) Install deps
npm i

# 2) Env
cp .env.example .env
# default: VITE_API_BASE_URL=http://localhost:5174

# 3) Start mock API (json-server at :5174)
npm run server

# 4) Run the app (Vite at :5173)
npm run dev


Open: http://localhost:5173

To use crudcrud.com instead of json-server, set your unique endpoint in .env:

VITE_API_BASE_URL=https://crudcrud.com/api/<your-key>


(Make sure it exposes /books, and adjust ID field if needed.)

🗂️ Project Structure
book-dashboard/
├─ src/
│  ├─ components/
│  │  ├─ BookForm.tsx         # Add/Edit form + page
│  │  ├─ BookGrid.tsx         # Premium blog-style grid view
│  │  ├─ BookTable.tsx        # Classic table view
│  │  ├─ ConfirmDialog.tsx    # Delete confirmation
│  │  ├─ FiltersBar.tsx       # Search + filters
│  │  ├─ Pagination.tsx
│  │  └─ SkeletonTable.tsx
│  ├─ hooks/
│  │  └─ useBooks.ts          # React Query hooks (list/get/create/update/delete)
│  ├─ lib/
│  │  ├─ api.ts               # Axios client (reads VITE_API_BASE_URL)
│  │  ├─ queryClient.ts       # React Query client config
│  │  └─ utils.ts             # constants/helpers
│  ├─ pages/
│  │  ├─ Dashboard.tsx
│  │  └─ NotFound.tsx
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ index.css               # Tailwind + premium styles (glass/gradients/cards)
│  └─ types.ts
├─ db.json                    # json-server data (mock)
├─ .env.example
├─ vite.config.ts             # sets @ alias → ./src
├─ tailwind.config.js
├─ tsconfig.json
└─ README.md

🔌 API Endpoints

Default (json-server):

GET /books (supports ?_page=1&_limit=10 and filter query params)

POST /books

PUT /books/:id

DELETE /books/:id

Example Book object:

{
  "id": 1,
  "title": "The Pragmatic Programmer",
  "author": "Andrew Hunt",
  "genre": "Technology",
  "year": 1999,
  "status": "Available"
}


Pagination strategy

Prefer server pagination (json-server _page/_limit + X-Total-Count).

If server doesn’t support it (like some fake APIs), we fallback to client-side pagination/filtering.

🧠 Implementation Notes

React Query: useBooks() lists with query key on {q, genre, status, page, limit}, and mutations (useCreateBook, useUpdateBook, useDeleteBook) invalidate the list key for instant refresh.

Validation: Zod schema enforces title/author/genre/year/status. RHF + Zod = lightweight & reliable forms.

Routing: / dashboard, /books/new, /books/:id/edit.

UI/UX:

Grid/Table toggle for a richer browsing experience.

Loading skeletons while fetching.

Toasts (sonner) for success/error feedback.

ConfirmDialog before destructive delete.

Responsive: Cards/table scale from mobile to desktop.

Styling: Tailwind with custom brand/grape palette, glass card shells, gradient CTAs, pill inputs, and premium headings—clean and modern without heavy UI libs.

🛠️ Scripts
# Dev server (Vite)
npm run dev

# Mock API (json-server at :5174)
npm run server

# Production build
npm run build

# Preview build
npm run preview

🧪 Testing the Flow

View list → 10 books per page.

Search “Clean” or filter Genre=Business, Status=Available.

Add Book → validation errors show if fields are empty; on success, toast + list refresh.

Edit any book → change status/genre → toast + refresh.

Delete → confirm dialog → toast, item removed.

🎨 Theming & Customization

Update brand colors / radii in tailwind.config.js.

Premium styles live in src/index.css (look for card-premium, glass, card-warm-*, btn-gradient, etc).

Switch default view to Table or Grid in pages/Dashboard.tsx.

📦 Switching the API (crudcrud.com / reqres.in)

Put your endpoint in .env:

VITE_API_BASE_URL=https://crudcrud.com/api/<your-key>


Ensure the resource path is /books.

If the backend uses _id instead of id, update types.ts / useBooks.ts accordingly (minor mapping).

🧭 Why no Redux?

This app’s server state is the main complexity. React Query handles caching, syncing, pagination, and invalidation far better than Redux for this use case. If you’d like a client-state store (theme/user prefs), we can add Redux Toolkit or Context in a few lines.

🧰 Future Enhancements

Book cover images (Open Library/ISBN lookup)

Bulk actions (multi-delete)

Role-based auth (admin/user)

Unit tests (Vitest/RTL)

Dark mode

👩‍💻 Author

Built by Aditi Kesharwani — MERN + Next.js + TS developer.
PRs & feedback welcome!

Happy reading & shipping 📚✨
