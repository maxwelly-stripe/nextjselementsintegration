import React from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  AddressElement,
  ExpressCheckoutElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onConfirm = async () => {
    const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
  
      if (!clientSecret) {
        return;
      }

    const {error} = await stripe.confirmPayment({
      // `Elements` instance that's used to create the Express Checkout Element.
      elements,
      // `clientSecret` from the created PaymentIntent
      clientSecret,
      confirmParams: {
        return_url: 'https://nextjselementsintegration.vercel.app/',
      },
      // Uncomment below if you only want redirect for redirect-based payments.
      // redirect: 'if_required',
    });

    if (error) {
      // This point is reached only if there's an immediate error when confirming the payment. Show the error to your customer (for example, payment details incomplete).
    } else {
      // Your customer will be redirected to your `return_url`.
    }
  };

  const options = {
    wallets: {
        googlePay: 'always'
    }
  }

  return (
    <div id="checkout-page">
      <ExpressCheckoutElement
        onConfirm={onConfirm}
        options={options}
      />
      <PaymentElement />
    </div>
  );
}