
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { citaSchema, type CitaFormData } from '../schemas/citaSchema'
import useMedicos from '../hooks/useMedicos'

export default function FormularioCita() {
  const { medicos, cargando } = useMedicos()
  const [citaConfirmada, setCitaConfirmada] = useState<CitaFormData | null>(
    null,
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CitaFormData>({
    resolver: zodResolver(citaSchema),
    defaultValues: {
      pacienteNombre: '',
      medicoId: '',
      fecha: '',
      hora: '',
      motivo: '',
      urgencia: 'media',
    },
  })

  const onSubmit = async (datos: CitaFormData) => {
    await new Promise<void>((resolve) => setTimeout(resolve, 1500))
    setCitaConfirmada(datos)
  }

  const agendarOtraCita = () => {
    reset()
    setCitaConfirmada(null)
  }

  const claseCampo = (tieneError: boolean) =>
    `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${
      tieneError
        ? 'border-red-500 focus:ring-2 focus:ring-red-200'
        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
    }`

  if (citaConfirmada) {
    const medicoSeleccionado = medicos.find(
      (medico) => medico.id === citaConfirmada.medicoId,
    )

    return (
      <section className="mx-auto w-full max-w-2xl rounded-2xl border border-green-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
          ✓
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-900">
          ¡Cita agendada correctamente!
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          La información de tu cita ha sido registrada correctamente en esta
          demostración.
        </p>

        <div className="mt-6 space-y-4 rounded-xl bg-gray-50 p-5">
          <div>
            <p className="text-xs font-medium uppercase text-gray-500">
              Paciente
            </p>
            <p className="mt-1 font-semibold text-gray-900">
              {citaConfirmada.pacienteNombre}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-gray-500">
              Médico
            </p>
            <p className="mt-1 font-semibold text-gray-900">
              {medicoSeleccionado
                ? `${medicoSeleccionado.nombre} — ${medicoSeleccionado.especialidad}`
                : 'Médico seleccionado'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase text-gray-500">
                Fecha
              </p>
              <p className="mt-1 font-semibold text-gray-900">
                {citaConfirmada.fecha}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase text-gray-500">
                Hora
              </p>
              <p className="mt-1 font-semibold text-gray-900">
                {citaConfirmada.hora}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-gray-500">
              Motivo
            </p>
            <p className="mt-1 break-words text-gray-900">
              {citaConfirmada.motivo}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-gray-500">
              Urgencia
            </p>
            <p className="mt-1 font-semibold capitalize text-gray-900">
              {citaConfirmada.urgencia}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={agendarOtraCita}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Agendar otra cita
        </button>
      </section>
    )
  }

  return (
    <section className="mx-auto w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-600">
          CLÍNICA SALUD INTEGRAL
        </p>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Nueva cita médica
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Completa los datos para agendar una cita.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div>
          <label
            htmlFor="pacienteNombre"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Nombre del paciente
          </label>
          <input
            id="pacienteNombre"
            type="text"
            placeholder="Ej. María Pérez"
            aria-invalid={Boolean(errors.pacienteNombre)}
            aria-describedby={
              errors.pacienteNombre ? 'pacienteNombre-error' : undefined
            }
            {...register('pacienteNombre')}
            className={claseCampo(Boolean(errors.pacienteNombre))}
          />
          {errors.pacienteNombre && (
            <p id="pacienteNombre-error" className="mt-1 text-sm text-red-600">
              {errors.pacienteNombre.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="medicoId"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Médico
          </label>
          <select
            id="medicoId"
            {...register('medicoId')}
            disabled={cargando}
            aria-invalid={Boolean(errors.medicoId)}
            aria-describedby={errors.medicoId ? 'medicoId-error' : undefined}
            className={claseCampo(Boolean(errors.medicoId))}
          >
            <option value="">
              {cargando ? 'Cargando médicos...' : 'Selecciona un médico'}
            </option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.nombre} — {medico.especialidad}
              </option>
            ))}
          </select>
          {errors.medicoId && (
            <p id="medicoId-error" className="mt-1 text-sm text-red-600">
              {errors.medicoId.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="fecha"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Fecha de la cita
            </label>
            <input
              id="fecha"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              {...register('fecha')}
              aria-invalid={Boolean(errors.fecha)}
              aria-describedby={errors.fecha ? 'fecha-error' : undefined}
              className={claseCampo(Boolean(errors.fecha))}
            />
            {errors.fecha && (
              <p id="fecha-error" className="mt-1 text-sm text-red-600">
                {errors.fecha.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="hora"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Hora
            </label>
            <input
              id="hora"
              type="time"
              {...register('hora')}
              aria-invalid={Boolean(errors.hora)}
              aria-describedby={errors.hora ? 'hora-error' : undefined}
              className={claseCampo(Boolean(errors.hora))}
            />
            {errors.hora && (
              <p id="hora-error" className="mt-1 text-sm text-red-600">
                {errors.hora.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="motivo"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Motivo de la consulta
          </label>
          <textarea
            id="motivo"
            rows={4}
            maxLength={500}
            placeholder="Describe el motivo de la consulta (10 a 500 caracteres)"
            {...register('motivo')}
            aria-invalid={Boolean(errors.motivo)}
            aria-describedby={errors.motivo ? 'motivo-error' : undefined}
            className={claseCampo(Boolean(errors.motivo))}
          />
          <p className="mt-1 text-right text-xs text-gray-500">
            Máximo 500 caracteres
          </p>
          {errors.motivo && (
            <p id="motivo-error" className="mt-1 text-sm text-red-600">
              {errors.motivo.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="urgencia"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Nivel de urgencia
          </label>
          <select
            id="urgencia"
            {...register('urgencia')}
            aria-invalid={Boolean(errors.urgencia)}
            aria-describedby={errors.urgencia ? 'urgencia-error' : undefined}
            className={claseCampo(Boolean(errors.urgencia))}
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
            <option value="critica">Crítica</option>
          </select>
          {errors.urgencia && (
            <p id="urgencia-error" className="mt-1 text-sm text-red-600">
              {errors.urgencia.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || cargando}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isSubmitting ? 'Agendando...' : 'Agendar cita'}
        </button>
      </form>
    </section>
  )
}
