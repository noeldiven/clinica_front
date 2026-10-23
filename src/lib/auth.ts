
import api from './axios'

interface RespuestaLogin {
  token: string
}

interface Credenciales {
  email: string
  password: string
}

export async function iniciarSesion(
  credenciales: Credenciales,
): Promise<void> {
  const respuesta = await api.post<RespuestaLogin>(
    '/auth/login',
    credenciales,
  )

  const token = respuesta.data.token

  if (!token) {
    throw new Error('El servidor no devolvió un token JWT.')
  }

  localStorage.setItem('token', token)
}

export function cerrarSesion(): void {
  localStorage.removeItem('token')
}
