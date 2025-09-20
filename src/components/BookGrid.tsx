import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Edit3, Plus, Trash2 } from 'lucide-react'
import { useBooks, useDeleteBook } from '@/hooks/useBooks'
import FiltersBar from './FiltersBar'
import ConfirmDialog from './ConfirmDialog'
import { toast } from 'sonner'

const PAGE_SIZE = 10

export default function BookGrid() {
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')
  const [genre, setGenre] = useState('')
  const [status, setStatus] = useState('')

  const { data, isLoading, isFetching } = useBooks({ q, genre, status, page, limit: PAGE_SIZE })
  const del = useDeleteBook()
  const [confirm, setConfirm] = useState<{ open: boolean, id?: string | number }>({ open: false })

  const onDelete = async (id: string | number) => {
    try {
      await del.mutateAsync(id)
      toast.success('Book deleted')
    } catch (e:any) {
      toast.error(e?.message ?? 'Delete failed')
    }
  }

   return (
    <div className="space-y-4 card-md">   {/* <-- added card-md */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base sm:text-lg font-bold">Books</h3>
        <Link to="/books/new" className="btn btn-primary btn-sm">
          <Plus className="h-4 w-4"/> Add Book
        </Link>
      </div>

      <FiltersBar
        q={q} genre={genre} status={status}
        onChange={(n) => { /* same as before */ }}
      />

      {/* grid gap smaller */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(isLoading ? Array.from({length:6}) : data?.items ?? []).map((b:any, i:number) => (
          isLoading ? (
            <div key={i} className="card-warm-outer">
              <div className="card-warm-inner">
                <div className="card-warm-image skeleton"></div>
                <div className="mt-2 h-6 skeleton"></div>
                <div className="mt-1 h-4 skeleton"></div>
              </div>
            </div>
          ) : (
            <div key={b.id} className="card-warm-outer">
              <div className="card-warm-inner">
                <div className="card-warm-image">
                  <div className="card-warm-blob" />
                </div>

                <div className="mt-2">
                  <span className="pill">UI Design</span>
                </div>

                {/* smaller title */}
                <h4 className="mt-1 blog-title">{b.title}</h4>

                <div className="meta mt-1 flex items-center justify-between">
                  <span>by <strong>{b.author}</strong></span>
                  <span>{b.year}</span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className="badge badge-green">{b.genre}</span>
                  <span className={b.status === 'Available' ? 'badge badge-green' : 'badge badge-amber'}>
                    {b.status}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <Link to={`/books/${b.id}/edit`} className="btn btn-secondary btn-sm">
                    <Edit3 className="h-4 w-4"/> Edit
                  </Link>
                  <button onClick={()=>setConfirm({ open: true, id: b.id! })} className="btn btn-ghost btn-sm">
                    <Trash2 className="h-4 w-4"/> Delete
                  </button>
                </div>
              </div>
            </div>
          )
        ))}
      </div>

      {isFetching && <div className="text-xs text-gray-400">Refreshing…</div>}

      <div className="flex items-center justify-center gap-2 mt-1">
        <button className="btn btn-secondary btn-sm" disabled={(data?.total ?? 0) === 0 || page <= 1} onClick={()=>setPage(p => p - 1)}>Prev</button>
        <button className="btn btn-secondary btn-sm" disabled={(data?.total ?? 0) <= page * 10} onClick={()=>setPage(p => p + 1)}>Next</button>
      </div>

      <ConfirmDialog
        open={confirm.open}
        onClose={()=>setConfirm({ open: false })}
        onConfirm={()=> confirm.id && onDelete(confirm.id)}
        title="Delete Book"
        message="This action cannot be undone."
      />
    </div>
  )
}
