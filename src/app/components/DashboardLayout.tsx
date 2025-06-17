'use client';

import { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Settings, PlusSquare, LayoutDashboard } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const userId = params.user as string; // Extracted from URL like /dashboard/[user]/...

  // Dynamically create nav items once userId is available
  const navItems = useMemo(() => [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: `/dashboard/${userId}`, icon: LayoutDashboard },
    { name: 'Add Sites', path: `/dashboard/${userId}/sites`, icon: PlusSquare },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ], [userId]);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside
        className={cn(
          'bg-zinc-900 w-64 px-6 py-8 space-y-6 absolute inset-y-0 left-0 z-30 transform lg:relative lg:translate-x-0 transition duration-200 ease-in-out',
          {
            '-translate-x-full': !sidebarOpen,
          }
        )}
      >
        <h1 className="text-2xl font-bold text-indigo-400">Welcome Jeet !!</h1>
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
      </aside>

      {/* Backdrop on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-tr from-black via-zinc-900 to-black">
          {children}
        </main>
      </div>
    </div>
  );
}
