// Decodifica el payload de un token JWT (la parte del medio, en Base64).
// El payload lo firmó el backend, así que no se puede alterar sin invalidar el token.
export function decodeToken(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(decodeURIComponent(escape(atob(payload))))
  } catch {
    return null
  }
}

// Lee la sesión guardada en localStorage. Devuelve el usuario o null.
export function getStoredUser() {
  try {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))
    if (!token || !user) return null

    const payload = decodeToken(token)
    // Token ilegible o vencido: no hay sesión
    if (!payload || (payload.exp && payload.exp * 1000 < Date.now())) return null

    // El rol se toma del token (no del usuario guardado, que se puede editar a mano)
    return { ...user, role: payload.role }
  } catch {
    return null
  }
}
