'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, MapPin } from 'lucide-react';
import ChartDisplaySection from './ChartDisplay';
import dynamic from 'next/dynamic';

const MapTracker = dynamic(() => import('@/app/components/GeoMap/GeoMap.client'), {
  ssr: false,
});

type GeoData = {
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
};

type AnalyticsWrapperProps = {
  visitsData: { date: string; visits: number }[];
  deviceData: { device: string; percentage: number }[];
  topPagesData: { page: string; views: number }[];
  liveLocations: GeoData[];
};

const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({
  visitsData,
  deviceData,
  topPagesData,
  liveLocations,
}) => {
  const [showCharts, setShowCharts] = useState(false);
  const [showGeo, setShowGeo] = useState(false);

  return (
    <div className="w-full">
      {/* Analytics Button */}
      <div className="flex justify-center my-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCharts((prev) => !prev)}
          className="flex items-center gap-3 px-6 py-3 bg-gray-900 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition"
        >
          <BarChart3 className="w-5 h-5" />
          {showCharts ? 'Hide Analytics' : 'View Analytics'}
        </motion.button>
      </div>

      {/* Charts + Geo Tracker */}
      <AnimatePresence mode="wait">
        {showCharts && (
          <motion.div
            key="charts"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <ChartDisplaySection
              visitsData={visitsData}
              deviceData={deviceData}
              topPagesData={topPagesData}
            />

            {/* Geo Tracking Button */}
            <div className="flex justify-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGeo((prev) => !prev)}
                className="flex items-center gap-3 px-6 py-3 bg-[#101322] text-white font-semibold rounded-full shadow-lg hover:bg-[#1a1f33] transition"
              >
                <MapPin className="w-5 h-5" />
                {showGeo ? 'Hide Geo Tracking' : 'View Geo Tracking'}
              </motion.button>
            </div>

            {/* Map and Info UI */}
            <AnimatePresence>
  {showGeo && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="w-full mt-8 flex flex-col items-end pr-4 sm:pr-8 md:pr-12 space-y-4"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl sm:text-2xl font-bold text-white text-right"
      >
        Live Visitor Geo Tracking
      </motion.h1>

      {/* Thin White Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="border-t border-white w-full"
      />

      {/* Notice */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#1f2937] text-gray-300 mt-4 text-sm px-4 py-2 rounded-lg shadow border border-gray-600 max-w-md text-right"
      >
        <span className="text-red-400 font-semibold">Red dots</span> on the map represent live visitors' locations based on their IP address.
      </motion.div>

      {/* Map */}
      <div className="w-full flex justify-center">
        <MapTracker liveLocations={liveLocations} />
      </div>
    </motion.div>
  )}
</AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalyticsWrapper;
