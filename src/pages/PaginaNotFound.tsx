
import { Link } from 'react-router-dom'

export default function PaginaNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <span className="text-7xl" role="img" aria-label="Página no encontrada">
        🔎
      </span>

      <h1 className="mt-6 text-6xl font-extrabold text-slate-900">404</h1>

      <h2 className="mt-3 text-2xl font-bold text-slate-800">
        Página no encontrada
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        Lo sentimos, la página que buscas no existe o la dirección es incorrecta.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
