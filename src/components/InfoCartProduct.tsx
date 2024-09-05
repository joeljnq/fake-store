import React, { useEffect, useState } from "react"
import gargabe from '../assets/images/garbage.svg'
import '../assets/css/infoCartProduct.css'
interface infoCartProductProps {
    product: productSchema
    onChangeProducts: (product: productSchema[]) => void
    idx: number
}

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
const InfoCartProduct: React.FC<infoCartProductProps> = ({ product, idx , onChangeProducts}) => {
    
    const [productQuantity, setProductQuantity] = useState<number>(product.quantity)
    const updateCart = (updatedProducts: productSchema[]) => {
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
        onChangeProducts(updatedProducts);
    };
    const handleLessProducts = () => {
        setProductQuantity(productQuantity <= 1 ? 1 : productQuantity - 1);

    }
    const handleMoreProducts = () =>{
        setProductQuantity(productQuantity + 1)
    }

    const handleRemoveProduct = () => {
        const cartProducts = JSON.parse(localStorage.getItem('cart') || '[]')
        cartProducts.splice(idx,1)
        localStorage.setItem('cart', JSON.stringify(cartProducts))
        onChangeProducts(cartProducts)
    }   

    useEffect(() => {
        const cartProducts = JSON.parse(localStorage.getItem('cart') || '[]')
        cartProducts[idx] = { ...product, quantity: productQuantity }
        updateCart(cartProducts)
    }, [productQuantity])

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
            <p className="price-average">€{Math.round((product.price * product.quantity) * 100) / 100}</p>
        </div>
    )
}

export default InfoCartProduct