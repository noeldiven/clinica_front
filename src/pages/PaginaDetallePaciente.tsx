
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PACIENTES_INICIALES } from './PaginaPacientes'
import PaginaNotFound from './PaginaNotFound'
import BadgeEstado from '../componentes/BadgeEstado'

export default function PaginaDetallePaciente() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const paciente = PACIENTES_INICIALES.find(
    (paciente) => paciente.id === id,
  )

  if (!paciente) {
    return <PaginaNotFound />
  }

  return (
    <div className="mx-auto max-w-4xl">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        ← Volver
      </button>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="bg-slate-900 px-6 py-8 text-white sm:px-8">
          <p className="text-sm text-slate-300">Detalle del paciente</p>

          <h1 className="mt-2 text-3xl font-bold">
            {paciente.nombre} {paciente.apellido}
          </h1>

          <div className="mt-4">
            <BadgeEstado estado={paciente.estado} />
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
          <div>
            <p className="text-sm text-gray-500">ID del paciente</p>
            <p className="mt-1 font-semibold text-gray-900">{paciente.id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Estado</p>
            <p className="mt-1 font-semibold capitalize text-gray-900">
              {paciente.estado.replace('_', ' ')}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Correo electrónico</p>
            <p className="mt-1 break-words font-semibold text-gray-900">
              {paciente.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Teléfono</p>
            <p className="mt-1 font-semibold text-gray-900">
              {paciente.telefono}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Especialidad asignada</p>
            <p className="mt-1 font-semibold text-gray-900">
              {paciente.especialidadAsignada}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Última cita</p>
            <p className="mt-1 font-semibold text-gray-900">
              {paciente.ultimaCita}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 px-6 py-5 sm:px-8">
          <Link
            to="/pacientes"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            Ver todos los pacientes →
          </Link>
        </div>
      </div>
    </div>
  )
}
