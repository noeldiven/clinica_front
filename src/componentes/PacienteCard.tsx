
import BadgeEstado from './BadgeEstado'
import type { Paciente } from '../types/paciente'

interface PacienteCardProps {
  paciente: Paciente
}

export default function PacienteCard({ paciente }: PacienteCardProps) {
  const iniciales = `${paciente.nombre.charAt(0)}${paciente.apellido.charAt(0)}`

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 font-extrabold text-blue-700">
          {iniciales}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-extrabold text-slate-900">
            {paciente.nombre} {paciente.apellido}
          </h3>
          <p className="mt-1 break-words text-sm text-slate-500">
            {paciente.email}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {paciente.telefono}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 pt-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Especialidad
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            {paciente.especialidadAsignada}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Última cita
          </p>
          <p className="mt-1 text-sm text-slate-700">
            {paciente.ultimaCita}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Estado
          </p>
          <div className="mt-2">
            <BadgeEstado estado={paciente.estado} />
          </div>
        </div>
      </div>
    </article>
  )
}
