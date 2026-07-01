function StatCard({ label, value, accent }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-5">
      <p className="font-mono text-xs text-text-faint uppercase tracking-wider mb-3">
        {label}
      </p>
      <p className="text-3xl font-semibold" style={{ color: accent }}>
        {value}
      </p>
    </div>
  )
}

export default function DashboardStats({ issues }) {
  const open = issues.filter((i) => i.status === 'open').length
  const inProgress = issues.filter((i) => i.status === 'in-progress').length
  const closed = issues.filter((i) => i.status === 'closed').length
  const urgent = issues.filter((i) => i.priority === 'urgent' && i.status !== 'closed').length

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Open" value={open} accent="var(--color-amber)" />
      <StatCard label="In progress" value={inProgress} accent="var(--color-slate)" />
      <StatCard label="Closed" value={closed} accent="var(--color-sage)" />
      <StatCard label="Urgent & active" value={urgent} accent="var(--color-rust)" />
    </div>
  )
}
