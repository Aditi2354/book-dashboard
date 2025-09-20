import { BookStatus } from '@/types'

export default function StatusBadge({ status }: { status: BookStatus }) {
  const cls = status === 'Available' ? 'badge badge-green' : 'badge badge-amber'
  return <span className={cls}>{status}</span>
}
