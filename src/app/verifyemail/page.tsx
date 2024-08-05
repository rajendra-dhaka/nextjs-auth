"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const VerifyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const verifyUserEmail = async () => {
    try {
      await axios.post(`/api/users/verifyemail`, { token });
      toast.success("Email verified successfully");
      router.push("/login");
    } catch (e: any) {
      toast.error(e.response.data);
    }
  };

  return (
    <div className="bg-black min-h-full w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-white">
        <span className="text-4xl text-green-500 font-semibold">Verify</span>
        your Email by clicking on the button below
      </h1>
      <button
        onClick={verifyUserEmail}
        className="bg-green-500 py-2 px-4 rounded-lg hover:shadow-md hover:shadow-green-300 font-bold text-xl text-white"
      >
        VERIFY
      </button>
    </div>
  );
};

export default VerifyPage;
