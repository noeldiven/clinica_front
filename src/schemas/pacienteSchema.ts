
import { z } from 'zod'

export const pacienteSchema = z.object({
  nombre: z.string().trim().min(1, 'El nombre es obligatorio'),
  apellidos: z.string().trim().min(1, 'Los apellidos son obligatorios'),
  email: z.string().trim().email('Introduce un correo electrónico válido'),
  telefono: z.string().trim().min(9, 'Introduce un teléfono válido'),
  fechaNacimiento: z.string().min(1, 'La fecha de nacimiento es obligatoria'),
})

export type PacienteFormData = z.infer<typeof pacienteSchema>
