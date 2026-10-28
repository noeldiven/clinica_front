
import api from '../lib/axios'

export type EstadoCita =
  | 'PROGRAMADA'
  | 'COMPLETADA'
  | 'CANCELADA'

export interface CitaAPI {
  id: number
  pacienteId: number
  medicoId: number
  fechaHora: string
  motivoConsulta: string | null
  diagnostico: string | null
  estado: EstadoCita
  paciente: {
    id: number
    nombre: string
    apellidos: string
  }
  medico: {
    id: number
    nombre: string
    apellidos: string
  }
}

export async function obtenerCitas(): Promise<CitaAPI[]> {
  const respuesta = await api.get<CitaAPI[]>('/citas')
  return respuesta.data
}

export async function actualizarEstadoCita(
  id: number,
  estado: EstadoCita,
): Promise<CitaAPI> {
  const respuesta = await api.patch<CitaAPI>(
    `/citas/${id}/estado`,
    { estado },
  )

  return respuesta.data
}


export interface CrearCitaDTO {
  pacienteId: number
  medicoId: number
  fechaHora: string
  motivoConsulta?: string
  diagnostico?: string
}

export async function crearCita(
  datos: CrearCitaDTO,
): Promise<CitaAPI> {
  const respuesta = await api.post<CitaAPI>('/citas', datos)
  return respuesta.data
}
