import type { ChangeEvent } from 'react'
import BadgeEstado from './BadgeEstado'
import type { EstadoPaciente, Paciente } from '../types/paciente'

interface PacienteCardProps {
  paciente: Paciente
  onCambiarEstado: (id: string, estado: EstadoPaciente) => void
  onEliminar: (id: string) => void
}

export default function PacienteCard({
  paciente,
  onCambiarEstado,
  onEliminar,
}: PacienteCardProps) {
  const handleEstadoChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCambiarEstado(paciente.id, event.target.value as EstadoPaciente)
  }

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-extrabold text-blue-700">
          {paciente.nombre.charAt(0)}
          {paciente.apellido.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-900">
            {paciente.nombre} {paciente.apellido}
          </h3>
          <p className="break-words text-sm text-slate-500">
            {paciente.email}
          </p>
        </div>
      </div>

      <div>
        <BadgeEstado estado={paciente.estado} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs font-semibold text-slate-400">Teléfono</p>
          <p className="mt-1 text-slate-700">{paciente.telefono}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-400">Especialidad</p>
          <p className="mt-1 text-slate-700">
            {paciente.especialidadAsignada}
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-xs font-semibold text-slate-400">Última cita</p>
          <p className="mt-1 text-slate-700">{paciente.ultimaCita}</p>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold text-slate-600">
          Cambiar estado
        </label>
        <select
          aria-label={`Cambiar estado de ${paciente.nombre}`}
          value={paciente.estado}
          onChange={handleEstadoChange}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="en_espera">En espera</option>
        </select>
      </div>

      <button
        type="button"
        onClick={() => onEliminar(paciente.id)}
        className="w-full rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50"
      >
        Eliminar paciente
      </button>
    </article>
  )
}