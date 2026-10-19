
import { z } from 'zod'

const obtenerFechaActual = (): string => {
  const ahora = new Date()
  const anio = ahora.getFullYear()
  const mes = String(ahora.getMonth() + 1).padStart(2, '0')
  const dia = String(ahora.getDate()).padStart(2, '0')

  return `${anio}-${mes}-${dia}`
}

export const citaSchema = z.object({
  pacienteNombre: z
    .string()
    .trim()
    .min(3, 'El nombre del paciente debe tener al menos 3 caracteres'),

  medicoId: z
    .string()
    .min(1, 'Debes seleccionar un médico'),

  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener el formato YYYY-MM-DD')
    .refine((fecha) => {
      const [anio, mes, dia] = fecha.split('-').map(Number)
      const fechaIngresada = new Date(Date.UTC(anio, mes - 1, dia))

      const fechaValida =
        fechaIngresada.getUTCFullYear() === anio &&
        fechaIngresada.getUTCMonth() === mes - 1 &&
        fechaIngresada.getUTCDate() === dia

      return fechaValida && fecha >= obtenerFechaActual()
    }, 'Ingresa una fecha válida que no sea pasada'),

  hora: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      'La hora debe estar entre 00:00 y 23:59',
    ),

  motivo: z
    .string()
    .trim()
    .min(10, 'El motivo debe tener al menos 10 caracteres')
    .max(500, 'El motivo no puede superar los 500 caracteres'),

  urgencia: z.enum(['baja', 'media', 'alta', 'critica']),
})

export type CitaFormData = z.infer<typeof citaSchema>
