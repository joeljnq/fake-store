import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './assets/css/index.css'
import ProductInfo from './components/ProductInfo'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/product/:productID' element={<ProductInfo />} />
    </Routes>
    </BrowserRouter>

  </StrictMode>,
)
