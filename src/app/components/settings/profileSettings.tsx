'use client';

import { useState } from 'react';

export default function ProfileSettings() {
  const [name, setName] = useState('');
  const [email] = useState('user@example.com'); // read-only
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000)); // simulate network delay
    setLoading(false);
    alert('Profile updated');
  };

  return (
    <div className="max-w-xl space-y-6">
      <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">Profile Settings</h3>
      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
          Display Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-zinc-700 dark:text-zinc-300">
          Email
        </label>
        <input
          value={email}
          disabled
          className="w-full px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
        />
      </div>
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
