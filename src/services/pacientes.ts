
import api from '../lib/axios'
import type { Paciente } from '../types/paciente'

export interface PacienteAPI {
  id: number
  nombre: string
  apellidos: string
  email: string
  telefono: string
  fechaNacimiento: string
}

// DTO para registrar un paciente.
// Omit excluye el identificador porque lo genera el backend.
export type CrearPacienteDTO = Omit<PacienteAPI, 'id'>

// DTO para actualizar solamente los campos necesarios.
export type ActualizarPacienteDTO = Partial<
  Omit<PacienteAPI, 'id'>
>

// POST /pacientes
export async function crearPaciente(
  datos: CrearPacienteDTO,
): Promise<PacienteAPI> {
  const respuesta = await api.post<PacienteAPI>(
    '/pacientes',
    datos,
  )

  return respuesta.data
}

// PUT /pacientes/:id
export async function actualizarPaciente(
  id: number,
  datos: ActualizarPacienteDTO,
): Promise<PacienteAPI> {
  const respuesta = await api.put<PacienteAPI>(
    `/pacientes/${id}`,
    datos,
  )

  return respuesta.data
}

// DELETE /pacientes/:id
export async function eliminarPaciente(id: number): Promise<void> {
  await api.delete(`/pacientes/${id}`)
}

// GET /pacientes
export async function obtenerPacientes(): Promise<PacienteAPI[]> {
  const respuesta = await api.get<PacienteAPI[]>('/pacientes')

  return respuesta.data
}

// Adaptar la respuesta de la API al modelo utilizado por la interfaz.
export function adaptarPaciente(paciente: PacienteAPI): Paciente {
  return {
    id: String(paciente.id),
    nombre: paciente.nombre,
    apellido: paciente.apellidos,
    email: paciente.email,
    telefono: paciente.telefono,
    especialidadAsignada: 'No disponible',
    ultimaCita: 'No disponible',
    estado: 'activo',
  }
}
