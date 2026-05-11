"use client";

import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {

  const { data: session } = useSession();

  return (
    <div className="p-10">

      <h1>Dashboard</h1>

      <p>Name: {session?.user?.name}</p>

      <p>Email: {session?.user?.email}</p>

      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white p-2 mt-4"
      >
        Logout
      </button>
    </div>
  );
}