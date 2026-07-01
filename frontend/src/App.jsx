import { useEffect, useMemo, useState } from "react";
import { Plus, GitBranch } from 'lucide-react'
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import {
  getIssues,
  createIssue as createIssueApi,
  updateIssue as updateIssueApi,
  deleteIssue as deleteIssueApi,
} from "./api/issues";
import DashboardStats from './components/DashboardStats'
import IssueFilters from './components/IssueFilters'
import IssueRow from './components/IssueRow'
import IssuePanel from './components/IssuePanel'
import CreateIssueModal from './components/CreateIssueModal'
import { IssueRowSkeleton, StatCardSkeleton } from './components/Skeletons'
import { ToastProvider } from './components/Toast'
import Avatar from './components/Avatar'
import Register from "./pages/Register";

function AppContent() {
  const [issues, setIssues] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [showCreate, setShowCreate] = useState(false)
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', status: 'all', priority: 'all' })
  const { user, isAuthenticated, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
  async function loadIssues() {
    try {

      setLoading(true);
      const response = await getIssues();
      setIssues(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  loadIssues();
}, []);

  const filteredIssues = useMemo(() => {
    return issues
      .filter((i) => filters.status === 'all' || i.status === filters.status)
      .filter((i) => filters.priority === 'all' || i.priority === filters.priority)
      .filter((i) =>
        filters.search.trim() === ''
          ? true
          : i.title.toLowerCase().includes(filters.search.toLowerCase())
      )
      .sort((a, b) => b.id.localeCompare(a.id))
  }, [issues, filters])

  const selectedIssue = issues.find((i) => i.id === selectedId) ?? null

 async function handleUpdate(updated) {
  const response = await updateIssueApi(updated.id, updated);

  setIssues(prev =>
    prev.map(i => (i.id === updated.id ? response.data : i))
  );
}

 async function handleDelete(id) {
  await deleteIssueApi(id);

  setIssues(prev => prev.filter(i => i.id !== id));

  if (selectedId === id) {
    setSelectedId(null);
  }
}

 async function handleCreate(newIssue) {
  const response = await createIssueApi(newIssue);

  setIssues(prev => [response.data, ...prev]);

  setShowCreate(false);
}

 const nextId =
  issues.length === 0
    ? "ISS-101"
    : `ISS-${String(
        Math.max(
          ...issues.map(i => parseInt(i.id.split("-")[1], 10))
        ) + 1
      ).padStart(3, "0")}`;

          if (!isAuthenticated) {
  return showRegister ? (
    <Register
      onSwitch={() => setShowRegister(false)}
    />
  ) : (
    <Login
      onSwitch={() => setShowRegister(true)}
    />
  );
}

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 min-w-0">
        <header className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 bg-bg/95 backdrop-blur-sm z-20">
          <div className="flex items-center gap-2.5">
            <GitBranch size={18} style={{ color: 'var(--color-amber)' }} />
            <span className="font-mono text-sm font-medium">devtrack</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-1.5 bg-surface border border-border rounded-md px-3 py-1.5 text-sm text-text hover:bg-surface-hover transition-colors"
            >
              <Plus size={14} />
              New issue
            </button>
            <div className="flex items-center gap-3">
           <div className="flex items-center gap-3">
           <span className="text-sm text-text">
           {user?.name}
           </span>

           <Avatar user={user} size={28} />
            </div>

           <button
             onClick={logout}
               className="text-sm text-red-500 hover:underline"
  >
                Logout
               </button>
            </div>
          </div>
        </header>

        <main className="px-6 py-6 max-w-5xl mx-auto">
          <section className="mb-8">
            <h1 className="text-sm font-mono text-text-faint uppercase tracking-wider mb-4">
              Overview
            </h1>
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <StatCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <DashboardStats issues={issues} />
            )}
          </section>

          <section>
            <h2 className="text-sm font-mono text-text-faint uppercase tracking-wider mb-4">
              Issues
            </h2>
            <IssueFilters filters={filters} onChange={setFilters} />

            <div className="bg-surface border border-border rounded-lg overflow-hidden">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <IssueRowSkeleton key={i} />)
              ) : filteredIssues.length === 0 ? (
                <div className="px-4 py-12 text-center">
                  <p className="text-sm text-text-dim mb-1">No issues match these filters.</p>
                  <p className="text-xs text-text-faint">Try clearing the search or filters.</p>
                </div>
              ) : (
                filteredIssues.map((issue) => (
                  <IssueRow
                    key={issue.id}
                    issue={issue}
                    onSelect={setSelectedId}
                    isSelected={issue.id === selectedId}
                  />
                ))
              )}
            </div>
          </section>
        </main>
      </div>

      {selectedIssue && (
        <IssuePanel
          issue={selectedIssue}
          onClose={() => setSelectedId(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}

      {showCreate && (
        <CreateIssueModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
          nextId={nextId}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}
