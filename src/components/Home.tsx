import { useEffect, useState } from 'react'
import '../assets/css/App.css'
import imageMain from '../assets/images/img-main1.webp'
import Product from './Product'
import { getProducts } from '../services/products'
import { productSchema, cartProductSchema } from '../interfaces'
import { Link } from 'react-router-dom'

interface homeProps{
  cartProducts: cartProductSchema[],
  onChangeCartProducts: (product: cartProductSchema[]) => void
}
const  Home : React.FC <homeProps>= ({ cartProducts, onChangeCartProducts }) => {
  const [products, setProducts] = useState<productSchema[]>([])
  const apiURL = import.meta.env.VITE_API_URL
  useEffect(() => {
   const allProducts = getProducts()
   allProducts.then(products => setProducts(products))
  }, [apiURL])


  return (
    <div id='main'>
      <div className='imgMain-wrapper'>
        <div id='newTrend-wrapper'>
          <p id='newTrend'>NEW IN</p>
          <p id='sale-newTrend'>SPRING/SUMMER</p>
          <Link to='/product/2' className="cta">
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
          </Link>
        </div>
        <img src={imageMain} alt='main' id='imgMain' />
      </div>
      <main className='app'>
        {products.map((product) => {
          return (
            <Product key={product.id} product={product} cartProducts={cartProducts} onChangeCartProducts={onChangeCartProducts} />
          )
        })}
      </main>

    </div>
  )
}

export default Home