"use client";
import { InputField } from "@/components";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

interface User {
  email: string;
  password: string;
  username: string;
}

const SignupPage = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);
      toast.success("Signup Success");
      toast.success("Verification link has been sent to your email address");

      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const isButtonDisabled =
    !user.email || !user.password || !user.username || loading;

  return (
    <div className="bg-black min-h-full w-full ">
      <form
        className="max-w-lg bg-transparent m-auto mt-40 flex flex-col items-center gap-8 p-4 rounded-xl shadow-2xl shadow-slate-200"
        onSubmit={onSignUp}
      >
        <h1 className="text-white text-center text-lg font-semibold">SIGNUP</h1>
        <InputField
          name="username"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={handleInput}
        />
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
          className=" w-1/2 bg-blue-400 hover:bg-blue-500 p-2 rounded-lg cursor-pointer "
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <Link href={"/login"}>
          <p className="text-white text-center">Visit login page</p>
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
