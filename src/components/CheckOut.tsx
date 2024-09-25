import React, { useState } from "react";
import '../assets/css/checkout.css'
import StripeProvider from "./StripeProvider";
const CheckOut: React.FC = () => {
  const [buyStatus, setBuyStatus] = useState(false);
  if (buyStatus) {
    localStorage.removeItem('cart');
    const url = `${window.location.origin}`;
    window.location.href = url;

  }
  const handleToOrigin = () => {
    const url = `${window.location.origin}`;
    window.open(url, '_self');
  }
  return (
    <>
      <header>
        <h1 onClick={()=> handleToOrigin()} id="checkout-title">Checkout</h1>
      </header>
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
    </>
  )
}

export default CheckOut;