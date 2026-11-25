import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { loginUser } from '../services/users.service'
import { getErrorMessage } from '../services/http'
import { useAuth } from '../context/AuthContext'
import '../styles/forms.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '' } })

  const { login } = useAuth()
  const navigate = useNavigate()

  // Pide el token al backend, guarda la sesión y redirige al inicio
  const onSubmit = async (formData) => {
    try {
      const data = await loginUser(formData) // { token, user }
      login(data)
      await Swal.fire({
        icon: 'success',
        title: `¡Hola, ${data.user.name.split(' ')[0]}!`,
        timer: 1200,
        showConfirmButton: false,
      })
      navigate('/')
    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: 'error',
        title: 'No pudimos iniciar sesión',
        text: getErrorMessage(err, 'No pudimos conectar con el servidor.'),
        confirmButtonColor: '#DD2D4A',
      })
    }
  }

  return (
    <main className="page form-page">
      <h1>Iniciar sesión</h1>
      <div className="form-card">
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            className={errors.email ? 'input-error' : ''}
            {...register('email', {
              required: 'El email es obligatorio',
              maxLength: { value: 60, message: 'El email no puede superar los 60 caracteres' },
              pattern: { value: EMAIL_REGEX, message: 'Ingresá un email válido' },
            })}
          />
          {errors.email && <span className="form-error">{errors.email.message}</span>}

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className={errors.password ? 'input-error' : ''}
            {...register('password', {
              required: 'La contraseña es obligatoria',
            })}
          />
          {errors.password && <span className="form-error">{errors.password.message}</span>}

          <div className="form-actions">
            <button type="submit" className="btn-primary btn-lg" disabled={isSubmitting}>
              {isSubmitting ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Login
