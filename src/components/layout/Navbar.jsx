import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faCartShopping,
  faBars,
  faXmark,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../context/AuthContext'
import { useOrder } from '../../context/OrderContext'

function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const { count, clearCart } = useOrder()
  const navigate = useNavigate()

  const links = [
    { to: '/', label: 'Inicio', end: true },
    { to: '/products', label: 'Productos' },
    ...(!user ? [{ to: '/register', label: 'Registro' }] : []),
    { to: '/contact', label: 'Contacto' },
    { to: '/about', label: 'Acerca de nosotros' },
    // Links solo para el rol admin
    ...(user?.role === 'admin'
      ? [
          { to: '/admin/products', label: 'Admin productos' },
          { to: '/admin/users', label: 'Admin usuarios' },
        ]
      : []),
  ]

  const handleLogout = () => {
    logout()
    clearCart()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" onClick={() => setOpen(false)}>
          <img src="/assets/images/logo.png" alt="Urban Plant Cookies" className="logo" />
        </Link>

        <nav className={`nav-links ${open ? 'nav-links--open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-user">
          {user ? (
            <>
              <span className="profile-btn">
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="user" />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
                <span>{user.name?.split(' ')[0]}</span>
              </span>
              <button className="logout-btn" onClick={handleLogout} title="Cerrar sesión">
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="profile-btn">
              <FontAwesomeIcon icon={faUser} />
              <span>Login</span>
            </Link>
          )}

          <Link to="/cart" className="cart-btn" title="Carrito" aria-label="Carrito">
            <FontAwesomeIcon icon={faCartShopping} />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>

          <button
            className="nav-toggle"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
