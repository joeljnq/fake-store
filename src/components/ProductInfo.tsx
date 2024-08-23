import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productSchema } from "../interfaces";

const ProductInfo: React.FC = () => {
    const { productID } = useParams<{ productID: string }>();
    const [product, setProduct] = useState<productSchema | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${productID}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product");
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                console.log(err);
                
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    

    return (
        <div>
            <h1>{product?.title}</h1>
            <img src={product?.image} alt={product?.title} />
            <p>{product?.description}</p>
            <p>{product?.price}</p>
        </div>
    );
};

export default ProductInfo;