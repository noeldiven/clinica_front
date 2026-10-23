
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../lib/axios'
import PaginaNotFound from './PaginaNotFound'
import type { Paciente } from '../types/paciente'

interface PacienteAPI {
  id: number
  nombre: string
  apellidos: string
  email: string
  telefono: string
  fechaNacimiento: string
}

export default function PaginaDetallePaciente() {
  const { id } = useParams<{ id: string }>()

  const [paciente, setPaciente] = useState<Paciente | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarPaciente() {
      try {
        setCargando(true)
        setError('')

        const respuesta = await api.get<PacienteAPI>(
          `/pacientes/${id}`,
        )

        const datos = respuesta.data

        setPaciente({
          id: String(datos.id),
          nombre: datos.nombre,
          apellido: datos.apellidos,
          email: datos.email,
          telefono: datos.telefono,
          especialidadAsignada: 'No disponible',
          ultimaCita: 'No disponible',
          estado: 'activo',
        })
      } catch (error) {
        console.error('Error al cargar el detalle del paciente:', error)
        setError('No se pudo cargar el paciente solicitado.')
      } finally {
        setCargando(false)
      }
    }

    if (id) {
      cargarPaciente()
    } else {
      setError('No se ha especificado el ID del paciente.')
      setCargando(false)
    }
  }, [id])

  if (cargando) {
    return (
      <div className="rounded-xl bg-white p-8 text-center text-slate-600 shadow-sm">
        Cargando datos del paciente...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p role="alert" className="text-rose-600">
          {error}
        </p>

        <Link
          to="/pacientes"
          className="mt-4 inline-block font-semibold text-blue-600 hover:text-blue-800"
        >
          Volver a pacientes
        </Link>
      </div>
    )
  }

  if (!paciente) {
    return <PaginaNotFound />
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        to="/pacientes"
        className="mb-6 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        ← Volver a pacientes
      </Link>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="bg-slate-900 px-6 py-8 text-white sm:px-8">
          <p className="text-sm text-slate-300">
            Detalle del paciente
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {paciente.nombre} {paciente.apellido}
          </h1>

          <p className="mt-3 text-sm text-slate-300">
            Información obtenida del backend
          </p>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
          <div>
            <p className="text-sm text-gray-500">ID del paciente</p>
            <p className="mt-1 font-semibold text-gray-900">
              {paciente.id}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Estado</p>
            <p className="mt-1 font-semibold text-gray-900">
              No disponible en el backend
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Correo electrónico
            </p>
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
            <p className="text-sm text-gray-500">
              Especialidad asignada
            </p>
            <p className="mt-1 font-semibold text-gray-900">
              No disponible en el backend
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Última cita</p>
            <p className="mt-1 font-semibold text-gray-900">
              No disponible en el backend
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-sm text-gray-500">
              Fecha de nacimiento
            </p>
            <p className="mt-1 font-semibold text-gray-900">
              {paciente &&
                'fechaNacimiento' in paciente
                ? String(paciente.fechaNacimiento)
                : 'Consulta no disponible'}
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
