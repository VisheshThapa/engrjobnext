import React, { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';

import HeaderResponsive from '../components/HeaderResponsive';
import Table  from '../components/Table'
import { Chip } from '@mantine/core';






export default function Home() {
  
  const pb = new PocketBase('http://127.0.0.1:8090');
  const [jobsData, setJobData] = useState([]);
  const [jobsDataInital, setJobDataInital] = useState([]);
  const [chipValue, setChipValue] = useState([]);

  const getJobs = async() => {
      const res = await pb.collection('jobs').getList(1, 50, { '$autoCancel': false });
      setJobData(res.items)
      setJobDataInital(res.items)
          }

  const filterJobs = () => {
    const filteredJobs = jobsDataInital.filter(data => data.tags.some(item => chipValue.includes(item)))
    
    setJobData(filteredJobs)
   }

  useEffect(()=>{
  getJobs();
  },[]);


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
        
      


      <Chip.Group position="center" multiple mt={15} value={chipValue} onChange={setChipValue}>
          <Chip value="Mechanical">Mechanical</Chip>
          <Chip value="Civil">Civil</Chip>
          <Chip value="Construction">Construction</Chip>
          <Chip value="S">S</Chip>
      </Chip.Group>

      <Table jobsData = {jobsData} ></Table>

      
    </div>
  )
}
