'use client';

import { motion } from 'framer-motion';

interface SiteCardProps {
  site: {
    site_name: string;
    site_url: string;
    description: string;
    total_visits: number;
    unique_visitors: number;
  };
}

export default function SiteCard({ site }: SiteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 10px 25px rgba(6, 86, 215, 0.2)',
      }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-stone-300 dark:bg-stone-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow transition-all space-y-3"
    >
      <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
        {site.site_name}
      </h3>

      <a
        href={site.site_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-500 hover:underline break-words"
      >
        {site.site_url}
      </a>

      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {site.description || 'No description provided.'}
      </p>

      <div className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
        <p>
          <span className="font-medium">Visits:</span>{' '}
          {site.total_visits.toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Unique Users:</span>{' '}
          {site.unique_visitors.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}
