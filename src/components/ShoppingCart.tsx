import "../assets/css/shoppingCart.css";
import InfoCartProduct from "./InfoCartProduct";
import React from "react";
import { useTotalPrice } from "../hooks/TotalPrice";
import { cartProductSchema } from "../interfaces";
import { Link } from "react-router-dom";

interface ShoppingCartProps {
  products: cartProductSchema[];
  onChangeCartProducts: (products: cartProductSchema[]) => void;
}
const ShoppingCart: React.FC<ShoppingCartProps> = ({products,onChangeCartProducts}) => {

  const { subtotal } = useTotalPrice({ products });

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
                  onChangeProducts={onChangeCartProducts}
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
          <Link to='/checkout'
            id="seeCart-button"
            className="custom-btn btn-2"
          >
            buy
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
