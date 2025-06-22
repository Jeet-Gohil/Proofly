'use client';

import { useState } from 'react';

export default function DangerZone() {
  const [confirm, setConfirm] = useState('');

  const handleDelete = () => {
    if (confirm !== 'DELETE') {
      alert('Please type DELETE to confirm.');
      return;
    }

    alert('Account deleted. (This is just a demo)');
    // Actual deletion logic here
  };

  return (
    <div className="max-w-xl space-y-6">
      <h3 className="text-xl font-bold text-red-600">Danger Zone</h3>

      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        Deleting your account is permanent and cannot be undone.
      </p>

      <input
        type="text"
        placeholder="Type DELETE to confirm"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
      />

      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Delete Account
      </button>
    </div>
  );
}
