'use client';

import { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const {data : session} = useSession();
  const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'How it works', path: '/HowItWorks' },
  { name: 'Reviews', path: '/reviews' },
];

const goToDashboard = () => {
    if (session?.user?.uuid) {
      router.push(`/dashboard/${session.user.uuid}`);
    } else {
      router.push('/login');
    }
    console.log(session?.user?.uuid);
  };

  return (
    <nav className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold"><Link href={'/'}>Proofly</Link></div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 font-medium">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="hover:text-purple-400 cursor-pointer transition-colors"
              >
                 <Link
                    href={item.path} className="hover:text-purple-400 transition-colors">
                     {item.name}
                 </Link>
              </li>
            ))}
            <li
  className="hover:text-purple-400 cursor-pointer transition-colors"
  onClick={goToDashboard}>
  Dashboard
</li>

          </ul>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Toggle */}
           <ThemeToggle/>

            {/* Wallet Button */}
            <button onClick={()=> {router.push('/login')}} className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#2A0E61] text-purple-300 rounded-lg border border-[#3c1a75] hover:bg-[#3c1a75] transition">
              <LogIn size={16} />
              <span className="text-sm font-medium">Login</span>
            </button>

            {/* Mobile Hamburger Icon */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <ul className="flex flex-col space-y-2 font-medium">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="hover:text-purple-400 cursor-pointer transition-colors"
              >
                <Link
                    href={item.path} className="hover:text-purple-400 transition-colors">
                     {item.name}
                 </Link>
              </li>
            ))}
          </ul>

          {/* Toggle & Wallet on mobile */}
          {/* <div className="flex items-center space-x-4 mt-4">
            <Sun size={18} />
            <button
              className="relative w-10 h-5 rounded-full bg-purple-600 transition"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <span
                className={`absolute top-[2px] left-[2px] h-4 w-4 rounded-full bg-white transition-transform ${
                  isDarkMode ? 'translate-x-5' : ''
                }`}
              />
            </button>
            <Moon size={18} />
          </div> */}
          <ThemeToggle/>
          

          <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#2A0E61] text-purple-300 rounded-lg border border-[#3c1a75] hover:bg-[#3c1a75] transition" onClick={()=> {router.push('/login')}}>
            <LogIn size={16} />
            <span className="text-sm font-medium">Login</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;