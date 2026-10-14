
interface BuscadorPacientesProps {
  value: string
  onChange: (value: string) => void
}

export default function BuscadorPacientes({
  value,
  onChange,
}: BuscadorPacientesProps) {
  return (
    <label className="relative block w-full">
      <span className="sr-only">Buscar pacientes</span>

      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400">
        ⌕
      </span>

      <input
        type="search"
        value={value}
        onChange={(evento) => onChange(evento.target.value)}
        placeholder="Buscar por nombre, correo o teléfono..."
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  )
}
