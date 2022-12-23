import PocketBase from 'pocketbase';
import { createStyles, Table, Progress, Anchor, Text, Group, ScrollArea, Avatar, Flex } from '@mantine/core';
import React, { useEffect, useState } from 'react';

const useStyles = createStyles((theme) => ({
  progressBar: {
    '&:not(:first-of-type)': {
      borderLeft: `3px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
    },
  },
}));

interface TableReviewsProps {
  data: {
    title: string;
    avatar: string;
    author: string;
    year: number;
    reviews: { positive: number; negative: number };
  }[];
}



const pb = new PocketBase('http://127.0.0.1:8090');



export default function TableReviews() {
  const { classes, theme } = useStyles();
  const [jobsData, setJobData] = useState([]);

  
  
  useEffect(()=>{
    const getJobs = async() => {
      const res = await pb.collection('jobs').getList(1, 50, { '$autoCancel': false });
      console.log(res.items)
      console.log("UseEffect")
      setJobData(res.items)
          }

  getJobs();

  },[]);


  const rows = jobsData?.map((row: any) => {

    return (
      <tr key={row.job_title}>
        <td>
          <Anchor<'a'> size="sm" onClick={(event) => event.preventDefault()}>
            {row.job_title}
          </Anchor>
        </td>
        <td>
          <Text size="sm">{row.city}, {row.country}</Text>
        </td>
        <td>
          <Anchor<'a'> size="sm" onClick={(event) => event.preventDefault()}>
            {row.job_title}
          </Anchor>
        </td>
        <td>
          3434
        </td>
        <td>
            <Text size="xs" color="teal" weight={700}>
              34343
            </Text>

        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Location</th>
            <th>Tags</th>
            <th>Apply</th>
            <th>Days Ago</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}