import { Link } from 'react-router-dom'
import '../styles/payment.css'

function PaymentFailure() {
  return (
    <main className="page payment-page payment-page--failure">
      <div className="payment-icon" aria-hidden="true">❌</div>
      <h1>El pago fue rechazado</h1>
      <p>No pudimos procesar el pago. Podés intentar de nuevo con otro medio de pago.</p>
      <Link to="/cart" className="btn-primary">Volver al carrito</Link>
    </main>
  )
}

export default PaymentFailure
