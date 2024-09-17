import '../assets/css/shoppingCart.css'
import InfoCartProduct from "./InfoCartProduct"
import React, { useEffect, useState } from "react"
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
  title: string,
  quantity: number
}
const ShoppingCart: React.FC = () => {
    const [products,setProducts] = useState<productSchema[]>(JSON.parse(localStorage.getItem('cart') || '[]')) 
    const [subtotal, setSubtotal] = useState<number>(0)

    useEffect(()=>{
        let sum = 0
        products.forEach(product => {
            const quantity =  product.price * product.quantity
            sum += quantity
        })
        setSubtotal(Math.round(sum * 100) / 100)
    },[products])

    const handleCheckoutButton = () => {
        const url = `${window.location.origin}/checkout`;
        window.open(url, '_blank',);
    }

    const handleToOrigin = () => {
        const url = `${window.location.origin}`;
        window.open(url, '_self');
    }

    return (
        <>
            <header>
                <h1 onClick={()=>{handleToOrigin()}} className='sc-title'>FakeStore</h1>
            </header>
            <main className='main-cart'>

                <div className="cartProduct-wrapper">
                    {products.length > 0 ? products.map((product, index) => {
                        return (
                            <InfoCartProduct product={product} idx={index} onChangeProducts={setProducts} key={index} />
                        )
                    }): <p>There is no product in your cart</p>}
                </div>
                <div className='totalPrice-wrapper'>
                    <p>Sumarry of the products</p>

                    <p>subtotal: {subtotal}€</p>
                    <p>-----------------</p>
                    <p>Estimated total {subtotal}€</p>
                <button id="seeCart-button" className="custom-btn btn-2" onClick={ handleCheckoutButton}>buy</button>

                </div>
            </main>
        </>


    )
}

export default ShoppingCart