
import { NavLink, Outlet } from 'react-router-dom'

const enlaces = [
  { to: '/', label: 'Panel general', end: true },
  { to: '/pacientes', label: 'Pacientes', end: false },
  { to: '/citas/nueva', label: 'Nueva cita', end: false },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 md:flex">
      <aside className="w-full shrink-0 bg-slate-900 text-white md:fixed md:inset-y-0 md:left-0 md:w-64">
        <div className="border-b border-slate-700 px-6 py-6">
          <h1 className="text-xl font-bold">Clínica Salud Integral</h1>
          <p className="mt-1 text-sm text-slate-400">Sistema de gestión</p>
        </div>

        <nav className="flex gap-2 overflow-x-auto p-4 md:flex-col">
          {enlaces.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {enlace.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 p-4 sm:p-6 md:ml-64 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
