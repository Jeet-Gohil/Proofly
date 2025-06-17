'use client';
import { signIn, useSession } from 'next-auth/react';

import React from 'react';

const LoginForm: React.FC = () => {
    const Session = useSession();
    console.log("Session",Session);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-8 p-8 rounded-md shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900">Welcome to Proof</h2>

        <button onClick={()=> signIn('google' , {
          callbackUrl :  `/callback`
        }
        )}
          type="button"
          className="w-full border border-gray-300 rounded-md py-2 px-4 flex justify-center text-sm font-medium text-
          gray-700 hover:bg-gray-100 transition"
        >
          Continue with Google
        </button>

        <div className="flex items-center justify-center">
          <span className="border-b w-1/4 lg:w-1/5"></span>
          <span className="text-xs text-gray-500 px-2">or</span>
          <span className="border-b w-1/4 lg:w-1/5"></span>
        </div>

        <form className="mt-4 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="elon@spacex.com"
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition font-semibold"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="text-sm text-center mt-4 space-y-2">
          <p className="text-gray-500">
            <span className="inline-block align-middle">
              <svg
                className="w-4 h-4 inline-block mr-1 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M13 16h-1v-4h-1m1-4h.01M12 18.5C6.753 18.5 2.5 14.247 2.5 9S6.753-.5 12-.5s9.5 4.253 9.5 9.5S17.247 18.5 12 18.5z" />
              </svg>
            </span>
            Trouble signing in?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Reset your password
            </a>
          </p>
          <p className="text-gray-500">
            <span className="inline-block align-middle">
              <svg
                className="w-4 h-4 inline-block mr-1 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M13 16h-1v-4h-1m1-4h.01M12 18.5C6.753 18.5 2.5 14.247 2.5 9S6.753-.5 12-.5s9.5 4.253 9.5 9.5S17.247 18.5 12 18.5z" />
              </svg>
            </span>
            Don't have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
