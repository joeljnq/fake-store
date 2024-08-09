import { useEffect, useState } from 'react'
import '../assets/css/App.css'

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
  console.log(products)
  return (
    <>
      <main className='app'>
        {products.map((product) => {
          return (
            <div key={product.id} className='product-wrapper'>
              <img src={product.image} alt={product.title} className='product-img' />
            </div>
          )
        })}
      </main>
    </>
  )
}

export default App
