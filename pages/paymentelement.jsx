import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import Navigation from '../components/Navigation';

import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentIntentPage() {

  const [clientSecret, setClientSecret] = React.useState("");

  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)}
        );
  }, []);
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
    return (
        <>
            <Navigation />
            <div className="App">
            {clientSecret && <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
            }
            </div>
        </>
    )
}