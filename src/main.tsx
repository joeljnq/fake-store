import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import AppRouter from './router/Router'
export const ROUTES = {
  HOME: '/',
  PRODUCT: '/product/:productID',
  CART: '/cart',
  CHECKOUT: '/checkout'
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
 <AppRouter />
  </StrictMode>,
)
