import { createContext, useContext, useState } from 'react'
import { getStoredUser } from '../utils/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Al abrir la app recuperamos la sesión guardada en localStorage
  const [user, setUser] = useState(() => getStoredUser())

  // Guarda el token y el usuario que devolvió el backend
  const login = ({ token, user }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setUser(getStoredUser())
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
