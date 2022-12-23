
import HeaderResponsive from '../components/HeaderResponsive';
import Table, { TableReviews } from '../components/Table'
import { Chip } from '@mantine/core';
const links = [{
      "link": "/",
      "label": "Home"
    },
    {
      "link": "/pricing",
      "label": "Pricing"
    },
    {
      "link": "/learn",
      "label": "Learn"
    },
    {
      "link": "/community",
      "label": "Post a Job"
    },]

const table_data = [
    {
      "title": "Foundation",
      "author": "Isaac Asimov",
      "year": 1951,
      "reviews": {
        "positive": 2223,
        "negative": 259
      }
    },
    {
      "title": "Frankenstein",
      "author": "Mary Shelley",
      "year": 1818,
      "reviews": {
        "positive": 5677,
        "negative": 1265
      }
    },
    {
      "title": "Solaris",
      "author": "Stanislaw Lem",
      "year": 1961,
      "reviews": {
        "positive": 3487,
        "negative": 1845
      }
    },
    {
      "title": "Dune",
      "author": "Frank Herbert",
      "year": 1965,
      "reviews": {
        "positive": 8576,
        "negative": 663
      }
    },
    {
      "title": "The Left Hand of Darkness",
      "author": "Ursula K. Le Guin",
      "year": 1969,
      "reviews": {
        "positive": 6631,
        "negative": 993
      }
    },
    {
      "title": "A Scanner Darkly",
      "author": "Philip K Dick",
      "year": 1977,
      "reviews": {
        "positive": 8124,
        "negative": 1847
      }
    },
  ]


export default function Home() {

  
  return (
    <div>
        
        <HeaderResponsive links={links}/>
      <Chip.Group position="center" multiple mt={15}>
          <Chip value="1">Multiple chips</Chip>
          <Chip value="2">Can be selected</Chip>
          <Chip value="3">At a time</Chip>
      </Chip.Group>
      
      <Table></Table>

      
    </div>
  )
}
