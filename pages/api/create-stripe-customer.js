import Stripe from 'stripe';
import {supabase} from '../../lib/supabase';
const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY);

const handler = async (req, res) => {
  if(req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET){
    return res.status(401).send('You are not authorized to call this API');
  }

    const customer = await stripe.customers.create({
        email: req.body.record.email,
    });

   await supabase.from('user_profiles').update({
    stripe_customer: customer.id
   }).eq('user_id', req.body.record.user_id);
   
    res.send({message: `stripe customer created: ${customer.id}`});
};

export default handler;