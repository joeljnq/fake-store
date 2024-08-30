import { productSchema } from "../interfaces"
import '../assets/css/SideBar.css'
import garbage from '../assets/images/garbage.svg'
import { useEffect, useState } from "react"

interface SideBarProps {
    products: cartProductSchema[]
    onCloseSideBar: (status: boolean) => void,
    onChangeCartProducts: (product: cartProductSchema[]) => void
}

interface cartProductSchema extends productSchema {
    quantity: number
  }
  
const handleCartButton = () => {
    const url = `${window.location.origin}/cart`;
    window.open(url, '_blank',);
}
const SideBar: React.FC<SideBarProps> = ({ products, onCloseSideBar, onChangeCartProducts }) => {
    console.log(products);
    
    const [total, setTotal] = useState<number>(0)
    useEffect(()=>{
        let sum = 0
        products.forEach(product => {
            const totalProduct = product.price * product.quantity
            sum += totalProduct
        })
        setTotal(Math.round(sum * 100) / 100)
    },[products])
    return (
        <div id="overlay" onClick={() => onCloseSideBar(false)}>
            <aside className="aside-cart" onClick={(e) => e.stopPropagation()}>
                <h2>My cart</h2>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-wrapperSB">
                            <img src={product.image} alt="product" className="product-image" />
                            <div className="info-wrapper">
                                <p>{product.title}</p>
                                <p className="pricing">{product.price}€</p>
                                <p>Quantity: {product.quantity}</p>
                            </div>
                            <button onClick={() => onChangeCartProducts(products.filter((pdc) => pdc.id !== product.id))}>
                                <img src={garbage} alt="delete" className="garbage" />
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty</p>
                )}
                <div className="total-wrapper">
                    <p>Total: {Math.round(total * 100) / 100}€</p>
                    {products.length > 0 && 
                        <button className="custom-btn btn-2" onClick={handleCartButton}>Go to cart</button>}
                </div>
            </aside>
        </div>

    )
}

export default SideBar