import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Route guard: decide si muestra la página (children) o redirige.
// El frontend es solo una mejora de experiencia: la seguridad real la hace el backend.
function ProtectedRoute({ children, role }) {
  const { user } = useAuth() // sesión leída de localStorage

  // 1. Sin sesión: al login
  if (!user) return <Navigate to="/login" replace />

  // 2. Con sesión pero sin el rol requerido: al inicio
  if (role && user.role !== role) return <Navigate to="/" replace />

  // 3. Todo bien: se muestra la página
  return children
}

export default ProtectedRoute
