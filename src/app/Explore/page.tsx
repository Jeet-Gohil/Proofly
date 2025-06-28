'use client';

import { useState, useEffect } from 'react';
import FilterPanel from '../components/Explore/FilterPanel';
import SiteCard from '../components/Explore/SiteCard';

export interface PublicSite {
  site_name: string;
  site_url: string;
  description: string;
  logo_url?: string | null;
  total_visits: number;
  unique_visitors: number;
}

export default function ExplorePage() {
  const [sites, setSites] = useState<PublicSite[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch top public sites initially
  useEffect(() => {
    const fetchTopSites = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/Explore', { method: 'GET' });
        const data: PublicSite[] = await res.json();
        setSites(data);
      } catch (err) {
        console.error('Failed to load top sites:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSites();
  }, []);

  // 🔹 Filter function triggered by FilterPanel
  const handleFilter = async ({
    search,
    category,
  }: {
    search: string;
    category: string;
  }) => {
    if (!search.trim()) return;

    setLoading(true);

    try {
      const res = await fetch('/api/Explore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: search }),
      });

      const data: PublicSite[] = await res.json();

      // Optional client-side filtering for category
      const filtered = data.filter((site) => {
        if (!category) return true;
        return site.description?.toLowerCase().includes(category.toLowerCase());
      });

      setSites(filtered);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Explore Public Sites
      </h1>

      <FilterPanel onFilter={handleFilter} />

      {loading ? (
        <p className="text-zinc-500 dark:text-zinc-400 text-center mt-4">Loading sites...</p>
      ) : sites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site, idx) => (
            <SiteCard key={idx} site={site} />
          ))}
        </div>
      ) : (
        <p className="text-zinc-500 dark:text-zinc-400 text-center mt-4">No sites found.</p>
      )}
    </main>
  );
}
