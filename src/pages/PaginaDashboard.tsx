
import { useState } from 'react';
import MetricCard from '../componentes/MetricCard';
import StatusBadge from '../componentes/StatusBadge';
import type { Metrica } from '../types';

export default function PaginaDashboard() {
  const [pacientes, setPacientes] = useState(128);
  const [mantenimiento, setMantenimiento] = useState(false);

  const metricas: Metrica[] = [
    {
      id: 'pacientes',
      titulo: 'Pacientes',
      valor: pacientes,
      descripcion: 'Total de pacientes registrados',
      tendencia: 'positiva',
      icono: '👥',
    },
    {
      id: 'citas',
      titulo: 'Citas Hoy',
      valor: 24,
      descripcion: 'Citas programadas para hoy',
      tendencia: 'positiva',
      icono: '📅',
    },
    {
      id: 'pendientes',
      titulo: 'Consultas Pendientes',
      valor: 8,
      descripcion: 'Consultas por atender',
      tendencia: 'negativa',
      icono: '⏳',
    },
    {
      id: 'disponibilidad',
      titulo: 'Disponibilidad',
      valor: '92%',
      descripcion: 'Disponibilidad del sistema',
      tendencia: 'neutra',
      icono: '💚',
    },
  ];

  const incrementarPacientes = () => {
    setPacientes((anterior) => anterior + 1);
  };

  const disminuirPacientes = () => {
    setPacientes((anterior) => Math.max(0, anterior - 1));
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
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
            Utiliza los botones para modificar el total de pacientes.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={disminuirPacientes}
              className="rounded-lg border border-slate-300 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-100"
            >
              − Disminuir
            </button>

            <button
              type="button"
              onClick={incrementarPacientes}
              className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
            >
              + Aumentar
            </button>

            <span className="text-sm text-slate-500">
              Total actual: <strong>{pacientes}</strong>
            </span>
          </div>
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
      </div>
    </main>
  );
}
