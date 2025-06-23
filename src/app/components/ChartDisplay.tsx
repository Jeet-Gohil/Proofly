'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MonitorPlay } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FC } from 'react';

const VisitsLineChart = dynamic(() => import('./Analytics/VisitsLineCharts'), { ssr: false });
const DevicePieChart = dynamic(() => import('./Analytics/DeviceTypePie'), { ssr: false });
const TopPagesBar = dynamic(() => import('./Analytics/TopPagesBarChats'), { ssr: false });

type ChartDisplaySectionProps = {
  visitsData: { date: string; visits: number }[];
  deviceData: { device: string; percentage: number }[];
  topPagesData: { page: string; views: number }[];
};

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 1 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ChartDisplaySection: FC<ChartDisplaySectionProps> = ({ visitsData, deviceData, topPagesData }) => {
  const [isCarousel, setIsCarousel] = useState(false);

  const charts = [
    { title: '📈 Website Visits Over Time', component: <VisitsLineChart key="line" data={visitsData} /> },
    { title: '📱 Device Distribution', component: <DevicePieChart key="pie" data={deviceData} /> },
    { title: '📊 Top Performing Pages', component: <TopPagesBar key="bar" data={topPagesData} /> },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }} className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsCarousel(!isCarousel)}
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 text-white hover:scale-105 transition transform"
        >
          <MonitorPlay className="w-4 h-4" />
          {isCarousel ? 'Grid View' : 'Carousel View'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isCarousel ? (
          <motion.div
            key="carousel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Carousel responsive={responsive} infinite arrows keyBoardControl>
              {charts.map(({ title, component }, index) => (
                <div key={index} className="px-2">
                  <motion.div
                    className="p-4 rounded-xl bg-white/90 dark:bg-zinc-900 shadow-md backdrop-blur-md"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <p className="text-sm text-zinc-500 mb-2">Hover on points/bars for more info</p>
                    {component}
                  </motion.div>
                </div>
              ))}
            </Carousel>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {charts.map(({ title, component }, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-xl bg-white/90 dark:bg-zinc-900 shadow-md backdrop-blur-md"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-sm text-zinc-500 mb-2">Hover on points/bars for more info</p>
                {component}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChartDisplaySection;
