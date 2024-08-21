import { useEffect, useState } from 'react'
import '../assets/css/App.css'
import NavBar from './NavBar'
import SideBar from './SideBar'
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
  const [categories, setCategories] = useState<string[]>([])
  const [openSideBar, setOpenSideBar] = useState<boolean>(false)
  const [cartProducts, setCartProducts] = useState<productSchema[]>(JSON.parse(localStorage.getItem('cart') || '[]'))
  const apiURL = import.meta.env.VITE_API_URL
  useEffect(() => {
    fetch(apiURL)
      .then(res => res.json())
      .then(res => setProducts(res))
  }, [apiURL])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(res => setCategories(res))
  }, [])

  useEffect(()=>{
    const ls = cartProducts.map(cartProduct => {
      return {
        ...cartProduct,
        quantity: 1
      }
    })
    localStorage.setItem('cart', JSON.stringify(ls))
  },[cartProducts])

  const handleProductInfo = (productID: number) => {
    const url = `${window.location.origin}/product/${productID}`;
    window.open(url, '_blank',);
  }

  const handleAddProduct = (product: productSchema) => {
    setCartProducts(prevState => [...prevState, product])
  }
  return (
    <>
      <NavBar categories={categories} onHandleSideBar={setOpenSideBar} quantityProducts={cartProducts.length} />
      <main className='app'>
        {products.map((product) => {
          return (
            <div key={product.id} className='product-wrapper'>
              <button onClick={() => handleProductInfo(product.id)} className='button-image'><img src={product.image} alt={product.title} className='product-img' /></button>
              <p>{product.title}</p>
              <div className='price-wrapper'>
                <p>€{product.price}</p>
                <button onClick={() => handleAddProduct(product)} >add to cart</button>
              </div>
            </div>
          )
        })}
      </main>
      {openSideBar && <SideBar products={cartProducts} onCloseSideBar={setOpenSideBar} onChangeCartProducts={setCartProducts}/>}

    </>
  )
}

export default App
