import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductInfo: React.FC = () => {
    const {productID} = useParams();
    const [product, setProduct] = useState<any>(null);
    useEffect(()=>{
        fetch(`https://fakestoreapi.com/products/${productID}`)
        .then(res => res.json())
        .then(res => setProduct(res) )
    },[setProduct,productID])
    return(
        <div>
            <h1>{product?.title}</h1>
            <img src={product?.image} alt={product?.title} />
            <p>{product?.description}</p>
            <p>{product?.price}</p>
        </div>
    )
}

export default ProductInfo;