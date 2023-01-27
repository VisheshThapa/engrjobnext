import Stripe from 'stripe'
const handler = async (req, res) =>{
    const stripe = Stripe(process.env.STRIPE_SECRECT_KEY)
    const {priceId} = req.query;
    const lineItems = [{
        price: priceId,
        quantity: 1,
    }];
    const session = await stripe.checkout.sessions.create({
    customer: "cus_NEqyRTQeWGqMQP",
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `${process.env.CLIENT_URL}/payment/success`,
    cancel_url: `${process.env.CLIENT_URL}/payment/cancelled`,
  });

  res.send({
    id: session.id,
  });
};

export default handler