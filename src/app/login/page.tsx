"use client";
import { InputField } from "@/components";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/users/login", user);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const isButtonDisabled = !user.email || !user.password || loading;

  return (
    <div className="bg-black min-h-full w-full">
      <form
        className="max-w-lg bg-transparent m-auto mt-40 flex flex-col items-center gap-8 p-4 rounded-xl shadow-2xl shadow-slate-200"
        onSubmit={onLogin}
      >
        <h1 className="text-white text-center text-lg font-semibold">LOGIN</h1>

        <InputField
          name="email"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInput}
        />
        <InputField
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInput}
        />
        <button
          type="submit"
          disabled={isButtonDisabled}
          className="bg-blue-400 hover:bg-blue-500 p-2 rounded-lg cursor-pointer w-1/2 "
        >
          {loading ? "Logging In..." : "Login"}
        </button>
        <Link href={"/signup"}>
          <p className="text-white text-center">Visit signup page</p>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
