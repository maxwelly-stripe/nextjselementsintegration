import React from 'react';
import { LinkAuthenticationElement, PaymentElement } from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';


export default function DeferredIntentCheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
  
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const [amount, setAmount] = React.useState(null);

  React.useEffect(() => {
    if (!stripe) {
        return;
    }
    console.log(amount);
    elements.update({amount: amount});
  }, [stripe, elements, amount])


    React.useEffect(() => {
      if (!stripe) {
        return;
      }
  
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
  
      if (!clientSecret) {
        return;
      }
  
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
    }, [stripe]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      setIsLoading(true);

    const {error: submitError} = await elements.submit();
    if (submitError) {
      console.log(submitError);
      return;
    }

      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      });

      console.log(res);
      
      const {clientSecret: clientSecret} = await res.json();

       console.log(clientSecret);
       const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
              // Make sure to change this to your payment completion page
              return_url: "http://localhost:3000/success",
            },
          });
    
        console.log(error);
  
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
  
      setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs",
      };

    return (
        <>
        <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
            id="link-authentication-element"
            onChange={(e) => {
                setEmail(e.value.email)}
            }
        />
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
            </span>
        </button>
        <button type="button" disabled={isLoading || !stripe || !elements} onClick={() => {
            
            setAmount(1000);
            }}>
        <span id="button-text">
          {"Set Amount to 10.00"}
        </span>
      </button>
      <button type="button" disabled={isLoading || !stripe || !elements} onClick={() => {
            setAmount(null)
            }}>
        <span id="button-text">
          {"Set Amount to null"}
        </span>
      </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
        </form>
        
      </>
    )
}