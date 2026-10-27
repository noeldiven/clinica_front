
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  actualizarEstadoCita,
  obtenerCitas,
} from '../services/citas'
import type {
  CitaAPI,
  EstadoCita,
} from '../services/citas'

const opcionesEstado: EstadoCita[] = [
  'PROGRAMADA',
  'COMPLETADA',
  'CANCELADA',
]

function formatearFecha(fecha: string): string {
  return new Date(fecha).toLocaleString('es-PE', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

export default function ListaCitas() {
  const [citas, setCitas] = useState<CitaAPI[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [actualizando, setActualizando] = useState<number[]>([])

  const cargarCitas = useCallback(async () => {
    setCargando(true)
    setError('')

    try {
      const datos = await obtenerCitas()
      setCitas(datos)
    } catch {
      setError('No se pudieron cargar las citas.')
      toast.error('Error al cargar las citas')
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    void cargarCitas()
  }, [cargarCitas])

  const cambiarEstado = async (
    cita: CitaAPI,
    nuevoEstado: EstadoCita,
  ) => {
    if (
      cita.estado === nuevoEstado ||
      actualizando.includes(cita.id)
    ) {
      return
    }

    const estadoAnterior = cita.estado

    // Actualización optimista: la interfaz cambia inmediatamente.
    setCitas((actuales) =>
      actuales.map((item) =>
        item.id === cita.id
          ? { ...item, estado: nuevoEstado }
          : item,
      ),
    )

    setActualizando((actuales) => [...actuales, cita.id])

    try {
      const citaActualizada = await actualizarEstadoCita(
        cita.id,
        nuevoEstado,
      )

      setCitas((actuales) =>
        actuales.map((item) =>
          item.id === cita.id
            ? { ...item, ...citaActualizada }
            : item,
        ),
      )

      toast.success('Estado de la cita actualizado')
    } catch {
      // Si falla el servidor, restauramos el estado anterior.
      setCitas((actuales) =>
        actuales.map((item) =>
          item.id === cita.id
            ? { ...item, estado: estadoAnterior }
            : item,
        ),
      )

      toast.error('No se pudo actualizar el estado de la cita')
    } finally {
      setActualizando((actuales) =>
        actuales.filter((id) => id !== cita.id),
      )
    }
  }

  if (cargando) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-slate-500">Cargando citas...</p>
      </section>
    )
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Gestión de citas
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Consulta y actualiza el estado de las citas.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void cargarCitas()}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Actualizar lista
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
          {error}
          <button
            type="button"
            onClick={() => void cargarCitas()}
            className="ml-2 font-bold underline"
          >
            Reintentar
          </button>
        </div>
      )}

      {!error && citas.length === 0 ? (
        <p className="rounded-lg bg-slate-50 p-5 text-center text-slate-500">
          No hay citas registradas.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-3 font-semibold">Paciente</th>
                <th className="px-3 py-3 font-semibold">Médico</th>
                <th className="px-3 py-3 font-semibold">Fecha</th>
                <th className="px-3 py-3 font-semibold">Estado</th>
              </tr>
            </thead>

            <tbody>
              {citas.map((cita) => (
                <tr
                  key={cita.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-3 py-4 font-medium text-slate-800">
                    {cita.paciente
                      ? `${cita.paciente.nombre} ${cita.paciente.apellidos}`
                      : `Paciente #${cita.pacienteId}`}
                  </td>

                  <td className="px-3 py-4 text-slate-600">
                    {cita.medico
                      ? `${cita.medico.nombre} ${cita.medico.apellidos}`
                      : `Médico #${cita.medicoId}`}
                  </td>

                  <td className="px-3 py-4 text-slate-600">
                    {formatearFecha(cita.fechaHora)}
                  </td>

                  <td className="px-3 py-4">
                    <select
                      aria-label={`Estado de la cita ${cita.id}`}
                      value={cita.estado}
                      disabled={actualizando.includes(cita.id)}
                      onChange={(event) =>
                        void cambiarEstado(
                          cita,
                          event.target.value as EstadoCita,
                        )
                      }
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm disabled:opacity-50"
                    >
                      {opcionesEstado.map((estado) => (
                        <option key={estado} value={estado}>
                          {estado}
                        </option>
                      ))}
                    </select>

                    {actualizando.includes(cita.id) && (
                      <span className="ml-2 text-xs text-slate-500">
                        Guardando...
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
