import dbConnect from "@/server/config/dbConnect";
import { buffer } from "micro";
import Order from "@/server/models/Order";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    await dbConnect();
    const signingSecret = process.env.STRIPE_SIGNING_SECRET;
    const payload = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(payload, sig, signingSecret);

    if (event?.type === 'checkout.session.completed') {
        const metadata = event.data?.object?.metadata;
        const paymentStatus = event.data?.object?.payment_status;

        if (metadata?.orderId && paymentStatus === 'paid') {
         await Order.findByIdAndUpdate(metadata.orderId, {paid: 1});         
        }
}
}

export const config = {
    api: {
        bodyParser: false,
    },
};