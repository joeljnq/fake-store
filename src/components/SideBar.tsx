import { productSchema } from "../interfaces"
import '../assets/css/SideBar.css'
import garbage from '../assets/images/garbage.svg'

interface SideBarProps {
    products: productSchema[]
    onCloseSideBar: (status: boolean) => void,
    onChangeCartProducts : (product: productSchema[]) => void
}

const SideBar: React.FC<SideBarProps> = ({ products, onCloseSideBar, onChangeCartProducts }) => {
    
    return (
        <div id="overlay" onClick={()=>onCloseSideBar(false)}>
            <aside className="aside-cart" onClick={(e)=> e.stopPropagation()}>
                <h2>My cart</h2>
                {products.map(product => {
                    return (
                        <div key={product.id} className="product-wrapperSB">
                            <img src={product.image} alt="product" className="product-image" />
                            <div className="info-wrapper">
                                <p>{product.title}</p>
                                <p className="pricing">{product.price}€</p>
                            </div>
                            <button onClick={()=>onChangeCartProducts(products.filter(pdc => pdc.id !== product.id ))}><img src={garbage} alt="delete" className="garbage" /></button>
                        </div>
                    )
                })}
            </aside>
        </div>

    )
}

export default SideBar