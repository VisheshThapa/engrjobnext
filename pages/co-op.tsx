import React, { useEffect, useState } from 'react';
import { IconDatabase } from '@tabler/icons';
import { Chip, Button} from '@mantine/core';
import CardFeed from '../components/CardFeed';
import { supabase } from '../lib/supabase';
import { JobProp } from './index';


const LIMIT = 10;

export async function getServerSideProps(context: any) {

  context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=120'
    )

  const {data: jobs} = await supabase.from('co-op_job').select('*').order('created_at', { ascending: false }).limit(LIMIT);

  return {
    props: { jobs }, // will be passed to the page component as props
  };
}


export default function Coop(props: any) {
  console.log(props.jobs)
  const [loading, setLoading] = useState(false);
  const [jobsEnd, setJobsEnd] = useState(false);
  const [jobsData, setJobData] = useState<JobProp[]>(props.jobs);

  const getMoreJobs = async () => {
    setLoading(true);
    const last = jobsData[jobsData.length - 1];
    console.log("Last",last)
    const {data: newJobs } : any = await supabase.from('co-op_job').select('*').order('created_at', { ascending: false }).lt('created_at', last.created_at).limit(LIMIT);
    
    /** 
    const ref = collectionGroup(getFirestore(), 'jobs');
      const postsQuery = query(
        ref,
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        startAfter(cursor),
        limit(LIMIT),
      )
    
    const newJobs = (await getDocs(postsQuery)).docs.map((doc) => doc.data());
    **/
    console.log('NewJobs',newJobs)

    setJobData(jobsData.concat(newJobs));
    setLoading(false);

    if (newJobs!.length < LIMIT) {
      setJobsEnd(true);
      console.log(jobsEnd)
    }
    console.log(jobsEnd)
  };


  return (
    <main className='overflow-hidden'>
      
      
      {/* <Chip.Group position="center" multiple mt={15} value={chipValue} >
          <Chip value="Mechanical">Mechanical</Chip>
          <Chip value="Civil">Civil</Chip>
          <Chip value="Construction">Construction</Chip>
          <Chip value="S">S</Chip>
      </Chip.Group> */}

      <CardFeed jobsData={jobsData}></CardFeed>
    <div className="grid w-screen place-items-center mt-7 ">
      {!loading && !jobsEnd && <Button leftIcon={<IconDatabase size={14} />} className = "bg-blue-500" onClick = {getMoreJobs}> Load More </Button>}

      {loading ? <Button leftIcon={<IconDatabase size={14} />} className = "bg-blue-500" onClick = {getMoreJobs} loading> Load More </Button>: null}

      {jobsEnd && 'You have reached the end!'}
    </div>
    </main>

  )
}
