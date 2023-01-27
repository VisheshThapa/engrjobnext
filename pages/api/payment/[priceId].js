import Stripe from 'stripe'
const handler = async (req, res) =>{
    const stripe = Stripe(process.env.STRIPE_SECRECT_KEY)
    const {priceId} = req.query;
    const lineItems = [{
        price: priceId,
        quantity: 1,
    }];
    const session = await stripe.checkout.sessions.create({
    customer_creation: "always",
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: 'http://localhost:3000/payment/success',
    cancel_url: 'http://localhost:3000/payment/cancel',
  });

  res.send({
    id: session.id,
  });
};

export default handler