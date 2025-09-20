import { GENRES, STATUSES } from '@/lib/utils'
import { Search } from 'lucide-react'

type Props = {
  q: string
  genre: string
  status: string
  onChange: (next: { q?: string; genre?: string; status?: string }) => void
}

export default function FiltersBar({ q, genre, status, onChange }: Props) {
  return (
    <div className="glass px-3 py-3 flex flex-col lg:flex-row gap-3 lg:items-center">
      <div className="relative flex-1">
        <input
          value={q}
          onChange={(e) => onChange({ q: e.target.value })}
          placeholder="Search by title or author…"
          className="input pl-9"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <select className="select" value={genre} onChange={(e)=>onChange({ genre: e.target.value })}>
        <option value="">All Genres</option>
        {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
      </select>
      <select className="select" value={status} onChange={(e)=>onChange({ status: e.target.value })}>
        <option value="">All Status</option>
        {Array.from(STATUSES).map(s => <option key={s} value={s}>{s}</option>)}
      </select>
    </div>
  )
}
