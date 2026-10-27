import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MetricCard from '../componentes/MetricCard'
import StatusBadge from '../componentes/StatusBadge'
import type { Metrica } from '../types'
import api from '../lib/axios'
import ListaCitas from '../componentes/ListaCitas'

interface RegistroAPI {
  id: number | string
  estado?: string
}

type RespuestaLista<T> =
  | T[]
  | {
      data: T[]
      total?: number
    }

interface DatosMetricas {
  pacientes: number
  medicos: number
  citasProgramadas: number
  completadas: number
}

function contarRegistros<T>(
  respuesta: RespuestaLista<T>,
): number {
  if (Array.isArray(respuesta)) {
    return respuesta.length
  }

  return respuesta.total ?? respuesta.data.length
}

function contarCitasPorEstado(
  respuesta: RespuestaLista<RegistroAPI>,
  estadoBuscado: string,
): number {
  const registros = Array.isArray(respuesta)
    ? respuesta
    : respuesta.data

  return registros.filter(
    (cita) => cita.estado === estadoBuscado,
  ).length
}

export default function PaginaDashboard() {
  const [datos, setDatos] = useState<DatosMetricas | null>(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [mantenimiento, setMantenimiento] = useState(false)

  const cargarMetricas = useCallback(async () => {
    setCargando(true)
    setError('')

    try {
            const [
        respuestaPacientes,
        respuestaMedicos,
        respuestaCitas,
      ] = await Promise.all([
        api.get<RespuestaLista<RegistroAPI>>('/pacientes'),
        api.get<RespuestaLista<RegistroAPI>>('/medicos'),
        api.get<RespuestaLista<RegistroAPI>>('/citas'),
      ])

      setDatos({
        pacientes: contarRegistros(respuestaPacientes.data),
        medicos: contarRegistros(respuestaMedicos.data),
        citasProgramadas: contarCitasPorEstado(
          respuestaCitas.data,
          'PROGRAMADA',
        ),
        completadas: contarCitasPorEstado(
          respuestaCitas.data,
          'COMPLETADA',
        ),
      })
    } catch (errorConsulta) {
      console.error('Error al cargar las métricas:', errorConsulta)
      setDatos(null)
      setError(
        'No se pudieron cargar las métricas. Comprueba que el backend esté activo y que tu sesión sea válida.',
      )
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    void cargarMetricas()
  }, [cargarMetricas])

  const metricas: Metrica[] = [
    {
      id: 'pacientes',
      titulo: 'Pacientes',
      valor: cargando ? '...' : (datos?.pacientes ?? '—'),
      descripcion: 'Total de pacientes registrados',
      tendencia: 'positiva',
      icono: '👥',
    },
    {
      id: 'medicos',
      titulo: 'Médicos',
      valor: cargando ? '...' : (datos?.medicos ?? '—'),
      descripcion: 'Total de médicos registrados',
      tendencia: 'positiva',
      icono: '🩺',
    },
    {
      id: 'citas-programadas',
      titulo: 'Citas Programadas',
      valor: cargando ? '...' : (datos?.citasProgramadas ?? '—'),
      descripcion: 'Citas con estado COMPLETADA',
      tendencia: 'neutra',
      icono: '📅',
    },
    {
      id: 'completadas',
      titulo: 'Completadas Hoy',
      valor: cargando ? '...' : (datos?.completadas ?? '—'),
      descripcion: 'Citas con estado Completada',
      tendencia: 'positiva',
      icono: '✅',
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard de Clínica
          </h1>
          <p className="mt-2 text-slate-500">
            Resumen general de la clínica
          </p>
        </div>

        <StatusBadge activo={mantenimiento} />
      </header>

      {mantenimiento && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-800"
        >
          <p className="font-semibold">
            Atención: el sistema está en mantenimiento.
          </p>
          <p className="mt-1 text-sm">
            Algunas funciones podrían no estar disponibles.
          </p>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-800"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => void cargarMetricas()}
            className="mt-3 rounded-lg bg-rose-700 px-4 py-2 font-semibold text-white hover:bg-rose-800"
          >
            Reintentar
          </button>
        </div>
      )}

      <section
        aria-label="Indicadores de la clínica"
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {metricas.map((metrica) => (
          <MetricCard key={metrica.id} metrica={metrica} />
        ))}
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Gestión de pacientes
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          El total se obtiene de los registros del backend.
        </p>

        <div className="mt-5">
          <span className="text-sm text-slate-500">
            Total de pacientes:{' '}
            <strong>
              {cargando
                ? 'Cargando...'
                : datos
                  ? datos.pacientes
                  : 'No disponible'}
            </strong>
          </span>
        </div>

        <Link
          to="/pacientes"
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >
          Ver Pacientes →
        </Link>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Estado del sistema
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Activa o desactiva el modo mantenimiento.
        </p>

        <button
          type="button"
          onClick={() => setMantenimiento((anterior) => !anterior)}
          className={`mt-4 rounded-lg px-5 py-2 font-semibold text-white ${
            mantenimiento
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-rose-600 hover:bg-rose-700'
          }`}
        >
          {mantenimiento
            ? 'Desactivar mantenimiento'
            : 'Activar mantenimiento'}
        </button>
      </section>
      <ListaCitas />
    </div>
  )
}
