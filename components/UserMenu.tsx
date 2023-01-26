import { useContext } from "react";
import { UserContext } from "../lib/context";
import { supabase } from "../lib/supabase";

export default function UserMenu() {
  const { profile } = useContext(UserContext);

  return (
    <>
      <div className="flex flex-col">
        <h2>Welcome {profile?.email || "dawg"}.</h2>
        <button
          onClick={() => supabase.auth.signOut()}
          className="user-menu-logout-button"
        >
          Logout
        </button>
      </div>
    </>
  );
}