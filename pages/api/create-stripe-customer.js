import Stripe from 'stripe';
import {supabase} from '../../lib/supabase';
const stripe = new Stripe('sk_test_51MJ9gWLI4yA1TYsecmvWxvsQ2HHDhlVI44RRUgeoSvrDN7jFmwyI5orixURe10HIlzG1YHDch34mkCbzH1OjAi0s00FsCve5EI');

const handler = async (req, res) => {
  if(req.query.API_ROUTE_SECRET !== "559fe89721f1d6a4cac9b4f07466fc01ef40b9fdaa0d81133281f46a75fe0d63"){
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