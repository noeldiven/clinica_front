import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import api from '../lib/axios'
import PacienteRow from '../componentes/PacienteRow'
import PacienteCard from '../componentes/PacienteCard'
import BuscadorPacientes from '../componentes/BuscadorPacientes'
import type { EstadoPaciente, Paciente } from '../types/paciente'
import { pacienteSchema } from '../schemas/pacienteSchema'
import type { PacienteFormData } from '../schemas/pacienteSchema'
import { crearPaciente } from '../services/pacientes'
import { adaptarPaciente } from '../services/pacientes'
import { extraerMensajeError } from '../lib/errorHandler'


interface PacienteAPI {
  id: number
  nombre: string
  apellidos: string
  email: string
  telefono: string
  fechaNacimiento: string
}

export default function PaginaPacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState('')

  const [busqueda, setBusqueda] = useState('')
  const [estadoFiltro, setEstadoFiltro] = useState<
    'Todos' | EstadoPaciente
  >('Todos')

 
const [mostrarFormulario, setMostrarFormulario] = useState(false)

const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<PacienteFormData>({
  resolver: zodResolver(pacienteSchema),
  defaultValues: {
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
  },
})

  // Consultar los pacientes reales del backend.
  useEffect(() => {
    async function cargarPacientes() {
      try {
        setCargando(true)
        setErrorCarga('')

        const respuesta = await api.get<PacienteAPI[]>('/pacientes')

        const pacientesAdaptados: Paciente[] = respuesta.data.map(
          (paciente) => ({
            id: String(paciente.id),
            nombre: paciente.nombre,
            apellido: paciente.apellidos,
            email: paciente.email,
            telefono: paciente.telefono,
            especialidadAsignada: 'No disponible',
            ultimaCita: 'No disponible',
            // El backend actual no proporciona el estado clínico.
            // Se usa este valor solo para mantener la compatibilidad
            // con los componentes existentes.
            estado: 'activo',
          }),
        )

        setPacientes(pacientesAdaptados)
      } catch (error) {
        console.error('Error al cargar pacientes:', error)

        setErrorCarga(
          'No se pudieron cargar los pacientes. Comprueba que el backend esté funcionando y que hayas iniciado sesión.',
        )
      } finally {
        setCargando(false)
      }
    }

    cargarPacientes()
  }, [])

  // Buscar por nombre, apellidos o correo electrónico.
  const pacientesFiltrados = pacientes.filter((paciente) => {
    const textoBusqueda = busqueda.toLowerCase().trim()

    const coincideBusqueda = [
      paciente.nombre,
      paciente.apellido,
      paciente.email,
    ].some((dato) => dato.toLowerCase().includes(textoBusqueda))

    const coincideEstado =
      estadoFiltro === 'Todos' || paciente.estado === estadoFiltro

    return coincideBusqueda && coincideEstado
  })

  const totalPacientes = pacientes.length
  const totalActivos = pacientes.filter(
    (paciente) => paciente.estado === 'activo',
  ).length
  const totalEnEspera = pacientes.filter(
    (paciente) => paciente.estado === 'en_espera',
  ).length
  const totalInactivos = pacientes.filter(
    (paciente) => paciente.estado === 'inactivo',
  ).length

  const handleBusquedaChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setBusqueda(event.target.value)
  }

  const handleEstadoFiltroChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setEstadoFiltro(event.target.value as 'Todos' | EstadoPaciente)
  }

  const handleLimpiarFiltros = () => {
    setBusqueda('')
    setEstadoFiltro('Todos')
  }

  // Este formulario aún no envía los datos al backend.
 
const handleAgregarPaciente = async (datos: PacienteFormData) => {
  try {
    const pacienteCreado = await crearPaciente(datos)

    setPacientes((prev) => [
      adaptarPaciente(pacienteCreado),
      ...prev,
    ])

    reset()
    setMostrarFormulario(false)
    toast.success('Paciente registrado')
  } catch (err: unknown) {
    toast.error(extraerMensajeError(err))
  }
}


  // Estos cambios son locales y no se guardan en el servidor.
  const handleCambiarEstado = (
    id: string,
    estado: EstadoPaciente,
  ) => {
    setPacientes((prev) =>
      prev.map((paciente) =>
        paciente.id === id ? { ...paciente, estado } : paciente,
      ),
    )
  }

  const handleEliminarPaciente = (id: string) => {
    const confirmado = window.confirm(
      'Esta acción solo quitará el paciente de la pantalla. ¿Deseas continuar?',
    )

    if (!confirmado) return

    setPacientes((prev) => prev.filter((paciente) => paciente.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
          <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl font-bold text-white">
              +
            </div>
            <div>
              <p className="font-extrabold text-slate-900">
                Clínica Central
              </p>
              <p className="text-xs text-slate-500">Hospital San Lucas</p>
            </div>
          </div>

          <nav
            className="flex-1 space-y-2 p-4"
            aria-label="Navegación principal"
          >
            <p className="px-3 pb-2 pt-3 text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Menú principal
            </p>
            <div className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-500">
              ▦ &nbsp; Dashboard
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-3 text-sm font-bold text-blue-700">
              <span>♙</span>
              Pacientes
              <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
            </div>
            <div className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-500">
              ▣ &nbsp; Citas médicas
            </div>
            <div className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-500">
              ✚ &nbsp; Especialidades
            </div>
            <div className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-500">
              ▤ &nbsp; Reportes
            </div>
          </nav>

          <div className="m-4 rounded-2xl bg-blue-950 p-4 text-white">
            <p className="font-bold">¿Necesitas ayuda?</p>
            <p className="mt-2 text-xs leading-5 text-blue-100">
              Consulta con el equipo de administración del sistema.
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Panel de administración
              </p>
              <p className="text-xs text-slate-400">
                Gestión de pacientes
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-slate-500 sm:inline">
                Administrador
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-extrabold text-blue-700">
                AD
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-8">
            <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                  Gestión clínica / Pacientes
                </p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Pacientes
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                  Consulta y administra los pacientes registrados.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setMostrarFormulario((prev) => !prev)
                  reset()
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
              >
                <span className="text-xl">＋</span>
                {mostrarFormulario ? 'Cancelar' : 'Nuevo paciente'}
              </button>
            </section>

            {cargando && (
              <div
                role="status"
                className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700"
              >
                Cargando pacientes desde el servidor...
              </div>
            )}

            {errorCarga && (
              <div
                role="alert"
                className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
              >
                <p>{errorCarga}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-2 font-bold underline"
                >
                  Volver a intentar
                </button>
              </div>
            )}
            
            {mostrarFormulario && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Registrar paciente
                </h2>

                <form
                  onSubmit={handleSubmit(handleAgregarPaciente)}
                  className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <div>
                    <label htmlFor="nombre" className="mb-1 block text-sm font-semibold text-slate-700">
                      Nombre *
                    </label>
                    <input
                      id="nombre"
                      {...register('nombre')}
                      className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                      placeholder="Nombre del paciente"
                    />
                    {errors.nombre && (
                      <p className="mt-1 text-sm text-rose-600">{errors.nombre.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="apellidos" className="mb-1 block text-sm font-semibold text-slate-700">
                      Apellidos *
                    </label>
                    <input
                      id="apellidos"
                      {...register('apellidos')}
                      className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                      placeholder="Apellidos del paciente"
                    />
                    {errors.apellidos && (
                      <p className="mt-1 text-sm text-rose-600">{errors.apellidos.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                      placeholder="paciente@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="telefono" className="mb-1 block text-sm font-semibold text-slate-700">
                      Teléfono *
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      {...register('telefono')}
                      className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                      placeholder="987654321"
                    />
                    {errors.telefono && (
                      <p className="mt-1 text-sm text-rose-600">{errors.telefono.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="fechaNacimiento" className="mb-1 block text-sm font-semibold text-slate-700">
                      Fecha de nacimiento *
                    </label>
                    <input
                      id="fechaNacimiento"
                      type="date"
                      {...register('fechaNacimiento')}
                      className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                    />
                    {errors.fechaNacimiento && (
                      <p className="mt-1 text-sm text-rose-600">
                        {errors.fechaNacimiento.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 sm:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? 'Guardando...' : 'Guardar paciente'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        reset()
                        setMostrarFormulario(false)
                      }}
                      className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </section>
            )}


            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  titulo: 'Total pacientes',
                  valor: totalPacientes,
                  descripcion: 'Registros actuales',
                  color: 'text-blue-600',
                },
                {
                  titulo: 'Activos',
                  valor: totalActivos,
                  descripcion: 'Estado provisional',
                  color: 'text-emerald-600',
                },
                {
                  titulo: 'En espera',
                  valor: totalEnEspera,
                  descripcion: 'Estado no proporcionado por la API',
                  color: 'text-amber-600',
                },
                {
                  titulo: 'Inactivos',
                  valor: totalInactivos,
                  descripcion: 'Estado no proporcionado por la API',
                  color: 'text-slate-500',
                },
              ].map((tarjeta) => (
                <article
                  key={tarjeta.titulo}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm font-semibold text-slate-500">
                    {tarjeta.titulo}
                  </p>
                  <p className="mt-3 text-3xl font-extrabold text-slate-900">
                    {tarjeta.valor}
                  </p>
                  <p className={`mt-3 text-sm ${tarjeta.color}`}>
                    {tarjeta.descripcion}
                  </p>
                </article>
              ))}
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-5 sm:p-6">
                <h2 className="text-lg font-extrabold text-slate-900">
                  Directorio de pacientes
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {cargando
                    ? 'Consultando servidor...'
                    : `${pacientesFiltrados.length} paciente(s) encontrado(s)`}
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
                  <BuscadorPacientes
                    value={busqueda}
                    onChange={handleBusquedaChange}
                  />

                  <select
                    aria-label="Filtrar por estado"
                    value={estadoFiltro}
                    onChange={handleEstadoFiltroChange}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-600 outline-none focus:border-blue-500"
                  >
                    <option value="Todos">Todos los estados</option>
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="en_espera">En espera</option>
                  </select>

                  <button
                    type="button"
                    onClick={handleLimpiarFiltros}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[1100px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-4 font-extrabold">Paciente</th>
                      <th className="px-5 py-4 font-extrabold">Teléfono</th>
                      <th className="px-5 py-4 font-extrabold">Especialidad</th>
                      <th className="px-5 py-4 font-extrabold">Última cita</th>
                      <th className="px-5 py-4 font-extrabold">Estado</th>
                      <th className="px-5 py-4 font-extrabold">Cambiar estado</th>
                      <th className="px-5 py-4 font-extrabold">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {!cargando &&
                      !errorCarga &&
                      pacientesFiltrados.map((paciente) => (
                        <PacienteRow
                          key={paciente.id}
                          paciente={paciente}
                          onCambiarEstado={handleCambiarEstado}
                          onEliminar={handleEliminarPaciente}
                        />
                      ))}
                  </tbody>
                </table>
              </div>

              {!cargando &&
                !errorCarga &&
                pacientesFiltrados.length === 0 && (
                  <p className="p-8 text-center text-sm text-slate-500">
                    No se encontraron pacientes con esos filtros.
                  </p>
                )}

              <div className="flex flex-col gap-3 p-4 md:hidden">
                {!cargando &&
                  !errorCarga &&
                  pacientesFiltrados.map((paciente) => (
                    <PacienteCard
                      key={paciente.id}
                      paciente={paciente}
                      onCambiarEstado={handleCambiarEstado}
                      onEliminar={handleEliminarPaciente}
                    />
                  ))}
              </div>
            </section>

            <footer className="pb-3 text-center text-xs text-slate-400">
              Clínica Central · Hospital San Lucas
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
