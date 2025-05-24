import React from "react";
import { useRouter } from "next/navigation";


const ProofSignup = () => {
  const route = useRouter();

  const OnClick = ()=> {
    route.push('/SignUp');
  }

  return (
    // hidden on md (768px) and up
    <div className="block md:hidden min-h-screen bg-[#0b063f] text-white flex flex-col justify-center px-6 py-10 space-y-6">
      <div className="text-sm text-gray-300 flex items-center space-x-2">
        <span role="img" aria-label="wave">👋</span>
        <span>Welcome to Proofly.</span>
      </div>

      <h1 className="text-3xl font-bold leading-snug">
        Boost your website conversions by 15% in <br />
        <span className="text-white">under 15 minutes</span>
      </h1>

      <p className="text-gray-400 text-base">
        We believe customer-obsessed marketing is the best kind of marketing.
        Proof makes it easy. Make your website delightfully human.
      </p>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Enter work email..."
          className="w-full px-4 py-3 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={OnClick} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition duration-200">
          Get Started
        </button>
      </div>

      <div className="flex items-center space-x-2 pt-4">
        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 018 8v1a8 8 0 11-16 0v-1a8 8 0 018-8zM9 9v3a1 1 0 102 0V9a1 1 0 10-2 0z" />
          </svg>
          <span>1,000+</span>
        </div>
        <span className="text-sm text-gray-400">
          people started a free trial in the last 30 days
        </span>
      </div>
    </div>
  );
};

export default ProofSignup;
