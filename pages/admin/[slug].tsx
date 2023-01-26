import styles from '../../styles/Admin.module.css';

import AuthCheck from '../../components/AuthCheck';
import { serverTimestamp, doc, getDoc,deleteDoc, updateDoc, getFirestore, DocumentSnapshot } from 'firebase/firestore';
import ImageUploader from '../../components/ImageUploader';
import { UserContext } from '../../lib/context';
import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {supabase} from '../../lib/supabase'
import { useForm, useFormState } from 'react-hook-form';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminPostEdit(props: any) {

  return (
    <AuthCheck>
      <JobManager />
    </AuthCheck>
  );
}

function JobManager() {
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  console.log('Render')
  const { session } = useContext(UserContext)
  console.log('session', session?.user.id)
  const [isLoading, setLoading] = useState(false)
  const [jobs, setJobs] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(true);

    if(session || isLoading == true){
      getData().then(()=>setLoading(false));
    }
  }, [session]) 

  async function getData(){
    const {data} = await supabase.from("job").select("*").eq('user_id', session?.user.id);
    console.log(data);
    setJobs(data);
    }




  if (isLoading) return <p>Loading...</p>
  if (!jobs) return <p>No profile data</p>


  return (
    <main className={styles.container}>
      <p> Admin Page </p>
      {jobs && (
        <>
          <section>
            <h1>{jobs.title}</h1>
            <p>ID: {jobs.id}</p>

            <JobForm jobRef={jobs} defaultValues={jobs} preview={preview} />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${jobs.admin}/${jobs.id}`}>
              <button className="btn-blue">Live view</button>
            </Link>
            <DeletePostButton jobRef={jobs} />
          </aside>
        </>
      )}
    </main>
  );
}

function JobForm( {defaultValues,jobRef,preview} ) {
  const { register, handleSubmit, reset, watch, formState: { errors }, control } = useForm({ defaultValues, mode: 'onChange' });

  const { isValid, isDirty } = useFormState({
    control
  });

  const updatePost = async ({content}: any, {published}: any) => {
    await updateDoc(jobRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success('Post updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          React Markdwon
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
        <ImageUploader />

        <textarea
          name="content"
          
        ></textarea>

        {errors.content && <p className="text-danger">{errors.content.message}</p>}

        <fieldset>
          <input className={styles.checkbox} type="checkbox" {...register("published")} />
          <label>Published</label>
        </fieldset>

        <button type="submit" className="btn-green" disabled={!isDirty || !isValid}>
          Save Changes
        </button>
      </div>
    </form>
  );
}

function DeletePostButton({jobRef}: any ) {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm('are you sure!');
    if (doIt) {
      await deleteDoc(jobRef);
      router.push('/admin');
      toast('post annihilated ', { icon: '🗑️' });
    }
  };

  return (
    <button className="btn-red" onClick={deletePost}>
      Delete
    </button>
  );
}