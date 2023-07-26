import React from "react";
import { loadStripe } from "@stripe/stripe-js";

import Navigation from '../components/Navigation'
import './globals.css';



export default function App() {
  return (
    <>
        <Navigation />
        <h2>Payment Elements Integration</h2>
        
    </>
  );
}