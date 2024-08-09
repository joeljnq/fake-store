import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products,setProducts] = useState([])
  const apiURL = import.meta.env.VITE_API_URL
  useEffect(()=>{
    fetch(apiURL)
    .then(res => res.json())
    .then(res => setProducts(res))
  }, [apiURL])
  console.log(products) 
  return (
    <>
      
    </>
  )
}

export default App
