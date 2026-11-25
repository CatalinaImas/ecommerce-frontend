import { Link } from 'react-router-dom'
import '../styles/payment.css'

function PaymentSuccess() {
  return (
    <main className="page payment-page payment-page--success">
      <div className="payment-icon" aria-hidden="true">✅</div>
      <h1>¡Pago aprobado!</h1>
      <p>Gracias por tu compra. Recibimos tu pago y ya estamos preparando tus cookies.</p>
      <Link to="/products" className="btn-primary">Seguir comprando</Link>
    </main>
  )
}

export default PaymentSuccess
