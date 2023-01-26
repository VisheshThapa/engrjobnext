import {Box, Grid, Avatar, CardSection} from '@mantine/core'
import Link from 'next/link';
import internal from 'stream';
import {JobProp} from '../pages/index'



export default function AdminCardFeed(props: {jobsData: JobProp[]}){
  return  (<>{props.jobsData ? props.jobsData?.map((job) => <JobCard job = {job} key = {job.id}/> ) : null}</>);
}


function JobCard(props: {job: JobProp}){
  const job = props.job
    return(
<div className="flex flex-col gap-2 mt-5 ...">
<div  className=" bg-orange-100			mx-auto max-h-24 shadow-gray-100 w-full max-w-screen-lg flex flex-col sm:flex-row gap-2 sm:items-center justify-between px-5 py-4 rounded-md">
  
  
<div className="flex flex-row content-center ... max-w-[40%] min-w-[35%]">
    
    <Avatar size = "lg" className = "mr-3 my-auto" />
  
  <div className="justify-start text-left">  

    <span className="text-purple-800 text-xs ">{job.company}</span>
    
    <h5 className="font-bold mt-px text-amber-800		">{job.title}</h5>
    
    <div className="flex items-center gap-3 mt-2">
        <span className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-xs">Full-time</span>
        <span className="text-slate-600 text-sm flex gap-1 items-center"> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg> Remote, UK</span>
    </div>

  </div>
</div>
        <div className = "self-center">
        {job.tags.map((tag: string | number, index) => (
            
            <div key = {index} className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-stone-700 bg-orange-300 border border-orange-300 ">
            <div className="text-xs font-normal leading-none max-w-full flex-initial">{tag}</div>
        </div>
            
            ))}

        </div>
  <div>

          <Link href={`/admin/${job.id}`}>
            <button className="bg-green-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">Edit
            
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            </button>
          </Link>

          {job.is_published ? <p className="text-emerald-800	text-center">Live</p> : <p className="text-danger">Unpublished</p>}
        


  </div>
 </div> 
</div>  
    );

}