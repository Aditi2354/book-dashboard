import { Routes, Route, NavLink, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import { BookFormPage } from './components/BookForm'
import { Library, Plus } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Top Nav */}
      <header className="sticky top-0 z-30">
  <div className="bg-grain">
    <div className="container-app py-4">
      <div className="glass px-4 sm:px-6 py-3 flex items-center gap-3">
        <div className="rounded-2xl p-2 bg-gradient-to-br from-brand-500 to-grape-500 text-white">
          <Library />
        </div>

        <div className="flex-1">
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
            Book Management Dashboard
          </h1>
          <p className="text-[13px] text-gray-600">Manage your library with style ✨</p>
        </div>

        {/* RIGHT: premium buttons (no extra CTA) */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              [
                "rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-[.98]",
                isActive
                  ? "bg-gradient-to-r from-brand-500 to-grape-500 text-white shadow"
                  : "bg-white text-grape-600 ring-1 ring-grape-200 hover:ring-grape-300"
              ].join(" ")
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/books/new"
            className={({ isActive }) =>
              [
                "rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-[.98] inline-flex items-center gap-2",
                isActive
                  ? "bg-gradient-to-r from-brand-500 to-grape-500 text-white shadow"
                  : "bg-white text-grape-600 ring-1 ring-grape-200 hover:ring-grape-300"
              ].join(" ")
            }
          >
            <Plus className="h-4 w-4" />
            Add Book
          </NavLink>
        </div>
      </div>
    </div>
  </div>
</header>


      {/* Main */}
      <main className="container-app py-4 space-y-4">
        <Hero />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books/new" element={<BookFormPage mode="create" />} />
          <Route path="/books/:id/edit" element={<BookFormPage mode="edit" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="container-app py-10 text-center text-xs text-gray-500">
        Built with React + Vite + Tailwind + React Query
      </footer>
    </div>
  )
}

function Hero() {
  return (
    <div className="relative overflow-hidden card-premium p-4 sm:p-5 hero-compact">
      {/* smaller decorative blob */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full
                      bg-gradient-to-br from-brand-500/15 to-grape-500/15
                      blur-2xl pointer-events-none" />
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
        Your library, beautifully organized.
      </h2>
      <p className="mt-1 text-gray-600 text-sm">
        Search, filter, add, edit and manage all books in one elegant dashboard.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <NavLink to="/" className="rounded-full px-4 py-2 text-sm bg-white text-gray-900 ring-1 ring-gray-200 hover:ring-gray-300">
          Dashboard
        </NavLink>
        <NavLink to="/books/new" className="rounded-full px-4 py-2 text-sm text-white
                bg-gradient-to-r from-brand-500 to-grape-500 shadow">
          Add New Book
        </NavLink>
      </div>
    </div>
  )
}
