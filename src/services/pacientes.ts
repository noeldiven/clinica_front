
import api from '../lib/axios'
import type { Paciente } from '../types/paciente'

export interface CrearPacienteDTO {
  nombre: string
  apellidos: string
  email: string
  telefono: string
  fechaNacimiento: string
}

export type ActualizarPacienteDTO = Partial<CrearPacienteDTO>

export interface PacienteAPI extends CrearPacienteDTO {
  id: number
}

export async function crearPaciente(
  datos: CrearPacienteDTO,
): Promise<PacienteAPI> {
  const respuesta = await api.post<PacienteAPI>('/pacientes', datos)
  return respuesta.data
}

export async function actualizarPaciente(
  id: number,
  datos: ActualizarPacienteDTO,
): Promise<PacienteAPI> {
  const respuesta = await api.put<PacienteAPI>(`/pacientes/${id}`, datos)
  return respuesta.data
}

export async function eliminarPaciente(id: number): Promise<void> {
  await api.delete(`/pacientes/${id}`)
}

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


export async function obtenerPacientes(): Promise<PacienteAPI[]> {
  const respuesta = await api.get<PacienteAPI[]>('/pacientes')
  return respuesta.data
}

