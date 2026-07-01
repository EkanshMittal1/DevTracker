import { useEffect,useState } from 'react'
import { X } from 'lucide-react'

import { useToast } from './Toast'
import { getUsers } from "../api/users";

export default function CreateIssueModal({ onClose, onCreate, nextId }) {
  const [form, setForm] = useState({
  title: "",
  description: "",
  priority: "medium",
  status: "open",
  assignee: "",
  dueDate: "",
});
  const { showToast } = useToast()
  const [users, setUsers] = useState([]);

  useEffect(() => {
  async function loadUsers() {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  loadUsers();
}, []);

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return

    onCreate({
      id: nextId,
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      assignee: form.assignee || null,
  
     
      dueDate: form.dueDate || '2026-07-15',
     
    })
    showToast(`${nextId} created`, 'success')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-medium">New issue</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-text-dim hover:text-text hover:bg-surface-hover transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs text-text-faint uppercase tracking-wider">
              Title
            </label>
            <input
              autoFocus
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Short, clear summary of the issue"
              className="bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-text-faint"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs text-text-faint uppercase tracking-wider">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="What's happening, and what should happen instead?"
              className="bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-text-faint resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-text-faint uppercase tracking-wider">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="bg-bg border border-border rounded-md px-2 py-2 text-sm cursor-pointer focus:outline-none focus:border-text-faint"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-text-faint uppercase tracking-wider">
                Assignee
              </label>
              <select
                value={form.assignee}
                onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                className="bg-bg border border-border rounded-md px-2 py-2 text-sm cursor-pointer focus:outline-none focus:border-text-faint"
              >
                <option value="">Unassigned</option>
                {users.map((u) => (
                  <option key={u._id} value={u.name}>
                      {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs text-text-faint uppercase tracking-wider">
              Due date
            </label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="bg-bg border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-text-faint"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-md py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ background: 'var(--color-amber)', color: 'var(--color-bg)' }}
          >
            Create issue
          </button>
        </form>
      </div>
    </div>
  )
}
