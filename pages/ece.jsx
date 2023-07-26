import React from 'react';
import { Elements } from '@stripe/react-stripe-js';

import { loadStripe } from "@stripe/stripe-js";
import Navigation from '../components/Navigation';
import EceCheckoutForm from '../components/EceCheckoutForm';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function ExpressCheckoutElementPage() {

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        mode: 'payment',
        appearance,
        currency: 'cad', 
        amount: 1000,
    };

    return (
        <>
            <Navigation />
            <Elements options = {options} stripe={stripePromise} >
                <EceCheckoutForm />
            </Elements>
        </>
    )
}