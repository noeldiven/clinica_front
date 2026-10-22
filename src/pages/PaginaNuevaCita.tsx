
import { useNavigate } from 'react-router-dom'
import FormularioCita from '../componentes/FormularioCita'

export default function PaginaNuevaCita() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-4xl">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-5 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        ← Cancelar
      </button>

      <FormularioCita />
    </div>
  )
}
