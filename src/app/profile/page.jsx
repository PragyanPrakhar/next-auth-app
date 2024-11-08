"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id);
    };
    const logout = async () => {
        const res = axios.get("/api/users/logout");
        toast.success("logged out successfully");
        router.push("/login");
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr />
            <h2>
                {data === "nothing" ? (
                    "Nothing"
                ) : (
                    <Link href={`/profile/${data}`}>{data}</Link>
                )}
            </h2>
            <hr />
            <button
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
            >
                Log Out
            </button>
            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                GetUser Details
            </button>
        </div>
    );
}

// export default page
