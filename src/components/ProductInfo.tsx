import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productSchema } from "../interfaces";
import NavBar from "./NavBar";
import '../assets/css/productInfo.css'
import SideBar from "./SideBar";
interface cartProductSchema extends productSchema {
    quantity: number
}
const ProductInfo: React.FC = () => {
    const { productID } = useParams<{ productID: string }>();
    const [product, setProduct] = useState<productSchema | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [openSideBar, setOpenSideBar] = useState<boolean>(false)
    const [cartProducts, setCartProducts] = useState<cartProductSchema[]>(JSON.parse(localStorage.getItem('cart') || '[]'))


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


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartProducts))
    }, [cartProducts])

    
    if (loading) {
        return <div>Loading...</div>;
    }

    
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
            setCartProducts(updatedCartProducts)
        } else {
            setCartProducts([...cartProducts, { ...product, quantity: 1 }])
        }
    }




    return (
        <>
            <NavBar onHandleSideBar={setOpenSideBar} quantityProducts={cartProducts.length} isMainPage={false}/>

            <div className="productInfo-wrapper">
                <img src={product?.image} alt={product?.title} />
                <div className="info-wrapper">
                    <h1 id="productInfo-title">{product?.title}</h1>
                    <p id="productInfo-price">{product?.price}€</p>
                    <p id="productInfo-description">{product?.description}</p>

                    <button className="CartBtn" onClick={() => product && handleAddProduct(product)}>
                        <span className="IconContainer">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" className="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
                        </span>
                        <p className="text">Add to Cart</p>
                    </button>
                </div>
            </div>
            {openSideBar && <SideBar products={cartProducts} onCloseSideBar={setOpenSideBar} onChangeCartProducts={setCartProducts} />}

        </>
    );
};

export default ProductInfo;