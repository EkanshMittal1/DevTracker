import { useEffect, useState } from 'react'
import { X, Trash2, Pencil, Check } from 'lucide-react'
import StatusBadge from './StatusBadge'
import PriorityMeter from './PriorityMeter'
import Avatar from './Avatar'
import { useAuth } from "../context/AuthContext";
import { useToast } from './Toast'

export default function IssuePanel({ issue, onClose, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(issue)
  const { showToast } = useToast()
  const { user } = useAuth();

  useEffect(() => {
    setDraft(issue)
    setEditing(false)
  }, [issue])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!issue) return null



  function handleSave() {
    onUpdate(draft)
    setEditing(false)
    showToast(`${issue.id} updated`, 'success')
  }

  function handleDelete() {
    onDelete(issue.id)
    showToast(`${issue.id} deleted`, 'error')
    onClose()
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className="fixed lg:sticky top-0 right-0 h-screen w-full sm:w-[420px] bg-surface border-l border-border z-40 flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <span className="font-mono text-xs text-text-faint">{issue.id}</span>
          <div className="flex items-center gap-2">
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="p-1.5 rounded-md text-text-dim hover:text-text hover:bg-surface-hover transition-colors"
                aria-label="Edit issue"
              >
                <Pencil size={15} />
              </button>
            )}
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-md text-text-dim hover:text-[var(--color-rust)] hover:bg-surface-hover transition-colors"
              aria-label="Delete issue"
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-text-dim hover:text-text hover:bg-surface-hover transition-colors"
              aria-label="Close panel"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6">
          {editing ? (
            <input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="text-lg font-medium bg-bg border border-border rounded-md px-3 py-2 focus:outline-none focus:border-text-faint"
            />
          ) : (
            <h2 className="text-lg font-medium leading-snug">{issue.title}</h2>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              {editing ? (
                <select
                  value={draft.status}
                  onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                  className="bg-bg border border-border rounded-md px-2 py-1.5 text-sm w-full focus:outline-none focus:border-text-faint cursor-pointer"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In progress</option>
                  <option value="closed">Closed</option>
                </select>
              ) : (
                <StatusBadge status={issue.status} />
              )}
            </Field>

            <Field label="Priority">
              {editing ? (
                <select
                  value={draft.priority}
                  onChange={(e) => setDraft({ ...draft, priority: e.target.value })}
                  className="bg-bg border border-border rounded-md px-2 py-1.5 text-sm w-full focus:outline-none focus:border-text-faint cursor-pointer"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              ) : (
                <PriorityMeter priority={issue.priority} />
              )}
            </Field>

            <Field label="Assignee">
              {editing ? (
                <select
                  value={draft.assignee ?? ''}
                  onChange={(e) =>
                    setDraft({ ...draft, assignee: e.target.value || null })
                  }
                  className="bg-bg border border-border rounded-md px-2 py-1.5 text-sm w-full focus:outline-none focus:border-text-faint cursor-pointer"
                >
                  <option value="">Unassigned</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center gap-2">
                  <Avatar user={getUserById(issue.assignee)} size={20} />
                  <span className="text-sm text-text-dim">
                    {getUserById(issue.assignee)?.name ?? 'Unassigned'}
                  </span>
                </div>
              )}
            </Field>

            <Field label="Due date">
              {editing ? (
                <input
                  type="date"
                  value={draft.dueDate}
                  onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
                  className="bg-bg border border-border rounded-md px-2 py-1.5 text-sm w-full focus:outline-none focus:border-text-faint"
                />
              ) : (
                <span className="font-mono text-sm text-text-dim">
                  {new Date(issue.dueDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              )}
            </Field>
          </div>

          <Field label="Description">
            {editing ? (
              <textarea
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                rows={5}
                className="bg-bg border border-border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:border-text-faint resize-none"
              />
            ) : (
              <p className="text-sm text-text-dim leading-relaxed">{issue.description}</p>
            )}
          </Field>

         <Field label="Reporter">
        <div className="flex items-center gap-2">
         <Avatar
      user={{
        name: issue.reporter,
      }}
      size={20}
    />

    <span className="text-sm text-text-dim">
      {issue.reporter}
    </span>
  </div>
</Field>
          {issue.labels?.length > 0 && (
            <Field label="Labels">
              <div className="flex flex-wrap gap-1.5">
                {issue.labels.map((l) => (
                  <span
                    key={l}
                    className="font-mono text-xs px-2 py-0.5 rounded border border-border text-text-faint"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </Field>
          )}
        </div>

        {editing && (
          <div className="px-5 py-4 border-t border-border shrink-0 flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-sage)] text-bg rounded-md py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Check size={14} />
              Save changes
            </button>
            <button
              onClick={() => {
                setDraft(issue)
                setEditing(false)
              }}
              className="px-4 py-2 text-sm text-text-dim hover:text-text transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-xs text-text-faint uppercase tracking-wider">
        {label}
      </span>
      {children}
    </div>
  )
}
