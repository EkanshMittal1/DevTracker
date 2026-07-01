import { Search } from 'lucide-react'

export default function IssueFilters({ filters, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint"
        />
        <input
          type="text"
          placeholder="Search by title..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full bg-surface border border-border rounded-md pl-9 pr-3 py-2 text-sm text-text placeholder:text-text-faint focus:outline-none focus:border-text-faint transition-colors"
        />
      </div>

      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className="bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-dim focus:outline-none focus:border-text-faint cursor-pointer"
      >
        <option value="all">All statuses</option>
        <option value="open">Open</option>
        <option value="in-progress">In progress</option>
        <option value="closed">Closed</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) => onChange({ ...filters, priority: e.target.value })}
        className="bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-dim focus:outline-none focus:border-text-faint cursor-pointer"
      >
        <option value="all">All priorities</option>
        <option value="urgent">Urgent</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  )
}
