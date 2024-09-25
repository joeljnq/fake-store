import "../assets/css/shoppingCart.css";
import InfoCartProduct from "./InfoCartProduct";
import React, { useState } from "react";
import { useTotalPrice } from "../hooks/TotalPrice";
import { cartProductSchema } from "../interfaces";

const ShoppingCart: React.FC = () => {
  const [products, setProducts] = useState<cartProductSchema[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const { subtotal } = useTotalPrice({ products });

  const handleToNavigation = (path: string) => {
    if (path.length === 0) {
      const url = `${window.location.origin}`;
      window.open(url, "_self");
    }

    const url = `${window.location.origin}${path}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <header>
        <h1
          onClick={() => {
            handleToNavigation("");
          }}
          className="sc-title"
        >
          FakeStore
        </h1>
      </header>
      <main className="main-cart">
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
      </main>
    </>
  );
};

export default ShoppingCart;
