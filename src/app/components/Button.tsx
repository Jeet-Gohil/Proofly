'use client'
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center">
        <h1 className="text-2xl font-bold mb-6">Sign in to your Dashboard</h1>
        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center gap-3 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
        >
          <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
