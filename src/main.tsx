import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './assets/css/index.css'
import ProductInfo from './components/ProductInfo'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ShoppingCart from './components/ShoppingCart'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/product/:productID' element={<ProductInfo />} />
      <Route path='cart' element={<ShoppingCart />}></Route>
    </Routes>
    </BrowserRouter>

  </StrictMode>,
)
