"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Credentials Login
  const handleLogin = async () => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert(result.error);
      return;
    }

    router.push("/dashboard");
  };

  // GitHub Login
  const handleGithubLogin = async () => {
    await signIn("github", {
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="flex flex-col gap-4 p-10 max-w-sm mx-auto">

      <h1 className="text-xl font-bold">Login</h1>

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Credentials Login */}
      <button
        onClick={handleLogin}
        className="bg-black text-white p-2"
      >
        Login
      </button>

      <hr />

      {/* GitHub Login */}
      <button
        onClick={handleGithubLogin}
        className="bg-gray-800 text-white p-2"
      >
        Login with GitHub
      </button>
    </div>
  );
}