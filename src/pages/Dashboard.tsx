import { useState } from 'react'
import BookTable from '@/components/BookTable'
import BookGrid from '@/components/BookGrid'
import { LayoutGrid, Table as TableIcon } from 'lucide-react'

export default function Dashboard() {
  const [view, setView] = useState<'grid' | 'table'>('grid')

  return (
    <div className="space-y-6">
      {/* tiny view switch */}
      <div className="flex items-center justify-end">
        <div className="glass px-2 py-2 flex items-center gap-2">
          <button
            className={`btn ${view === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={()=>setView('grid')}
            title="Grid view"
          >
            <LayoutGrid className="h-4 w-4" /> Grid
          </button>
          <button
            className={`btn ${view === 'table' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={()=>setView('table')}
            title="Table view"
          >
            <TableIcon className="h-4 w-4" /> Table
          </button>
        </div>
      </div>

      {view === 'grid' ? <BookGrid /> : <BookTable />}
    </div>
  )
}
