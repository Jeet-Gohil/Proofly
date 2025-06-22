'use client';

import { useTheme } from 'next-themes';

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-xl space-y-6">
      <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">Appearance Settings</h3>

      <div className="flex items-center justify-between">
        <span className="text-zinc-700 dark:text-zinc-300">Current Theme</span>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="rounded-md border px-3 py-1 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
    </div>
  );
}
