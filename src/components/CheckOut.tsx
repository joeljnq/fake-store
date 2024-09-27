import React, { useEffect, useState } from "react";
import "../assets/css/checkout.css";
import StripeProvider from "./StripeProvider";
import SucessPayment from "./SucessPayment";
import { cartProductSchema } from "../interfaces";

interface CheckoutProps{
  onChangeCartProducts: (products: cartProductSchema[]) => void;
}
const CheckOut: React.FC<CheckoutProps> = ({onChangeCartProducts}) => {
  const [buyStatus, setBuyStatus] = useState(false);
 
  useEffect(()=>{
    
    if (buyStatus) {

      onChangeCartProducts([]);
      localStorage.removeItem("cart");
    }
  },[buyStatus,onChangeCartProducts])
  return (
    <>
      <h1 id="checkout-title">Checkout</h1>

      <div className="checkout-wrapper">
        <form id="form-checkout">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required></input>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required></input>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" required></input>
          <label htmlFor="city">City:</label>
          <input type="text" id="city" name="city" required></input>
          <label htmlFor="zip">Zip:</label>
          <input type="text" id="zip" name="zip" required></input>
          <label htmlFor="country">Country:</label>
          <input type="text" id="country" name="country" required></input>
        </form>
        <div className="payment">
          <StripeProvider onChangeBuyStatus={setBuyStatus} />
        </div>
      </div>
      {buyStatus && <SucessPayment />}
    </>
  );
};

export default CheckOut;
