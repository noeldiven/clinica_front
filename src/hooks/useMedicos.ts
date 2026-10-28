
import { useEffect, useState } from 'react'
import api from '../lib/axios'

interface EspecialidadAPI {
  id: number
  nombre: string
}

export interface Medico {
  id: number
  nombre: string
  apellidos: string
  especialidad: EspecialidadAPI | null
}

export default function useMedicos() {
  const [medicos, setMedicos] = useState<Medico[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let activo = true

    async function cargarMedicos() {
      try {
        setCargando(true)
        setError('')

        const respuesta = await api.get<Medico[]>('/medicos')

        if (activo) {
          setMedicos(respuesta.data)
        }
      } catch (err: unknown) {
        if (activo) {
          setError(
            err instanceof Error
              ? err.message
              : 'No se pudieron cargar los médicos.',
          )
        }
      } finally {
        if (activo) {
          setCargando(false)
        }
      }
    }

    void cargarMedicos()

    return () => {
      activo = false
    }
  }, [])

  return { medicos, cargando, error }
}
