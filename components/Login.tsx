import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import Dialog from "./Dialog";
import { supabase } from "../lib/supabase";
import Link from "next/link";

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<"sign_in" | "sign_up">("sign_in");
  const { session } = useContext(UserContext);

  useEffect(() => {
    if (session?.user) {
      setShowModal(false);
    }
  }, [session]);

  return (
    <>
      <div className="flex m-4 place-items-center">

        <Link
          href='/enter'
          className="login-button"
          onClick={() => {
            setAuthMode("sign_in");
            setShowModal(true);
          }}
        >
          login
        </Link>{" "}
        
      </div>
      
    </>
  );
}