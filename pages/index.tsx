import React, { useEffect, useState } from 'react';
import HeaderResponsive from '../components/HeaderResponsive';
import Table  from '../components/Table'
import { Chip } from '@mantine/core';
import Loader from '../components/Loader';
import { firestore, postToJSON } from '../lib/firebase';
import { Timestamp, query, where, orderBy, limit, collectionGroup, getDocs } from 'firebase/firestore';
import Card from '../components/Card';
const LIMIT = 10;

export async function getServerSideProps(context: any) {
  const ref = collectionGroup(firestore, 'jobs');
  const jobsQuery = query(
    ref,
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT),
  )
  const jobs = (await getDocs(jobsQuery)).docs.map(postToJSON);
  return {
    props: { jobs }, // will be passed to the page component as props
  };
}


export default function Home(props: any) {

  const [chipValue, setChipValue] = useState([]);
  
  const [jobsData, setJobData] = useState(props.jobs);
  const [jobsDataInital, setJobDataInital] = useState(props.jobs);

  const filterJobs = () => {
    const filteredJobs = jobsDataInital.filter(data => data.tags.some(item => chipValue.includes(item)))    
    setJobData(filteredJobs)
   }



  useEffect(() => {
   // adding event listeners on mount here
   
   filterJobs();

   if(chipValue.length === 0){
    setJobData(jobsDataInital);
   }
   
  //  return () => {
  //      // cleaning up the listeners here
  //  }
}, [chipValue]); 

  return (
    <div>
        <Loader show />
      


      <Chip.Group position="center" multiple mt={15} value={chipValue} onChange={setChipValue}>
          <Chip value="Mechanical">Mechanical</Chip>
          <Chip value="Civil">Civil</Chip>
          <Chip value="Construction">Construction</Chip>
          <Chip value="S">S</Chip>
      </Chip.Group>

      
      <Card jobsData={jobsData}></Card>
      
    </div>
  )
}
