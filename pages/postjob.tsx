import Stripe from 'stripe'
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css'
import { Textarea, TextInput, Radio,   Chip } from '@mantine/core';
import { stringify } from 'querystring';
import { PlanetScale } from 'planetscale';
import {useState} from 'react'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';



export const getStaticProps = async() =>{
    const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY!, {
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
        <Post/>
        <div>
            <Price plans = {plans}></Price>
        </div>
        </>
    )

}



function Post(){
    const [link, setLink] = useState('');
    const [pay, setPay] = useState('');
    const [company, setCompany] = useState('');
    const [title, setTitle] = useState('');
    const [country, setCountry]= useState('');
    const [province, setProvince]= useState('');
    const [text, setText]= useState('');

    const [remote, setRemote] = useState('0');
    const [tagValue, setTagValue] = useState<string[]>([]);
    const tagsArray = ["Mechanical", "Electrical", "Civil", "Computer", "Chemical", "Aerospace", "Biomedical", "Construction", "Power",
    "Software", "CAD", "Automotive", "Research", "HVAC", "VLSI", "Control", "Audio", "Project", "Design", "Energy", "Communications",
    "FEM", "Materials"
];
console.log('Tag Value', tagValue)

const CheckTag = (tag: string[]) => {
    if(tag?.length > 5){
        console.log('Tag',tag)
        const tag_5 = [...tag];
        tag_5.reverse().pop();
        setTagValue(tag_5)
        return(undefined);
    }
    else{
        setTagValue(tag)
    }
    return(undefined);
};
    return(
        
        <>
        <div>

            <TextInput
        placeholder="https://company.com/careers/job-title"
        label="URL of your job"
        withAsterisk
        value={link} onChange={(event) => setLink(event.currentTarget.value)} 
            />

            <TextInput
        placeholder="https://company.com/careers/job-title"
        label="Name of Company"
        withAsterisk
        value={company} onChange={(event) => setCompany(event.currentTarget.value)} 
            />

            <TextInput
        placeholder="Title of Your Job"
        label="Job Title"
        withAsterisk
        value={title} onChange={(event) => setTitle(event.currentTarget.value)}
            />

            <TextInput
        placeholder="Example: CAD $50- $60k"
        label="Salary"
        value={pay} onChange={(event) => setPay(event.currentTarget.value)}
            />
            
            <Radio.Group
                name="Remote"
                label="Is this job 100% Remote"
                withAsterisk
                value={remote}
                onChange={setRemote}
                >
                <Radio value= '1' label="Yes" />
                <Radio value= '0' label="No" />
            </Radio.Group>

                    <Radio.Group
                name="Country"
                label="Where is the country located"
                withAsterisk
                >
                <Radio value="CA" label="Canada" />
                <Radio value="US" label="USA" />
            </Radio.Group>
        
        <div className="flex flex-row ...">

            <TextInput
        className='basis-auto'
        placeholder="Example: Ontario"
        label="State/Province"
            />

            <TextInput
        className='basis-auto'
        placeholder="Example: Toronto"
        label="City"
            />
        </div>

        <p>Choose up to 5</p>
      <Chip.Group value={tagValue} onChange={(e)=>CheckTag(e)} multiple>
        {tagsArray.map((tag)=><Chip key = {tag} value={tag}>{tag}</Chip>)}
      </Chip.Group>
    
        
        <ReactQuill theme="snow" value={text} onChange={setText} />;

        </div>
        </>
    );
}

function Price({plans}: any){

    const processSubscription = (planId: any) => async () => {
    const { data } = await axios.get(`/api/payment/${planId}`);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    await stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
      {plans.map((plan: any) => (
        <div key={plan.id} className="w-80 h-40 rounded shadow px-6 py-4">
          <h2 className="text-xl">{plan.name}</h2>
          <p className="text-gray-500">
            ${plan.price / 100} / {plan.interval}
          </p>
                <button onClick={processSubscription(plan.id)}>
                  Buy
                </button>
        </div>
      ))}
    </div>
  );
}