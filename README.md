# Urban Plant Cookies — E-commerce (Entrega final)

E-commerce de cookies plant-based con estética New York style. En esta entrega final el frontend en **React** se conecta a un **backend propio** (Express + MongoDB), con **login real con JWT**, **carrito de compras**, **subida de imágenes a Cloudinary** y pagos con **MercadoPago**.

## Links

| | |
| --- | --- |
| 🌐 Sitio en producción | https://ecommerce-frontend-4u4q.onrender.com |
| ⚙️ API en producción | https://ecommerce-backend-eoq6.onrender.com |
| 📦 Repositorio del frontend | https://github.com/CatalinaImas/ecommerce-frontend |
| 📦 Repositorio del backend | https://github.com/CatalinaImas/ecommerce-backend |

> El backend está en el plan gratuito de Render: si estuvo inactivo, la primera carga puede tardar hasta un minuto.

## Usuarios de prueba

| Rol | Email | Contraseña |
| --- | --- | --- |
| Admin | admin@admin.com | 1234 |
| Cliente | cliente@cliente.com | 1234 |

## Funcionalidades

- Home, listado de productos con filtros (las categorías vienen de la base de datos) y detalle de producto
- Carrito de compras global (`OrderContext`): agregar, quitar, vaciar, total y badge en el navbar
- Finalizar compra: guarda la orden y redirige a MercadoPago (Checkout Pro)
- Páginas de retorno de pago: `/payment/success`, `/payment/failure` y `/payment/pending`
- Registro y login con JWT (token y usuario en `localStorage`)
- Navbar dinámico según sesión y rol (Login / usuario + Logout / links de admin)
- Rutas de administración protegidas con `ProtectedRoute` (solo rol admin)
- Admin de productos (con subida de imagen a Cloudinary) y admin de usuarios
- Diseño responsive

## Tecnologías

React (Vite) · React Router v6 · Context API · Axios · React Hook Form · SweetAlert2 · Font Awesome · CSS propio

## Cómo correr el proyecto en local

Requisitos: [Node.js](https://nodejs.org) 18 o superior y el [backend](https://github.com/CatalinaImas/ecommerce-backend) corriendo.

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

## Probar el pago con MercadoPago

El pago usa el entorno de **pruebas** de MercadoPago: no se realizan cobros reales. Para completarlo hay que usar una cuenta de comprador de prueba y una tarjeta de prueba (ver la documentación de MercadoPago).

## Deploy

- **Frontend:** Static Site en Render (`npm run build`, directorio `dist`), con la variable `VITE_BACKEND_URL` apuntando al backend y una regla de *Rewrite* `/*` → `/index.html` para que funcione React Router.
- **Backend:** Web Service en Render.

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