import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { doc, writeBatch, getDoc, getFirestore } from 'firebase/firestore';
import { signInWithPopup, signInAnonymously } from 'firebase/auth';
import { UserContext } from '../lib/context';
import { supabase } from '../lib/supabase';
import { useEffect, useState, useCallback, useContext } from 'react';
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { send } from 'process';
import Login from '../components/Login';

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:3000/login',
  // This must be true.
  handleCodeInApp: true,
};





export default function Enter(props: any) {
  const { session } = useContext(UserContext);
  const [authMode, setAuthMode] = useState<"sign_in" | "sign_up">("sign_in");
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // 1. user signed out <SignInButton />
  // 3. user signed in, has username <SignOutButton />
  console.log('V')
  return (
    <main>
      {session ?  <SignOutButton />: <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                className: {
                  container: "login-form-container",
                  label: "login-form-label",
                  button: "login-form-button",
                  input: "login-form-input",
                },
              }}
              view={authMode}
            />}

      
      
    
    </main>
  );
}





// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOtp({
    email: 'kizieto@gmail.com',
    options: {
      emailRedirectTo: 'https://localhost:3000/',
    },
  })
  };

  return (
    <>
      <button className="btn-google" onClick={signInWithGoogle}>
        <img src={'/google.svg'} width="30px" /> Sign in with Google
      </button>
    </>
  );
}

// Sign out button
function SignOutButton() {
  const signOut = async () => {
    await supabase.auth.signOut()
  };

  return <button onClick={() => signOut()}>Sign Out</button>;
}
