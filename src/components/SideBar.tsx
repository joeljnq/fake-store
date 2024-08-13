import { productSchema } from "../interfaces"
import '../assets/css/SideBar.css'
import garbage from '../assets/images/garbage.svg'

interface SideBarProps {
    products: productSchema[]
    onCloseSideBar: (status : boolean) => void
}

const SideBar: React.FC<SideBarProps> = ({ products, onCloseSideBar }) => {
    return(
        <aside className="aside-cart">
            <h2>My cart</h2>
            {products.map(product =>{
                return(
                    <div key={product.id} className="product-wrapperSB">
                        <img src={product.image} alt="product" className="product-image" />
                        <div className="info-wrapper">
                        <p>{product.title}</p>
                        <p className="pricing">{product.price}€</p>
                        </div>
                        <img src={garbage} alt="delete" className="garbage" />
                    </div>
                )
            })}
        </aside>
    )
}

export default SideBar