'use client';

import { useState } from 'react';
import {FaGoogle } from 'react-icons/fa';
import { useTheme } from 'next-themes'; // if you're using next-themes
import { signIn } from 'next-auth/react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { theme } = useTheme(); // optional, to adapt colors programmatically

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in:', email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-black transition-colors">
      <div className="w-full max-w-md space-y-6 p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xl bg-white dark:bg-[#0f0f0f]">
        <div>
          <h2 className="text-3xl font-bold text-black dark:text-white">Welcome back</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Sign in to your account</p>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition-all"
          onClick={()=> signIn('google' , {
                    callbackUrl :  `${window.location.origin}/callback`
                  }
                  )}>
            <FaGoogle size={18} />
            Continue with Google
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 text-gray-500 text-sm">
          <hr className="flex-1 border-gray-300 dark:border-gray-700" />
          <span className="text-xs uppercase">or</span>
          <hr className="flex-1 border-gray-300 dark:border-gray-700" />
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="flex justify-between items-center">
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>
            <div className="text-right mt-1 text-sm text-indigo-500 hover:underline cursor-pointer">
              Forgot Password?
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Don’t have an account?{' '}
          <a href="/SignUp" className="text-indigo-500 hover:underline">
            Sign Up Now
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
