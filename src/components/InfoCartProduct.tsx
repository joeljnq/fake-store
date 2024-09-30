import React, { useEffect, useState } from "react"
import gargabe from '../assets/images/garbage.svg'
import { cartProductSchema } from "../interfaces"
import '../assets/css/infoCartProduct.css'
interface infoCartProductProps {
    product: cartProductSchema
    onChangeProducts: (product: cartProductSchema[]) => void
    idx: number
}
const updateCart = (updatedProducts: cartProductSchema[], onChangeProducts: (product:cartProductSchema[])=>void) => {
    localStorage.setItem('cart', JSON.stringify(updatedProducts));
    onChangeProducts(updatedProducts);
};

const InfoCartProduct: React.FC<infoCartProductProps> = ({ product, idx , onChangeProducts}) => {
    const cartProducts:cartProductSchema[] = JSON.parse(localStorage.getItem('cart') || '[]')
    
    const [productQuantity, setProductQuantity] = useState<number>(product.quantity)
    useEffect(() => {
        cartProducts[idx] = { ...product, quantity: productQuantity }
        updateCart(cartProducts,onChangeProducts)
    }, [productQuantity,idx,onChangeProducts])
    
    const handleLessProducts =() => {
        setProductQuantity(prevQuantity => Math.max( prevQuantity - 1,1));
    }
    const handleMoreProducts = () =>{
        setProductQuantity(prevState=> prevState + 1)
    }

    const handleRemoveProduct = () => {
        cartProducts.splice(idx,1)
        updateCart(cartProducts,onChangeProducts)
    } 



    return (
        <div className="infoProduct-wrapper">
            <img src={product.image} alt="product" />
            <div className="product">
                <p>{product.title}</p>
                <p>{product.category}</p>
            </div>
            <button className="garbageButton-cart" onClick={handleRemoveProduct}><img src={gargabe} alt="gargabe" className="garbage-cart"></img></button>
            <div className="products-quantity">
                <button onClick={handleLessProducts}>-</button>
                <p>{productQuantity}</p>
                <button onClick={handleMoreProducts}>+</button>
            </div>
            <p className="price-average">{Math.round((product.price * product.quantity) * 100) / 100}€</p>
        </div>
    )
}

export default InfoCartProduct