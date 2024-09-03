import React, { useState } from "react";
import { productSchema } from "../interfaces";
import add from '../assets/images/add.svg'
import '../assets/css/product.css'

interface ProductProps {
    product: productSchema
    cartProducts: cartProductSchema[]
    onChangeCartProducts: (cartProducts: cartProductSchema[]) => void
}

interface cartProductSchema extends productSchema {
    quantity: number
}

const Product: React.FC<ProductProps> = ({ product, cartProducts, onChangeCartProducts }) => {
    const handleProductInfo = (productID: number) => {
        const url = `${window.location.origin}/product/${productID}`;
        window.open(url, '_blank',);
    }
    const [isHovered, setIsHovered] = useState<boolean>(false)

    const handleAddProduct = (product: productSchema) => {
        const productIndex = cartProducts.findIndex(cartProduct => cartProduct.id === product.id)

        if (productIndex !== -1) {

            const updatedCartProducts = cartProducts.map(cartProduct => {
                if (cartProduct.id === product.id) {
                    return { ...cartProduct, quantity: cartProduct.quantity + 1 }
                } else {
                    return cartProduct
                }
            })
            onChangeCartProducts(updatedCartProducts)
        } else {
            onChangeCartProducts([...cartProducts, { ...product, quantity: 1 }])
        }
    }
    return (
        <div key={product.id} className='product-wrapper'>
            <div className='image-wrapper' onPointerEnter={()=>setIsHovered(true) } onPointerLeave={()=>setIsHovered(false)}>
               {isHovered && <img onClick={() => handleAddProduct(product)} src={add} className='add-image'></img>}
                <img  onClick={() => handleProductInfo(product.id)} src={product.image} alt={product.title} className='product-img' />
            </div>
            <p className='product-category'>{product.category}</p>
            <p>{product.title}</p>
            <p>{product.price}€</p>

        </div>
    );
}

export default Product;