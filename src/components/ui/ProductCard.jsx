import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useOrder } from '../../context/OrderContext'
import './ProductCard.css'

// Recibe un producto por "props" y lo dibuja como tarjeta.
function ProductCard({ product }) {
  const { _id, name, category, price, image } = product
  const { addItemToCart } = useOrder()

  const handleBuy = () => {
    addItemToCart(product)
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Agregado al carrito',
      showConfirmButton: false,
      timer: 1400,
    })
  }

  return (
    <article className="product-card">
      <img src={image} alt={name} loading="lazy" />
      <h3>{name}</h3>
      <p className="product-card__category">{category?.name}</p>
      <p className="product-card__price">${Number(price).toFixed(2)}</p>

      <div className="product-card__buttons">
        <button className="btn-primary" onClick={handleBuy}>
          Comprar
        </button>
        <Link to={`/products/${_id}`} className="btn-secondary">
          Ver más
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
