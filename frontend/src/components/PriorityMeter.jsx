const PRIORITY_CONFIG = {
  low: { label: 'low', bars: 1, color: 'var(--color-text-faint)' },
  medium: { label: 'medium', bars: 2, color: 'var(--color-slate)' },
  high: { label: 'high', bars: 3, color: 'var(--color-amber)' },
  urgent: { label: 'urgent', bars: 4, color: 'var(--color-rust)' },
}

export default function PriorityMeter({ priority }) {
  const cfg = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.low

  return (
    <span className="inline-flex items-center gap-1.5" title={`Priority: ${cfg.label}`}>
      <span className="flex items-end gap-[2px] h-3">
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="w-[3px] rounded-[1px]"
            style={{
              height: `${i * 25}%`,
              background: i <= cfg.bars ? cfg.color : 'var(--color-border)',
            }}
          />
        ))}
      </span>
      <span className="font-mono text-xs text-text-dim" style={{ color: cfg.color }}>
        {cfg.label}
      </span>
    </span>
  )
}

export { PRIORITY_CONFIG }
