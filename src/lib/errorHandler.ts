import axios from 'axios'

export function extraerMensajeError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const detalle = err.response?.data?.detail

    if (typeof detalle === 'string') {
      return detalle
    }

    if (Array.isArray(detalle)) {
      return detalle
        .map((item: { msg?: string }) => item.msg ?? 'Error de validación')
        .join(', ')
    }

    if (err.response?.status === 404) {
      return 'El recurso solicitado no existe.'
    }

    if (err.response?.status === 500) {
      return 'Ocurrió un error interno del servidor.'
    }

    if (!err.response) {
      return 'No se pudo conectar con el servidor. Verifica tu conexión.'
    }

    return err.message || 'Error al comunicarse con el servidor.'
  }

  if (err instanceof Error) {
    return err.message
  }

  return 'Error inesperado'
}