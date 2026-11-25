import axios from 'axios'
import { BACKEND_URL } from './config'

// Instancia de axios apuntando a nuestra API
const api = axios.create({ baseURL: `${BACKEND_URL}/api` })

// Antes de cada petición agregamos el token (si hay sesión) en el header Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api

// Devuelve el mensaje de error que mandó el backend (o uno por defecto)
export const getErrorMessage = (err, fallback = 'Hubo un problema. Intentá de nuevo.') =>
  err.response?.data?.message ?? fallback
