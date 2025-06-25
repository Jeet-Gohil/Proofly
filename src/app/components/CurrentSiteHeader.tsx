'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FC, ReactNode } from 'react';

type DashboardHeaderProps = {
  siteName: string;
  trackingScriptComponent: ReactNode;
};

const DashboardHeader: FC<DashboardHeaderProps> = ({ siteName, trackingScriptComponent }) => {
  const [showScript, setShowScript] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full border-b border-zinc-800  text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:justify-end sm:items-center gap-4">
        {/* Header Title and Eye Button Grouped to Right */}
        <div className="flex items-center gap-3 relative">
          {/* Site Name */}
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {siteName}
          </h1>

          {/* Eye Button + Tooltip */}
          <div
            className="relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <button
              onClick={() => setShowScript(prev => !prev)}
              className="flex items-center justify-center p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition"
              aria-label="View Tracking Script"
            >
              <Eye className="w-5 h-5 text-white" />
            </button>

            {/* Tooltip */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: -10 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 text-xs sm:text-sm bg-zinc-700 text-white rounded shadow z-50 whitespace-nowrap"
                >
                  View tracking script
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Tracking Script Section */}
      <AnimatePresence>
        {showScript && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full px-4 pb-4 max-w-7xl mx-auto"
          >
            {trackingScriptComponent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardHeader;
