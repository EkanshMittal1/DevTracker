export function IssueRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-border animate-pulse">
      <div className="w-14 h-3 bg-surface-hover rounded shrink-0" />
      <div className="w-3 h-3 bg-surface-hover rounded-full shrink-0" />
      <div className="flex-1 h-3 bg-surface-hover rounded max-w-md" />
      <div className="w-16 h-3 bg-surface-hover rounded shrink-0 hidden sm:block" />
      <div className="w-6 h-6 bg-surface-hover rounded-full shrink-0" />
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-lg p-5 animate-pulse">
      <div className="w-20 h-3 bg-surface-hover rounded mb-4" />
      <div className="w-12 h-7 bg-surface-hover rounded" />
    </div>
  )
}
