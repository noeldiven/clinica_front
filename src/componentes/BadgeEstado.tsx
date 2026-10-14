import type { EstadoPaciente } from '../types/paciente'

interface BadgeEstadoProps {
  estado: EstadoPaciente
}

const estilosPorEstado: Record<EstadoPaciente, string> = {
  activo: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  inactivo: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  en_espera: 'bg-amber-50 text-amber-700 ring-amber-600/20',
}

const etiquetasPorEstado: Record<EstadoPaciente, string> = {
  activo: 'Activo',
  inactivo: 'Inactivo',
  en_espera: 'En espera',
}

export default function BadgeEstado({ estado }: BadgeEstadoProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${estilosPorEstado[estado]}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          estado === 'activo'
            ? 'bg-emerald-500'
            : estado === 'inactivo'
              ? 'bg-slate-400'
              : 'bg-amber-500'
        }`}
      />
      {etiquetasPorEstado[estado]}
    </span>
  )
}