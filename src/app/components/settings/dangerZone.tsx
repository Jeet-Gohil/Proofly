'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  siteId: string;
}

export default function DangerZone({ siteId }: Props) {
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {user} = useParams();

  const handleDelete = async () => {
    if (confirm !== 'DELETE') {
      alert('Please type DELETE to confirm.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/sites/${siteId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ site_id: siteId }),
      });

      if (!res.ok) {
        throw new Error('Failed to delete site.');
      }

      alert('Site deleted successfully!');
      router.push(`/dashboard/${user}`);
      // Optional: redirect or update UI
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <h3 className="text-xl font-bold text-red-600">Danger Zone</h3>

      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        Deleting your site is permanent and cannot be undone.
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
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? 'Deleting...' : 'Delete Site'}
      </button>
    </div>
  );
}
