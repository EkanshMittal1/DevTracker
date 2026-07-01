const STATUS_CONFIG = {
  open: { label: 'open', color: 'var(--color-amber)', symbol: '○' },
  'in-progress': { label: 'in-progress', color: 'var(--color-slate)', symbol: '◐' },
  closed: { label: 'closed', color: 'var(--color-sage)', symbol: '●' },
}

export default function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.open
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-xs"
      style={{ color: cfg.color }}
    >
      <span aria-hidden="true">{cfg.symbol}</span>
      {cfg.label}
    </span>
  )
}

export { STATUS_CONFIG }
