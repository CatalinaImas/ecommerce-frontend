# Urban Plant Cookies — E-commerce (Entrega final)

E-commerce de cookies plant-based con estética New York style. En esta entrega final el frontend en **React** se conecta a un **backend propio** (Express + MongoDB), con **login real con JWT**, **carrito de compras** y pagos con **MercadoPago**.

Backend: [ecommerce-backend](https://github.com/CatalinaImas/ecommerce-backend)

## Funcionalidades

- Home, listado de productos con filtros (categorías desde la base de datos) y detalle de producto
- Carrito de compras global (`OrderContext`): agregar, quitar, vaciar, total y badge en el navbar
- Finalizar compra: guarda la orden y redirige a MercadoPago (Checkout Pro)
- Páginas de retorno de pago: `/payment/success`, `/payment/failure`, `/payment/pending`
- Registro y login con JWT (token y usuario en `localStorage`)
- Navbar dinámico según sesión y rol (Login / usuario + Logout / links de admin)
- Rutas de administración protegidas con `ProtectedRoute` (solo rol admin)
- Admin de productos (con subida de imagen a Cloudinary) y admin de usuarios
- Diseño responsive

## Tecnologías

React (Vite) · React Router v6 · Context API · Axios · React Hook Form · SweetAlert2 · Font Awesome · CSS propio

## Cómo abrir el proyecto

Requisito: [Node.js](https://nodejs.org) 18 o superior y el backend corriendo.

```bash
git clone https://github.com/CatalinaImas/ecommerce-frontend
cd ecommerce-frontend
npm install
```

Crear un archivo `.env` (hay un `.env.example`) con la URL del backend:

```
VITE_BACKEND_URL=http://localhost:3000
```

Iniciar el servidor de desarrollo y abrir `http://localhost:5173`:

```bash
npm run dev
```

## Usuarios de prueba

| Rol | Email | Contraseña |
| --- | --- | --- |
| Admin | admin@admin.com | 1234 |
| Cliente | cliente@cliente.com | 1234 |

## Estructura

```
src/
├── components/   layout (Navbar, Footer), ui, products, users, ProtectedRoute
├── context/      AuthContext (sesión), OrderContext (carrito y pagos)
├── pages/        una por cada ruta (incluye Cart y PaymentSuccess/Failure/Pending)
├── services/     llamadas al backend con axios
├── constants/    provincias
├── styles/       CSS por página
└── utils/        funciones auxiliares
```

## Autora

Catalina Imas — [GitHub](https://github.com/CatalinaImas)
