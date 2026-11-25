import { Link } from 'react-router-dom'
import '../styles/payment.css'

function PaymentPending() {
  return (
    <main className="page payment-page payment-page--pending">
      <div className="payment-icon" aria-hidden="true">⏳</div>
      <h1>Pago pendiente</h1>
      <p>Tu pago está pendiente de acreditación. Te avisaremos cuando se confirme.</p>
      <Link to="/" className="btn-primary">Volver al inicio</Link>
    </main>
  )
}

export default PaymentPending
