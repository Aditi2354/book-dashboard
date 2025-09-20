export default function SkeletonTable() {
  return (
    <div className="card overflow-hidden">
      <div className="p-4">
        <div className="h-10 skeleton mb-4"></div>
        <div className="space-y-2">
          {Array.from({length: 8}).map((_,i) => (
            <div key={i} className="h-10 skeleton"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
