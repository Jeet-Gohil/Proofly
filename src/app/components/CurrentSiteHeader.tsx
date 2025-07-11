'use client';

import { useState } from 'react';
import { Eye, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { useParams } from 'next/navigation';

type DashboardHeaderProps = {
  siteName: string;
  trackingScriptComponent: ReactNode;
};


const DashboardHeader: FC<DashboardHeaderProps> = ({ siteName, trackingScriptComponent }) => {
  const [showScript, setShowScript] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const {user, siteId} = useParams();

  const navItems = [
  { label: 'Overview', href: '/dashboard/overview' },
  { label: 'Widgets', href: `/dashboard/${user}/sites/${siteId}/widgets` },
  { label: 'Settings', href: '/dashboard/settings' },
];


  return (
    <div className="w-full border-b border-zinc-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left side: Site Name */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">{siteName}</h1>

          {/* Eye Button + Tooltip */}
          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <button
              onClick={() => setShowScript(prev => !prev)}
              className="flex items-center justify-center p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
              aria-label="View Tracking Script"
            >
              <Eye className="w-5 h-5 text-white" />
            </button>

            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: -10 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 text-xs bg-zinc-700 text-white rounded shadow z-50 whitespace-nowrap"
                >
                  View tracking script
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right side: Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-800 dark:text-zinc-300 hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileNavOpen(prev => !prev)}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
            aria-label="Toggle Menu"
          >
            {mobileNavOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-zinc-900 border-t border-zinc-800 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-zinc-300 hover:text-white transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tracking Script Section */}
      <AnimatePresence>
        {showScript && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full px-4 pb-4 max-w-7xl mx-auto"
          >
            {trackingScriptComponent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardHeader;
