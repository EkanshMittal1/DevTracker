import StatusBadge from './StatusBadge'
import PriorityMeter from './PriorityMeter'
import Avatar from './Avatar'
import { getUserById } from '../data/mockData'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function isOverdue(dueDate, status) {
  if (status === 'closed') return false
  return new Date(dueDate) < new Date('2026-06-30')
}

export default function IssueRow({ issue, onSelect, isSelected }) {
  const assignee = getUserById(issue.assignee)
  const overdue = isOverdue(issue.dueDate, issue.status)

  return (
    <button
      onClick={() => onSelect(issue.id)}
      className={`w-full flex items-center gap-4 px-4 py-3 border-b border-border text-left transition-colors cursor-pointer ${
        isSelected ? 'bg-surface-hover' : 'hover:bg-surface'
      }`}
    >
      <span className="font-mono text-xs text-text-faint w-14 shrink-0">{issue.id}</span>

      <StatusBadge status={issue.status} />

      <span className="flex-1 text-sm text-text truncate min-w-0">{issue.title}</span>

      <span className="hidden md:inline-flex shrink-0">
        <PriorityMeter priority={issue.priority} />
      </span>

      <span
        className={`hidden sm:inline font-mono text-xs shrink-0 ${
          overdue ? 'text-[var(--color-rust)]' : 'text-text-faint'
        }`}
      >
        {formatDate(issue.dueDate)}
      </span>

      <Avatar user={assignee} size={24} />
    </button>
  )
}
