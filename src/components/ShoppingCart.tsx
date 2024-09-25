import "../assets/css/shoppingCart.css";
import InfoCartProduct from "./InfoCartProduct";
import React, { useState } from "react";
import { useTotalPrice } from "../hooks/TotalPrice";
import { cartProductSchema } from "../interfaces";
import { useNavigate } from "react-router-dom";

const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<cartProductSchema[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const { subtotal } = useTotalPrice({ products });

  const handleToNavigation = (path: string) => {
   navigate(path);
  };

  return (
    <>
      <h1 id="shopping-title">SHOPPING CART</h1>
      <div className="main-cart">
        <div className="cartProduct-wrapper">
          {products.length > 0 ? (
            products.map((product, index) => {
              return (
                <InfoCartProduct
                  product={product}
                  idx={index}
                  onChangeProducts={setProducts}
                  key={index}
                />
              );
            })
          ) : (
            <p>There is no product in your cart</p>
          )}
        </div>
        <div className="totalPrice-wrapper">
          <p>Sumarry of the products</p>

          <p>subtotal: {subtotal}€</p>
          <p>-----------------</p>
          <p>Estimated total {subtotal}€</p>
          <button
            id="seeCart-button"
            className="custom-btn btn-2"
            onClick={() => handleToNavigation("/checkout")}
          >
            buy
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
