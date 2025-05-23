'use client'
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className=" bg-[#08083D] text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">

            <Link href ={"/"} className="text-xl font-bold text-white">proofly.com</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-8">
              <Link href= {"/HowItWorks"} className="text-white hover:text-gray-600 px-3 py-2 text-sm font-medium">
                How it Works
              </Link>
              <Link href= {"/pricing"} className="text-white hover:text-gray-600 px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
              <Link href= {"/reviews"} className="text-white hover:text-gray-600 px-3 py-2 text-sm font-medium">
                Reviews
              </Link>
              <a href="#" className="text-white hover:text-gray-600 px-3 py-2 text-sm font-medium">
                Resources
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href= {"/login"} className="bg-white hover:bg-blue-700 text-[#0f172a]  px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Login
              </Link>
              <Link
                href= {"/SignUp"}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Try for free
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <Link
              href= {"/HowItWorks"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50"
            >
              How it works
            </Link>
            <Link
              href= {"/pricing"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50"
            >
              Pricing
            </Link>
            <Link
              href= {"/reviews"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50"
            >
              Reviews
            </Link>
            <Link
              href= {"/#"}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50"
            >
              Resources
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <Link
                href= {"/Login"}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                href= {"/SignUp"}
                className="block w-full mt-2 px-3 py-2 rounded-md text-base font-medium text-center text-white bg-blue-600 hover:bg-blue-700"
              >
                Try for free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}