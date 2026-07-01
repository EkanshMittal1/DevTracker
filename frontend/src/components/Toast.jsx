import { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(null)

let idCounter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((message, type = 'info') => {
    const id = ++idCounter
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 3500)
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 w-80">
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const TYPE_STYLES = {
  success: { border: 'var(--color-sage)', symbol: '✓' },
  error: { border: 'var(--color-rust)', symbol: '✕' },
  info: { border: 'var(--color-slate)', symbol: 'i' },
}

function Toast({ toast, onClose }) {
  const style = TYPE_STYLES[toast.type] ?? TYPE_STYLES.info
  return (
    <div
      className="bg-surface border-l-2 rounded-r-md rounded-l-sm shadow-lg px-4 py-3 flex items-start gap-3 animate-[slideIn_0.2s_ease-out]"
      style={{ borderColor: style.border }}
    >
      <span
        className="font-mono text-sm shrink-0 mt-px"
        style={{ color: style.border }}
      >
        {style.symbol}
      </span>
      <p className="text-sm text-text flex-1">{toast.message}</p>
      <button
        onClick={onClose}
        className="text-text-faint hover:text-text-dim text-sm leading-none shrink-0"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
