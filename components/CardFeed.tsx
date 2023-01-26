import {Box, Grid, Avatar, CardSection} from '@mantine/core'
interface JobsDataProp {
  jobsData: {
    jobs:[{
    id: number;
    city: string;
    country: string;
    company: string;
    createdAt: string;
    title: string;
    link: string;
    logo: string;
    province: string;
    tags: string[];
    updatedAt: string;
    published: boolean;
    }]
  };
};

interface JobProp {
  job: {
    id: number;
    city: string;
    country: string;
    company: string;
    createdAt: string;
    title: string;
    link: string;
    logo: string;
    province: string;
    tags: string[];
    updatedAt: string;
    published: boolean;
  }
};


export default function CardFeed({jobsData}: JobsDataProp){
  return (<>{jobsData ? jobsData.jobs.map((job) => <JobCard job = {job} key = {job.id}/>) : null}</>);
}



function JobCard({job}: JobProp){

    return(

<div  className=" max-h-fit flex flex-col gap-1 mt-2 ...">
<div   className="max-h-fit	 bg-orange-100 mx-auto shadow-gray-100 w-full max-w-screen-lg flex flex-row sm:flex-row gap-2 items-center justify-between px-5 py-4 rounded-md">
  
  
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
        {job.tags.map((tag: string | number, index: number) => (
            
            <div key = {index} className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-stone-700 bg-orange-300 border border-orange-300 ">
            <div className="text-xs font-normal leading-none max-w-full flex-initial">{tag}</div>
        </div>
            
            ))}

    </div>
  
  <div>
    
    <a href = {job.link} target="_blank" rel="noopener noreferrer">
    <button className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">Apply Now 
    
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
    </button>
    </a>
        


  </div>
 </div> 
</div>  
    );

}