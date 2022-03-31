import React from 'react'
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';

const PUBLIC_KEY = "pk_test_51KjDScKcAbVNOwx3v65GQtgN9wJI90GN3Idd4Uzeu6zTiex04uaUTHgN04EYTV9bLNUSOY3SOr1knpJV9los1vEB00Q91EDUHO"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
  return (
    <Elements stripe = {stripeTestPromise}>
        
    </Elements>
  )
}
