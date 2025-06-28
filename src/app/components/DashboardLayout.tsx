'use client';

import { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Home, Settings, PlusSquare, LayoutDashboard, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const params = useParams();
  const userId = params.user as string;
  const siteId = params.siteId as string;

  const navItems = useMemo(() => [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: `/dashboard/${userId}`, icon: LayoutDashboard },
    { name: 'Add Sites', path: `/dashboard/${userId}/sites`, icon: PlusSquare },
    { name: 'Settings', path: `/dashboard/${userId}/sites/${siteId}/settings`, icon: Settings },
  ], [userId, siteId]);

  console.log(siteId);

  return (
    <div className="flex h-screen bg-black text-white relative overflow-hidden">
      {/* Hover trigger */}
      <div
        onMouseEnter={() => setHovered(true)}
        className="fixed top-1/2 -translate-y-1/2 left-0 z-50 p-2 cursor-pointer"
      >
        <Menu className="text-white opacity-50 hover:opacity-100" />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {hovered && (
          <motion.aside
            onMouseLeave={() => setHovered(false)}
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-40 h-full w-64 bg-zinc-900 px-6 py-8 space-y-6 shadow-lg"
          >
            {/* Close button for mobile */}
            <button
              onClick={() => setHovered(false)}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition"
            >
              <X size={20} />
            </button>

            <h1 className="text-2xl font-bold text-indigo-400">Welcome</h1>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.path)}
                    className="flex items-center gap-3 text-left px-4 py-2 rounded hover:bg-indigo-600 transition text-white"
                  >
                    <Icon size={18} />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-tr from-black via-zinc-900 to-black transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
