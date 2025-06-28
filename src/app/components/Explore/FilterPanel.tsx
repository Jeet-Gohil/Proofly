'use client';

import { useState } from 'react';

interface Props {
  onFilter: (filters: {
    search: string;
    category: string;
  }) => void;
}

export default function FilterPanel({ onFilter }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ search, category });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full border border-zinc-200 dark:border-zinc-700 rounded-xl shadow px-4 py-6 space-y-4 md:space-y-0 md:flex md:items-end md:space-x-4"
    >
      {/* Search Input */}
      <div className="flex-1">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Search
        </label>
        <input
          type="text"
          placeholder="Search by site name or URL"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Dropdown */}
      <div className="w-full md:w-60">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="SaaS">SaaS</option>
          <option value="Blog">Blog</option>
          <option value="Ecommerce">Ecommerce</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
        >
          Search Sites
        </button>
      </div>
    </form>
  );
}
