import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './assets/css/index.css'
import ProductInfo from './components/ProductInfo'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShoppingCart from './components/ShoppingCart'
import CheckOut from './components/CheckOut'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/product/:productID' element={<ProductInfo />} />
      <Route path='cart' element={<ShoppingCart />}></Route>
      <Route path='checkout' element={<CheckOut />}></Route>

    </Routes>
    </BrowserRouter>

  </StrictMode>,
)
