export default function Avatar({ user, size = 24 }) {
  if (!user) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full border border-dashed shrink-0"
        style={{
          width: size,
          height: size,
          borderColor: 'var(--color-text-faint)',
        }}
        title="Unassigned"
      />
    )
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-mono shrink-0 font-medium"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: user.avatarColor + '26',
        color: user.avatarColor,
      }}
      title={user.name}
    >
      {initials}
    </span>
  )
}
