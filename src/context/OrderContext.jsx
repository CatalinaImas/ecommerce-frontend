import { createContext, useContext, useState } from 'react'
import api from '../services/http'

const OrderContext = createContext()

const round = (n) => Math.round(n * 100) / 100

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]) // productos en el carrito
  const [count, setCount] = useState(0) // cantidad total de ítems
  const [total, setTotal] = useState(0) // sumatoria de precio * quantity

  // Agrega un producto al carrito.
  // Si ya existe, incrementa su quantity. Si no, lo agrega con quantity: 1.
  const addItemToCart = (product) => {
    setOrder((current) => {
      const exists = current.find((item) => item._id === product._id)
      if (exists) {
        return current.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
    setCount((current) => current + 1)
    setTotal((current) => round(current + Number(product.price)))
  }

  // Quita un producto completo del carrito (todas sus unidades)
  const removeItemFromCart = (productId) => {
    const remaining = order.filter((item) => item._id !== productId)
    setOrder(remaining)
    setCount(remaining.reduce((sum, item) => sum + item.quantity, 0))
    setTotal(round(remaining.reduce((sum, item) => sum + item.price * item.quantity, 0)))
  }

  // Resetea order, count y total a sus valores iniciales
  const clearCart = () => {
    setOrder([])
    setCount(0)
    setTotal(0)
  }

  // Envía la orden al backend (con el token) y luego limpia el carrito.
  // Devuelve la orden creada.
  const createOrder = async () => {
    const orderData = {
      items: order.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
    }

    const { data } = await api.post('/orders', orderData)
    clearCart()
    return data
  }

  // Crea la preferencia de pago en MercadoPago y redirige al usuario a su página de pago.
  // Recibe los items porque createOrder ya vació el carrito.
  const checkout = async (items, orderId) => {
    // Formato que espera MercadoPago
    const mpItems = items.map((item) => ({
      id: item._id,
      title: item.name,
      quantity: item.quantity,
      unit_price: Number(item.price),
      currency_id: 'ARS',
    }))

    const { data } = await api.post('/payments/create-preference', { items: mpItems, orderId })
    window.location.href = data.init_point
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        count,
        total,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        createOrder,
        checkout,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => useContext(OrderContext)
