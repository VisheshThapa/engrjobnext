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

interface JobsDataProp {
  jobsData: {
    city: string;
    company: string;
    country: string;
    createdAt: string;
    title: string;
    link: string;
    logo: string;
    province: string;
    tags: string[];
    updatedAt: string;
  };
}






export default function TableReviews({jobsData}: JobsDataProp) {
  const { classes, theme } = useStyles();

  
  const rows = jobsData?.map((row: any) => {

    return (
      <tr key={row.title}>

        <td >
          <Anchor size="sm" >
            
              {row.title}
        
          </Anchor>
        </td>
        <td>
          <Text size="sm">{row.city}, {row.country}</Text>
        </td>
        <td>
          
            {row.tags.map((tag: string | number ) => (
            
            <Anchor key={tag} size="sm"> {tag},
            </Anchor>
            
            ))}
          

        </td>
        <td>
          {row.createdAt}
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
    <ScrollArea mx = "3rem">
      <Table sx={{ minWidth: 800 }}  verticalSpacing="xs">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Location</th>
            <th>Tags</th>
            <th>Apply</th>
            <th>Days Ago</th>
          </tr>
        </thead>
        <tbody >{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}