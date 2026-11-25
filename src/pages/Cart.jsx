import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useOrder } from '../context/OrderContext'
import { useAuth } from '../context/AuthContext'
import { getErrorMessage } from '../services/http'
import '../styles/cart.css'

const COLOR = '#DD2D4A'

function Cart() {
  const { order, count, total, removeItemFromCart, clearCart, createOrder, checkout } = useOrder()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [paying, setPaying] = useState(false)

  // Guarda la orden en el backend y manda al usuario a pagar con MercadoPago
  const handleCheckout = async () => {
    if (!user) {
      await Swal.fire({
        icon: 'info',
        title: 'Iniciá sesión para comprar',
        confirmButtonColor: COLOR,
      })
      navigate('/login')
      return
    }

    setPaying(true)
    try {
      const items = [...order] // copia: createOrder vacía el carrito
      const savedOrder = await createOrder()
      await checkout(items, savedOrder._id)
    } catch (err) {
      console.error(err)
      setPaying(false)
      Swal.fire({
        icon: 'error',
        title: 'No pudimos finalizar la compra',
        text: getErrorMessage(err),
        confirmButtonColor: COLOR,
      })
    }
  }

  const handleClear = async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Vaciar el carrito?',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: COLOR,
    })
    if (result.isConfirmed) clearCart()
  }

  if (order.length === 0) {
    return (
      <main className="page cart-page">
        <h1>Tu carrito</h1>
        <p className="empty-message">Todavía no agregaste cookies al carrito.</p>
        <p className="center">
          <Link to="/products" className="btn-primary">
            Ver productos
          </Link>
        </p>
      </main>
    )
  }

  return (
    <main className="page cart-page">
      <h1>Tu carrito</h1>

      <div className="cart-list">
        {order.map((item) => (
          <article className="cart-item" key={item._id}>
            <img src={item.image} alt={item.name} />

            <div className="cart-item__info">
              <h3>{item.name}</h3>
              <p>Precio: ${Number(item.price).toFixed(2)}</p>
              <p>Cantidad: {item.quantity}</p>
            </div>

            <p className="cart-item__subtotal">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <button
              className="btn-delete"
              onClick={() => removeItemFromCart(item._id)}
              aria-label={`Quitar ${item.name}`}
            >
              Quitar
            </button>
          </article>
        ))}
      </div>

      <section className="cart-summary">
        <p>
          Productos: <strong>{count}</strong>
        </p>
        <p className="cart-summary__total">Total: ${total.toFixed(2)}</p>

        <div className="cart-summary__buttons">
          <button className="btn-secondary-outline" onClick={handleClear} disabled={paying}>
            Vaciar carrito
          </button>
          <button className="btn-primary btn-lg" onClick={handleCheckout} disabled={paying}>
            {paying ? 'Redirigiendo...' : 'Finalizar compra'}
          </button>
        </div>
      </section>
    </main>
  )
}

export default Cart
