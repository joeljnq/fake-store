import { useEffect, useState } from 'react'
import '../assets/css/App.css'
import NavBar from './NavBar'
import SideBar from './SideBar'
import Product from './Product'
interface productSchema {
  category: string,
  description: string,
  id: number,
  image: string,
  price: number,
  rating: {
    count: number,
    rate: number
  },
  title: string
}

interface cartProductSchema extends productSchema {
  quantity: number
}


function App() {
  const [products, setProducts] = useState<productSchema[]>([])
  const [openSideBar, setOpenSideBar] = useState<boolean>(false)
  const [cartProducts, setCartProducts] = useState<cartProductSchema[]>(JSON.parse(localStorage.getItem('cart') || '[]'))
  const apiURL = import.meta.env.VITE_API_URL
  useEffect(() => {
    fetch(apiURL)
      .then(res => res.json())
      .then(res => setProducts(res))
  }, [apiURL])
  useEffect(() => {


    localStorage.setItem('cart', JSON.stringify(cartProducts))
  }, [cartProducts])

  
  return (
    <>
      <NavBar onHandleSideBar={setOpenSideBar} quantityProducts={cartProducts.length}  />
      <div className='imgMain-wrapper'>
        <img src='./src/assets/images/img-main.png' alt='imgMain' className='img-main'></img>
        <div>
        <p>New Trend</p>
        <p>FOOTBALL SALE</p>
        <p>WOMENS</p>
        </div>
      </div>
      <main className='app'>
        {products.map((product) => {
          return (
            <Product key={product.id} product={product} cartProducts={cartProducts} onChangeCartProducts={setCartProducts} />
          )
        })}
      </main>
      {openSideBar && <SideBar products={cartProducts} onCloseSideBar={setOpenSideBar} onChangeCartProducts={setCartProducts} />}

    </>
  )
}

export default App
