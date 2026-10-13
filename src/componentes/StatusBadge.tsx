
interface StatusBadgeProps {
  activo: boolean;
}

export default function StatusBadge({ activo }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
        activo
          ? 'bg-rose-100 text-rose-700'
          : 'bg-emerald-100 text-emerald-700'
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          activo ? 'bg-rose-500' : 'bg-emerald-500'
        }`}
      />

      {activo ? 'Modo Mantenimiento' : 'Sistema Operativo'}
    </span>
  );
}
