import Stripe from 'stripe'

import { Textarea } from '@mantine/core';
import { stringify } from 'querystring';
import { PlanetScale } from 'planetscale';

export const getStaticProps = async() =>{
    const stripe = new Stripe('sk_test_51MJ9gWLI4yA1TYsecmvWxvsQ2HHDhlVI44RRUgeoSvrDN7jFmwyI5orixURe10HIlzG1YHDch34mkCbzH1OjAi0s00FsCve5EI', {
    apiVersion: '2022-11-15',});

    const {data: prices} = await stripe.prices.list();
    const plans = await Promise.all(prices.map(async(price :any)=>{
        const product = await stripe.products.retrieve(price.product);
        return{
            id: price.id,
            name: product.name,
            price: price.unit_amount,
            currency: price.currency
        }
    }))
  return{
    props:{
        plans,
    },
  }
}

export default function PostJob({plans}: any){


    return(
        <>
        <Post></Post>
        <div>
            {
              plans.map((plan: any)=>(
                <div key = {plan.id}>
                    <h2>{plan.name}</h2>
                    <p>
                        { '$'+ plan.price/100 + '.00'}
                    </p>
                </div>
              ))  
            }
        </div>
        </>
    )

}

function Post(){
    return(
        
        <>
        <div>
            
            <Textarea
        placeholder="Title of Your Job"
        label="Job Title"
        autosize
        minRows={2}
            />

            <Textarea
        placeholder="Website Link to Apply for Job or Email address "
        label="Job Link"
        autosize
        minRows={2}
            />

            <Textarea
        placeholder="Example: CAD $50- $60k"
        label="Salary"
        autosize
        minRows={2}
            />

            <Textarea
        placeholder="Example: CAD $50- $60k"
        label="Salary"
        autosize
        minRows={5}
            />

        </div>
        </>
    );
}