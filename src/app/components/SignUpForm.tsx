import React from 'react';

const SignupForm: React.FC = () => {
  return (
    <div className='box w-full flex justify-center'>
    {/* Left Section */}
   

    {/* Right Section */}
    <div className="w-full md:w-1/2 px-6 sm:px-12 lg:px-20 py-16 flex flex-col justify-center relative z-10">
      {/* Step Progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-sm font-semibold text-gray-600">
          <span>Step 1</span>
          <span>25%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-2 w-1/4 bg-blue-600 rounded-full transition-all duration-300 ease-in-out"></div>
        </div>
      </div>

      {/* Title & Description */}
      <h2 className="text-3xl font-extrabold leading-tight mb-2 text-gray-900">Get started for free</h2>
      <p className="text-gray-500 mb-8">Create an account and start exploring today.</p>

      {/* Form */}
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full name</label>
          <input
            type="text"
            className="mt-1 block w-full border-b-2 border-gray-300 bg-transparent placeholder-gray-400 focus:outline-none focus:border-blue-600 text-gray-800 py-2 transition-all"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Work email</label>
          <input
            type="email"
            className="mt-1 block w-full border-b-2 border-gray-300 bg-transparent placeholder-gray-400 focus:outline-none focus:border-blue-600 text-gray-800 py-2 transition-all"
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="text"
            className="mt-1 block w-full border-b-2 border-gray-300 bg-transparent placeholder-gray-400 focus:outline-none focus:border-blue-600 text-gray-800 py-2 transition-all"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-bold shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Create My Account
        </button>
      </form>
    </div>
  </div>
  );
};

export default SignupForm;
