'use client'
import React from 'react'
import { signIn } from "next-auth/react";
import { useState } from "react";

const Auth = () => {
    
    const [email, setEmail] = useState("gjeet084@gmail.com");
    const [password, setPassword] = useState("");
    
    return (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-md mx-4 shadow-xl">
                <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">
                    Welcome to Proof
                </h1>

                <div className="space-y-6">
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        type="button"
                        className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Continue with Google
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={() => signIn("credentials", { email, password, redirect: false })}
                                type="button"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-sm text-center text-gray-600 space-y-2">
                    <p>
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            Trouble signing in? Reset your password
                        </a>
                    </p>
                    <p>
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                            Don't have an account? Sign up here
                        </a>
                    </p>
                </div>

                <button 
                    className="mt-4 text-sm text-gray-500 hover:underline w-full text-center"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default Auth