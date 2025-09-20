import { useState } from 'react'
import { Edit3, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useBooks, useDeleteBook } from '@/hooks/useBooks'
import FiltersBar from './FiltersBar'
import Pagination from './Pagination'
import SkeletonTable from './SkeletonTable'
import StatusBadge from './StatusBadge'
import ConfirmDialog from './ConfirmDialog'
import { toast } from 'sonner'

const PAGE_SIZE = 10

export default function BookTable() {
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

  if (isLoading) return <SkeletonTable />

  return (
    <div className="card-premium p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="text-lg font-bold">Books</h3>
        <Link to="/books/new" className="btn btn-primary"><Plus className="h-4 w-4"/> Add Book</Link>
      </div>

      <div className="mb-4">
        <FiltersBar
          q={q} genre={genre} status={status}
          onChange={(n) => {
            if (n.q !== undefined) setQ(n.q)
            if (n.genre !== undefined) setGenre(n.genre)
            if (n.status !== undefined) setStatus(n.status)
            setPage(1)
          }}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 table-th">Title</th>
              <th className="px-4 py-3 table-th">Author</th>
              <th className="px-4 py-3 table-th">Genre</th>
              <th className="px-4 py-3 table-th">Year</th>
              <th className="px-4 py-3 table-th">Status</th>
              <th className="px-4 py-3 table-th text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.items.map((b) => (
              <tr key={b.id}>
                <td className="px-4 py-3 table-td">{b.title}</td>
                <td className="px-4 py-3 table-td">{b.author}</td>
                <td className="px-4 py-3 table-td">{b.genre}</td>
                <td className="px-4 py-3 table-td">{b.year}</td>
                <td className="px-4 py-3 table-td"><StatusBadge status={b.status} /></td>
                <td className="px-4 py-3 table-td">
                  <div className="flex justify-end gap-2">
                    <Link to={`/books/${b.id}/edit`} className="btn-secondary"><Edit3 className="h-4 w-4"/> Edit</Link>
                    <button className="btn-secondary" onClick={()=>setConfirm({ open: true, id: b.id! })}><Trash2 className="h-4 w-4"/> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {data?.items.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No books found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isFetching && <div className="text-xs text-gray-400 mt-2">Refreshing…</div>}

      <Pagination page={page} pageSize={PAGE_SIZE} total={data?.total ?? 0} onPageChange={setPage} />

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
