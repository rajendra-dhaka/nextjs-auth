"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type User = {
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
};

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setUser(response.data.data);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      router.push("/login");
      toast.success("Logged Out");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="relative bg-black min-h-full w-full">
      <button
        onClick={logout}
        className="absolute right-4 top-4 rounded-xl px-4 py-2 text-lg font-bold bg-white hover:bg-slate-700 hover:text-white self-end"
      >
        LOGOUT
      </button>

      <div className="mx-auto mt-28 w-1/2 border-2 border-slate-300 rounded-xl text-white p-4 flex flex-col gap-2 shadow-xl shadow-slate-300">
        <h3>Username: {user?.username}</h3>
        <h3>Email: {user?.email}</h3>
        <h3>isAdmin: {user?.isAdmin ? "Yes" : "No"}</h3>
        <h3>isVerified: {user?.isVerified ? "Yes" : "No"}</h3>
      </div>
    </div>
  );
};

export default ProfilePage;
