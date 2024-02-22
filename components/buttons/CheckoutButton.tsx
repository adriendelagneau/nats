"use client"

import getStripe from '@/utils/get-stripe'
import React from 'react'

const CheckoutButton = ({ plan, userEmail }) => {

  
  const pay = async (e) => {
    let price = plan.id
    
    if (userEmail !== undefined) {
      e.preventDefault();
        try {
            const res = await fetch(
                '/api/checkout_sessions', {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userEmail, price})
                    
                }
              );
            
              // Redirect to Checkout.
              const stripe = await getStripe();
            const data = await res.json()
           // console.log(data.session.id)
           const stripeResponse = await stripe?.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: data.session.id,
          });
        } catch (err) {
            console.log(err)
        }       
    } else {
      toast.info('must be connected')
    }
  
  }
  return (
    <button onClick={(e)=>pay(e)}>subscribe</button>
  )
}

export default CheckoutButton