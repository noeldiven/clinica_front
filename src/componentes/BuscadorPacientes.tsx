import type { ChangeEvent } from 'react'

interface BuscadorPacientesProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function BuscadorPacientes({
  value,
  onChange,
}: BuscadorPacientesProps) {
  return (
    <input
      type="search"
      aria-label="Buscar paciente por nombre"
      placeholder="Buscar por nombre..."
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  )
}