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
    <div id='main'>
      <NavBar onHandleSideBar={setOpenSideBar} quantityProducts={cartProducts.length} isMainPage={true} />
      <div className='imgMain-wrapper'>
        <div id='newTrend-wrapper'>
          <p id='newTrend'>NEW IN</p>
          <p id='sale-newTrend'>SPRING/SUMMER</p>
          <button className="cta">
            <span className="hover-underline-animation"> Shop now </span>
            <svg
              id="arrow-horizontal"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="10"
              viewBox="0 0 46 16"
            >
              <path
                id="Path_10"
                data-name="Path 10"
                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                transform="translate(30)"
              ></path>
            </svg>
          </button>
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

    </div>
  )
}

export default App
