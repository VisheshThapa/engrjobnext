import { useRouter } from "next/router";
import { JobProp } from "..";
import { supabase } from "../../lib/supabase";
import kebabCase from 'lodash.kebabcase';

export const getStaticPaths = async () => {
  const { data: jobs } = await supabase.from("job").select("*");

  const paths = jobs!.map(({ title, id }) => ({
    params: {
      slug: encodeURI(kebabCase(title)) + '-' + id,
    },
  }));
  console.log('Paths', paths)
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (params: { slug: any }) => {
  console.log('Get static', params.slug)
  const { data: job } = await supabase
    .from("job_duplicate")
    .select("*")
    .single();

  if (!job) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      job,
    },
    revalidate: 86400,
  };
};


export default function JobPage(props: { job: JobProp }) {

  return (
    <>

    </>
  )
}