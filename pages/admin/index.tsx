import AuthCheck from '../../components/AuthCheck';
import AdminCardFeed from '../../components/AdminCardFeed';
import { UserContext } from '../../lib/context';
import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {supabase} from '../../lib/supabase'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import toast from 'react-hot-toast';
import { encode } from 'punycode';
import { redirect, useNavigate } from "react-router-dom";
import { JobProp } from '../../pages/index';

export default function AdminPostsPage(props: any) {
  console.log('Render')
  const { session } = useContext(UserContext)
  console.log('session', session?.user.id)
  const [isLoading, setLoading] = useState(false)
  const [jobs, setJobs] = useState<JobProp[]>([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(true);
    console.log('UseEffect')

    if(session || isLoading == true){
      getData().then(()=>setLoading(false));
    }
  }, [session]) 

  async function getData(){
    const {data} : any = await supabase.from("job").select("*").eq('user_id', session?.user.id);
    console.log(data);
    setJobs(data);
    }

  if (isLoading) return (<AuthCheck><p>Loading...</p></AuthCheck>)
  if (!jobs) return <p>No profile data</p>
  
  return (
    <main>
      <AuthCheck>
        <JobList jobs = {jobs} />
      </AuthCheck>
    </main>
  );
}

function JobList(jobs: any) {
  // const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
  // const query = ref.orderBy('createdAt');
  
  /*
  const ref = collection(getFirestore(), 'users', auth.currentUser.uid, 'jobs')
  const jobQuery = query(ref, orderBy('createdAt'))

  const [querySnapshot] = useCollection(jobQuery);

  const jobs = querySnapshot?.docs.map((doc) => doc.data());
  */
  return (
    <>
      <h1>Manage your Posts</h1>
      <AdminCardFeed jobsData={jobs} />
    </>
  );
}

/* function CreateNewJob(){
  const router = useRouter();
  const {user} = useContext(UserContext);
  const [title, setTitle] = useState('');

  const slug = encode(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;
  return(
    <form onSubmit={createJob}>
      <input

    </form>
  );
} */

