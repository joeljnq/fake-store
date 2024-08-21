import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51PoQhT1jsSJzGSyCEkZvg4Pn6eQ8ax91ddKbXSS0n3u2AzaRijYYsipptUhobxHhkxIqhKAq56w1jELEGDrBMdon00OisoBM70');
const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e: React.FormEvent) => {
    // handle stripe payment
    e.preventDefault();
    const cardElement = elements?.getElement(CardElement);
    if (cardElement && stripe) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
    }else{
      console.log('error');
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button>buy</button>
    </form>
  )
}

const StripeProvider: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeProvider;
