
import { useEffect, useState } from 'react'

export interface Medico {
  id: string
  nombre: string
  especialidad: string
}

const medicosSimulados: Medico[] = [
  {
    id: 'med-001',
    nombre: 'Dra. Ana Torres',
    especialidad: 'Medicina general',
  },
  {
    id: 'med-002',
    nombre: 'Dr. Carlos Mendoza',
    especialidad: 'Cardiología',
  },
  {
    id: 'med-003',
    nombre: 'Dra. Lucía Fernández',
    especialidad: 'Pediatría',
  },
  {
    id: 'med-004',
    nombre: 'Dr. Javier Ramírez',
    especialidad: 'Traumatología',
  },
]

export default function useMedicos() {
  const [medicos, setMedicos] = useState<Medico[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMedicos(medicosSimulados)
      setCargando(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return { medicos, cargando }
}
