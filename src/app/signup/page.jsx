"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true); // initially true
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (
            user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    useEffect(() => {
        if (loading) {
            setButtonDisabled(true);
        }
    }, [loading]);

    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("SignUp Response", response.data);
            router.push("/login");
        } catch (error) {
            console.log("Sign Up Failed");
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl">{loading ? "Processing.." : "SignUp"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                id="username"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text"
                placeholder="Username"
            />
            <label htmlFor="email">Email</label>
            <input
                id="email"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="text"
                placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                placeholder="Password"
            />
            <button
                onClick={onSignUp}
                disabled={buttonDisabled}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                {loading
                    ? "Processing..."
                    : buttonDisabled
                    ? "Please fill the form"
                    : "Sign Up"}
            </button>
            <Link href="/login">Visit Login Page</Link>
        </div>
    );
}


//24 minutes
