import React from 'react';
import Navigation from '../components/Navigation';
import DeferredIntentCheckoutForm from '../components/DeferredIntentCheckoutForm';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {betas: ["deferred_intent_pe_optional_amount_beta_0"]});
export default function DeferredIntentPage() {
    const appearance = {
        theme: 'flat',
    }
    const options = {
        mode: 'payment',
        appearance,
        currency: 'cad',
    }
    return (
        <>
            <Navigation />
            <Elements options = {options} stripe={stripePromise} >
                <DeferredIntentCheckoutForm />
            </Elements>
        </>
    )
}