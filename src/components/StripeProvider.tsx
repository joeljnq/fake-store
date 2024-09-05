import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../assets/css/stripe.css'

const stripePromise = loadStripe('pk_test_51PoQhT1jsSJzGSyCEkZvg4Pn6eQ8ax91ddKbXSS0n3u2AzaRijYYsipptUhobxHhkxIqhKAq56w1jELEGDrBMdon00OisoBM70');

interface CheckoutFormProps {
  onChangeBuyStatus: (status: boolean) => void;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({onChangeBuyStatus}) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [cardholderName, setCardholderName] = useState('');  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; 
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: cardholderName,
        },
      });

      if (error){
        console.log('PaymentMethod:', paymentMethod)
      }else{
        onChangeBuyStatus(true)
      };
      
      
    }
  };
  return (
    <form onSubmit={handleSubmit} id='stripeForm-wrapper'>
      <label>
        Cardholder's Name:
       
      </label>
      <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          required
        />
      <CardElement className='card' />
      <button type="submit" className="custom-btn btn-2" id='button-stripe' disabled={!stripe}>Buy</button>
    </form>
  );
};

interface StripeProviderProps {
  onChangeBuyStatus: (status: boolean) => void;
}
const StripeProvider: React.FC <StripeProviderProps> = ({onChangeBuyStatus}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onChangeBuyStatus={onChangeBuyStatus}/>
    </Elements>
  );
};

export default StripeProvider;
