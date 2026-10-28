
import type { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import BadgeEstado from './BadgeEstado'
import type { EstadoPaciente, Paciente } from '../types/paciente'

interface PacienteRowProps {
  paciente: Paciente
  onCambiarEstado: (id: string, estado: EstadoPaciente) => void
  onEditar: (id: string) => void
  onEliminar: (id: string) => void
}

export default function PacienteRow({
  paciente,
  onCambiarEstado,
  onEditar,
  onEliminar,
}: PacienteRowProps) {
  const iniciales = `${paciente.nombre.charAt(0)}${paciente.apellido.charAt(0)}`

  const handleEstadoChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCambiarEstado(paciente.id, event.target.value as EstadoPaciente)
  }

  return (
    <tr className="border-b border-slate-100 transition hover:bg-blue-50/50">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-extrabold text-blue-700">
            {iniciales}
          </div>

          <div className="min-w-0">
            <p className="font-bold text-slate-900">
              {paciente.nombre} {paciente.apellido}
            </p>
            <p className="mt-1 text-xs text-slate-500">{paciente.email}</p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">{paciente.telefono}</td>
      <td className="px-5 py-4 text-sm text-slate-600">
        {paciente.especialidadAsignada}
      </td>
      <td className="px-5 py-4 text-sm text-slate-600">
        {paciente.ultimaCita}
      </td>

      <td className="px-5 py-4">
        <BadgeEstado estado={paciente.estado} />
      </td>

      <td className="px-5 py-4">
        <select
          aria-label={`Cambiar estado de ${paciente.nombre}`}
          value={paciente.estado}
          onChange={handleEstadoChange}
          className="w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs outline-none focus:border-blue-500"
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
          <option value="en_espera">En espera</option>
        </select>
      </td>

      <td className="px-5 py-4">
        <div className="flex flex-col items-start gap-2">
          <Link
            to={`/pacientes/${paciente.id}`}
            className="whitespace-nowrap text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
          >
            Ver detalle →
          </Link>

          <button
            type="button"
            onClick={() => onEditar(paciente.id)}
            className="rounded-lg px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-50"
          >
            Editar
          </button>

          <button
            type="button"
            onClick={() => onEliminar(paciente.id)}
            className="rounded-lg px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  )
}
