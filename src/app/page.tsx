"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const getSession = async () => {
    let {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      session = await refreshSession();
    }

    if (session) {
      const { access_token, refresh_token } = session;

      setSession(access_token, refresh_token);

      return session;
    } else {
      handleLogout();
    }
  };

  const refreshSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.refreshSession();

    return session;
  };

  const setSession = async (access_token: string, refresh_token: string) => {
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    return true;
  };

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();

    if (error) console.log(error);

    router.push("/login");
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <div>
      Logged in!!!
      <br />
      <br />
      <br />
      <button className="bg-red-700 rounded-md p-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
