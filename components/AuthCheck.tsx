import { useContext } from 'react';
import { UserContext } from '../lib/context';
import Link from 'next/link'
// Component's children only shown to logged-in users

export default function AuthCheck(props: any) {
  
  const { session } = useContext(UserContext);
  return session ? props.children : props.fallback || <Link href="/enter">You must be signed in</Link>;
}