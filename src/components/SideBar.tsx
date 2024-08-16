import { productSchema } from "../interfaces"
import '../assets/css/SideBar.css'
import garbage from '../assets/images/garbage.svg'

interface SideBarProps {
    products: productSchema[]
    onCloseSideBar: (status: boolean) => void,
    onChangeCartProducts: (product: productSchema[]) => void
}
const handleCartButton = () => {
    const url = `${window.location.origin}/cart`;
    window.open(url, '_blank',);
}
const SideBar: React.FC<SideBarProps> = ({ products, onCloseSideBar, onChangeCartProducts }) => {

    return (
        <div id="overlay" onClick={() => onCloseSideBar(false)}>
            <aside className="aside-cart" onClick={(e) => e.stopPropagation()}>
                <h2>My cart</h2>
                {products.map((product, index) => {
                    return (

                        <div key={index} className="product-wrapperSB">
                            <img src={product.image} alt="product" className="product-image" />
                            <div className="info-wrapper">
                                <p>{product.title}</p>
                                <p className="pricing">{product.price}€</p>
                            </div>
                            <button onClick={() => onChangeCartProducts(products.filter((pdc, idx) => idx !== index))}><img src={garbage} alt="delete" className="garbage" /></button>
                        </div>
                    )

                })}
                <button id="seeCart-button" className="custom-btn btn-2" onClick={() => handleCartButton()}>see all of products in the cart</button>
            </aside>
        </div>

    )
}

export default SideBar