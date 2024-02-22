import { updateUserStatus } from "@/actions/userActions";
import { NextResponse } from "next/server";
import Stripe from "stripe";
//import User from "@/models/User";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
// Stripe requires the raw body to construct the event.


const updateUserSubscription = async (session) => {

    const customerEmail = session.metadata.userEmail
    const subscriptionNumber = session.id
    console.log(subscriptionNumber,"sub")

    try {
        updateUserStatus(customerEmail, subscriptionNumber)
        console.log("zz")
    } catch (err) {
        console.log(err)
    }
}


export const POST = async (req, res) => {
console.log('toto')
    const text = await req.text();
    const sig = req.headers.get("stripe-signature")/// work


    let event 
    try {
        event = stripe.webhooks.constructEvent(text, sig, webhookSecret)
    } catch (err) {
        // On error, log and return the error message
        console.log(`❌ Error message: ${err.message}`)
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
    }
    console.log("received ", event.type);


    if(event.type === 'checkout.session.completed'){
        const session = event.data.object
         updateUserSubscription(session)
        let schedule = await stripe.subscriptionSchedules.create({
            from_subscription: session.subscription
        })
        console.log(`Schedule created: ${schedule.id}`)
    }
    // Successfully constructed event
    return NextResponse.json({ succes: "xx" });
  };