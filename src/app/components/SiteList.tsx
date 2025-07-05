'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

type Site = {
  created_at: string;
  description: string;
  domain_verified: boolean;
  email: string;
  geo_tracking_enabled: boolean;
  logo_url: string;
  site_id: string;
  site_name: string;
  site_url: string;
  status: string;
  tags: string;
  tracking_script_injected: boolean;
  tracking_type: string;
};

interface Props {
  sites: Site[];
}

export default function UserSites({ sites }: Props) {
  const [formattedDates, setFormattedDates] = useState<Record<string, string>>({});
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const map: Record<string, string> = {};
    sites.forEach((site) => {
      map[site.site_id] = new Date(site.created_at).toLocaleDateString();
    });
    setFormattedDates(map);
  }, [sites]);

  if (sites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-4">No Sites Registered Yet</h2>
        <p className="text-lg text-gray-400 mb-8">
          Click the menu icon on the left to register your first site and get started!
        </p>

        <motion.div
          initial={{ x: 0 }}
  animate={{ x: -20 }}
  transition={{ repeat: Infinity, repeatType: "reverse", duration: 1, ease: 'easeInOut' }}
  className="flex flex-col items-center"
        >
          <ArrowLeft className="w-12 h-12 text-purple-500" />
          <span className="text-sm text-gray-400 mt-2">Menu</span>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {sites.map((site, index) => (
        <motion.div
          key={site.site_id || index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.03 }}
          className="bg-white dark:bg-black shadow-lg transform transition-transform w-90 h-50 rounded-md mx-4 my-4"
        >
          <div className="p-5 space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-black dark:text-white">
                {site.site_name}
              </h2>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  site.domain_verified
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                }`}
              >
                {site.domain_verified ? 'Verified' : 'Pending'}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 break-all">
              {site.site_url}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tracking: <strong>{site.tracking_type}</strong>
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Added on: {formattedDates[site.site_id] || 'Loading...'}
            </p>

            <div className="flex justify-end gap-3 pt-3">
              <button
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={() =>
                  router.push(`/dashboard/${session?.user?.uuid}/sites/${site.site_id}`)
                }
              >
                View
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
