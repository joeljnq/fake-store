import { useEffect, useState } from 'react'
import '../assets/css/App.css'
import { Link } from 'react-router-dom'
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

function App() {
  const [products, setProducts] = useState<productSchema[]>([])
  const apiURL = import.meta.env.VITE_API_URL
  useEffect(() => {
    fetch(apiURL)
      .then(res => res.json())
      .then(res => setProducts(res))
  }, [apiURL])

  const handleProductInfo = (productID: number) => {
    const url = `${window.location.origin}/product/${productID}`;
    window.open(url, '_blank',);
  }
  return (
    <>
      <main className='app'>
        {products.map((product) => {
          return (
            <div key={product.id} className='product-wrapper'>
              <button onClick={()=> handleProductInfo(product.id)} className='button-image'><img src={product.image} alt={product.title} className='product-img' /></button>
              <p>{product.title}</p>
              <p>{product.category}</p>
              <p>{product.price}</p>
              <button>add to cart</button>
            </div>
            
          )
        })}
      </main>
    </>
  )
}

export default App
