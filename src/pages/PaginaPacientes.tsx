
/*
 * Problemas encontrados en el código generado por la IA:
 * 1. Mezcla toda la interfaz en un único archivo HTML, sin separar componentes reutilizables.
 * 2. Repite los datos de pacientes directamente en el marcado en lugar de usar datos tipados.
 * 3. Usa manipulación directa del DOM para buscar y filtrar, en vez de estructurar la interfaz con React y TypeScript.
 */

import{ useState } from 'react'
import PacienteRow from '../componentes/PacienteRow'
import PacienteCard from '../componentes/PacienteCard'
import BuscadorPacientes from '../componentes/BuscadorPacientes'
import type { Paciente } from '../types/paciente'

const pacientesEjemplo: Paciente[] = [
  {
    id: '1',
    nombre: 'Elena',
    apellido: 'Morales Ruiz',
    email: 'elena.morales@email.com',
    telefono: '987 654 321',
    especialidadAsignada: 'Cardiología',
    ultimaCita: '12 oct. 2026',
    estado: 'activo',
  },
  {
    id: '2',
    nombre: 'Carlos',
    apellido: 'Mendoza Vega',
    email: 'carlos.mendoza@email.com',
    telefono: '986 123 456',
    especialidadAsignada: 'Medicina General',
    ultimaCita: '10 oct. 2026',
    estado: 'activo',
  },
  {
    id: '3',
    nombre: 'Lucía',
    apellido: 'Herrera Ortiz',
    email: 'lucia.herrera@email.com',
    telefono: '985 222 333',
    especialidadAsignada: 'Pediatría',
    ultimaCita: 'Sin citas previas',
    estado: 'en_espera',
  },
  {
    id: '4',
    nombre: 'Javier',
    apellido: 'Benítez Soler',
    email: 'javier.benitez@email.com',
    telefono: '984 555 666',
    especialidadAsignada: 'Dermatología',
    ultimaCita: '15 ago. 2026',
    estado: 'inactivo',
  },
  {
    id: '5',
    nombre: 'Sofía',
    apellido: 'Romero Castro',
    email: 'sofia.romero@email.com',
    telefono: '983 777 888',
    especialidadAsignada: 'Medicina General',
    ultimaCita: '13 oct. 2026',
    estado: 'activo',
  },
]

export default function PaginaPacientes() {
  const [busqueda, setBusqueda] = useState('')

  const totalPacientes = pacientesEjemplo.length
  const totalActivos = pacientesEjemplo.filter(
    (paciente) => paciente.estado === 'activo',
  ).length
  const totalEnEspera = pacientesEjemplo.filter(
    (paciente) => paciente.estado === 'en_espera',
  ).length
  const totalInactivos = pacientesEjemplo.filter(
    (paciente) => paciente.estado === 'inactivo',
  ).length

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
          <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl font-bold text-white">
              +
            </div>
            <div>
              <p className="font-extrabold text-slate-900">Clínica Central</p>
              <p className="text-xs text-slate-500">Hospital San Lucas</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2 p-4" aria-label="Navegación principal">
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
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                +
              </div>
              <div>
                <p className="font-extrabold text-slate-900">Clínica Central</p>
                <p className="text-xs text-slate-500">Hospital San Lucas</p>
              </div>
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-500">
                Panel de administración
              </p>
              <p className="text-xs text-slate-400">
                Gestión de pacientes
              </p>
            </div>

            <div className="ml-auto flex items-center gap-3">
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
                  Consulta el directorio y revisa la información general de los pacientes.
                </p>
              </div>

              <button
                type="button"
                disabled
                title="El registro se implementará en una siguiente etapa"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-bold text-white opacity-70"
              >
                <span className="text-xl">＋</span>
                Nuevo paciente
              </button>
            </section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Total pacientes
                </p>
                <p className="mt-3 text-3xl font-extrabold text-slate-900">
                  {totalPacientes}
                </p>
                <p className="mt-3 text-sm text-blue-600">
                  Registros de ejemplo
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Activos
                </p>
                <p className="mt-3 text-3xl font-extrabold text-slate-900">
                  {totalActivos}
                </p>
                <p className="mt-3 text-sm text-emerald-600">
                  Pacientes activos
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  En espera
                </p>
                <p className="mt-3 text-3xl font-extrabold text-slate-900">
                  {totalEnEspera}
                </p>
                <p className="mt-3 text-sm text-amber-600">
                  Pendientes de seguimiento
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-500">
                  Inactivos
                </p>
                <p className="mt-3 text-3xl font-extrabold text-slate-900">
                  {totalInactivos}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  Sin actividad reciente
                </p>
              </article>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      Directorio de pacientes
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Lista de pacientes registrados en el sistema.
                    </p>
                  </div>

                  <div className="w-full md:max-w-md">
                    <BuscadorPacientes
                      value={busqueda}
                      onChange={setBusqueda}
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <select
                    aria-label="Filtrar por estado"
                    defaultValue="todos"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
                  >
                    <option value="todos">Todos los estados</option>
                    <option value="activo">Activo</option>
                    <option value="en_espera">En espera</option>
                    <option value="inactivo">Inactivo</option>
                  </select>

                  <select
                    aria-label="Filtrar por especialidad"
                    defaultValue="todas"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
                  >
                    <option value="todas">Todas las especialidades</option>
                    <option value="Cardiología">Cardiología</option>
                    <option value="Medicina General">Medicina General</option>
                    <option value="Pediatría">Pediatría</option>
                    <option value="Dermatología">Dermatología</option>
                  </select>
                </div>
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[850px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-4 font-extrabold">Paciente</th>
                      <th className="px-5 py-4 font-extrabold">Teléfono</th>
                      <th className="px-5 py-4 font-extrabold">Especialidad</th>
                      <th className="px-5 py-4 font-extrabold">Última cita</th>
                      <th className="px-5 py-4 font-extrabold">Estado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pacientesEjemplo.map((paciente) => (
                      <PacienteRow key={paciente.id} paciente={paciente} />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-3 p-4 md:hidden">
                {pacientesEjemplo.map((paciente) => (
                  <PacienteCard key={paciente.id} paciente={paciente} />
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
