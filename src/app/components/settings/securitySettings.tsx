'use client';

import { useState } from 'react';

export default function SecuritySettings() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = () => {
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    alert('Password updated securely!');
  };

  return (
    <div className="max-w-xl space-y-6">
      <h3 className="text-xl font-semibold text-zinc-800 dark:text-white">Security Settings</h3>

      <div>
        <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1">Confirm Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleUpdate}
        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
      >
        Update Password
      </button>
    </div>
  );
}
