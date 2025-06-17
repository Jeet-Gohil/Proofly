'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaXTwitter, FaGithub, FaLinkedin, FaArrowUp } from 'react-icons/fa6';

export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1f2937] text-gray-300 py-10 px-6 sm:px-10 relative">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-4 sm:grid-cols-2 text-sm">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-400 mb-3">Proofly</h2>
          <p className="text-gray-400">Real-time visitor tracking & analytics to grow your website smarter.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-indigo-400">Home</Link></li>
            <li><Link href="/dashboard" className="hover:text-indigo-400">Dashboard</Link></li>
            <li><Link href="/how-it-works" className="hover:text-indigo-400">How It Works</Link></li>
            <li><Link href="/contact" className="hover:text-indigo-400">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><Link href="/terms" className="hover:text-indigo-400">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-indigo-400">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter & Socials */}
        <div>
          <h3 className="text-white font-semibold mb-3">Stay in the Loop</h3>
          <p className="text-gray-400 mb-3">Get updates on features and tips to optimize your website.</p>
          <form className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded bg-[#1e293b] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded font-medium"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 text-xl text-indigo-400">
            <Link href="https://www.instagram.com" target="_blank" aria-label="Instagram">
              <FaInstagram className="hover:text-indigo-300" />
            </Link>
            <Link href="https://twitter.com" target="_blank" aria-label="Twitter (X)">
              <FaXTwitter className="hover:text-indigo-300" />
            </Link>
            <Link href="https://github.com" target="_blank" aria-label="GitHub">
              <FaGithub className="hover:text-indigo-300" />
            </Link>
            <Link href="https://www.linkedin.com" target="_blank" aria-label="LinkedIn">
              <FaLinkedin className="hover:text-indigo-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Proofly. All rights reserved.
      </div>

      {/* Scroll to Top */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg transition duration-300 z-50"
          aria-label="Scroll to Top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
}
