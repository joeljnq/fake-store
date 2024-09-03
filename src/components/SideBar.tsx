import { productSchema } from "../interfaces"
import '../assets/css/SideBar.css'
import garbage from '../assets/images/garbage.svg'
import { useEffect, useState } from "react"
import leave from '../assets/images/right-arrow.svg'


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
    useEffect(() => {
        let sum = 0
        products.forEach(product => {
            const totalProduct = product.price * product.quantity
            sum += totalProduct
        })
        setTotal(Math.round(sum * 100) / 100)
    }, [products])
    return (

        <aside className="aside-cart" onClick={(e) => e.stopPropagation()}>
            <div id="header-sideBar">
                <h2>My cart</h2>
                <img src={leave} alt="leave" className="leave" onClick={() => onCloseSideBar(false)} />
            </div>
            <div className="cart-sideBar">               {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id} className="product-wrapperSB">
                        <div className="infoSB-wrapper">
                            <img src={product.image} alt="product" className="product-image" />
                            <div className="pricing-wrapper">
                                <p>{product.title}</p>
                                <p className="pricing">{product.price}€</p>
                                <p>Quantity: {product.quantity}</p>
                            </div>
                        </div>

                        <img onClick={() => onChangeCartProducts(products.filter((pdc) => pdc.id !== product.id))} src={garbage} alt="delete" className="garbage" />

                    </div>
                ))
            ) : (
                <p>Your cart is empty</p>
            )}
            </div>

            <div className="total-wrapper">
                <p>Total: {Math.round(total * 100) / 100}€</p>
                {products.length > 0 &&
                    <button className="custom-btn btn-2" onClick={handleCartButton}>Go to cart</button>}
            </div>
        </aside>

    )
}

export default SideBar