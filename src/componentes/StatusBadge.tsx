interface StatusBadgeProps {
  activo: boolean
}

export default function StatusBadge({ activo }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${
        activo
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-rose-50 text-rose-700'
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          activo ? 'bg-emerald-500' : 'bg-rose-500'
        }`}
      />
      {activo ? 'Sistema Operativo' : 'Modo Mantenimiento'}
    </span>
  )
}