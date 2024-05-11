"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();

    if (error) console.log(error);

    router.push("/login");
  };

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
